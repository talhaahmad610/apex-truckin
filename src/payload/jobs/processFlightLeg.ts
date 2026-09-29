import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import type { TaskConfig } from "payload";
import {
  DARKER_EXTRA,
  SOURCE_FPS,
  desktopArgs,
  ffprobeDuration,
  mobileArgs,
  posterArgs,
  probeStreamArgs,
  resolveBin,
  runFfmpeg,
} from "../../lib/footage";
import { downloadObjectToFile, uploadFile } from "../../lib/s3";
import { revalidateToken } from "../../lib/revalidate-token";

const execFileAsync = promisify(execFile);

type ProcessFlightLegIO = {
  input: { id: number };
  output: { hash: string; duration: number };
};

interface FfprobeStreamsResult {
  duration: number;
  video: { width?: number; height?: number } | undefined;
}

async function ffprobeStreams(ffprobeBin: string, file: string): Promise<FfprobeStreamsResult> {
  const { stdout } = await execFileAsync(ffprobeBin, probeStreamArgs(file));
  const data = JSON.parse(stdout) as {
    streams?: { codec_type?: string; width?: number; height?: number }[];
    format?: { duration?: string };
  };
  return {
    video: data.streams?.find((s) => s.codec_type === "video"),
    duration: Number(data.format?.duration || 0),
  };
}

/** Sends the revalidate request over HTTP — a cron-run job has no Next request store, so calling
 *  revalidateTag/revalidatePath directly here would throw (see src/payload/hooks/revalidate.ts). */
async function notifyRevalidate(serverURL: string) {
  const base = (process.env.INTERNAL_SITE_URL || serverURL).replace(/\/$/, "");
  try {
    const res = await fetch(`${base}/api/revalidate`, {
      method: "POST",
      headers: { "content-type": "application/json", "x-revalidate-token": revalidateToken() },
      body: JSON.stringify({ tags: ["home"], paths: ["/"] }),
    });
    if (!res.ok) console.error(`[processFlightLeg] revalidate call returned ${res.status}`);
  } catch (err) {
    console.error("[processFlightLeg] revalidate call failed", err);
  }
}

export const processFlightLeg: TaskConfig<ProcessFlightLegIO> = {
  slug: "processFlightLeg",
  label: "Process hero footage",
  inputSchema: [{ name: "id", type: "number", required: true }],
  // A failure is surfaced on the doc (status: failed, error message) for the admin to act on —
  // not silently retried against the same bad input.
  retries: 0,
  handler: async ({ input, req }) => {
    const { payload } = req;
    const id = input.id;

    const mark = (data: Record<string, unknown>) =>
      payload.update({
        collection: "flight-sources",
        id,
        data,
        context: { fromJob: true, disableRevalidate: true },
        overrideAccess: true,
      });

    const doc = await payload.findByID({ collection: "flight-sources", id, overrideAccess: true });
    if (!doc.filename) {
      await mark({ status: "failed", error: "No source file uploaded." });
      throw new Error("No source file uploaded.");
    }

    await mark({ status: "processing", error: null });

    const tmp = await mkdtemp(join(tmpdir(), "apex-flight-"));
    try {
      const ext = doc.filename.split(".").pop() || "mp4";
      const sourcePath = join(tmp, `source.${ext}`);
      await downloadObjectToFile(`raw/${doc.filename}`, sourcePath);

      const ffmpegBin = resolveBin("ffmpeg");
      const ffprobeBin = resolveBin("ffprobe");
      if (!ffmpegBin || !ffprobeBin) throw new Error("ffmpeg/ffprobe not found on the server — set FFMPEG_BIN.");

      const { video, duration: sourceDuration } = await ffprobeStreams(ffprobeBin, sourcePath);
      if (!video) throw new Error("The uploaded file has no video stream.");
      if (!(sourceDuration >= 1 && sourceDuration <= 120)) {
        throw new Error(`Unexpected clip duration (${sourceDuration.toFixed(1)}s) — must be 1–120s.`);
      }
      if ((video.width ?? 0) > 4096 || (video.height ?? 0) > 4096) throw new Error("Resolution too large (max 4096px per side).");

      await mark({
        sourceDuration: Number(sourceDuration.toFixed(2)),
        sourceWidth: video.width ?? null,
        sourceHeight: video.height ?? null,
      });

      const trimStart = Number(doc.trimStart) || 0;
      const maxSeconds = Number(doc.maxSeconds) || 8;
      const dur = Math.min(maxSeconds, Math.max(1, sourceDuration - trimStart));
      const extra = doc.grade === "darker" ? DARKER_EXTRA : "";

      // Content-addressed: same file + same settings → same key → safe to cache forever.
      const hash = createHash("sha256")
        .update(JSON.stringify({ filename: doc.filename, trimStart, maxSeconds, grade: doc.grade, recipeVersion: 1 }))
        .digest("hex")
        .slice(0, 16);

      const desktopOut = join(tmp, "desktop.mp4");
      const mobileOut = join(tmp, "mobile.mp4");
      const posterOut = join(tmp, "poster.webp");
      const posterMobileOut = join(tmp, "poster-m.webp");

      await runFfmpeg(ffmpegBin, desktopArgs({ src: sourcePath, ss: trimStart, dur, extra, fps: SOURCE_FPS, out: desktopOut }));
      await runFfmpeg(ffmpegBin, mobileArgs({ src: sourcePath, ss: trimStart, dur, extra, fps: SOURCE_FPS, out: mobileOut }));
      await runFfmpeg(ffmpegBin, posterArgs(desktopOut, posterOut));
      await runFfmpeg(ffmpegBin, posterArgs(mobileOut, posterMobileOut));

      const realDuration = Number((await ffprobeDuration(ffprobeBin, desktopOut)).toFixed(3));

      const prefix = `flight/${hash}`;
      const cacheControl = "public, max-age=31536000, immutable";
      await uploadFile(`${prefix}/desktop.mp4`, await readFile(desktopOut), "video/mp4", cacheControl);
      await uploadFile(`${prefix}/mobile.mp4`, await readFile(mobileOut), "video/mp4", cacheControl);
      await uploadFile(`${prefix}/poster.webp`, await readFile(posterOut), "image/webp", cacheControl);
      await uploadFile(`${prefix}/poster-m.webp`, await readFile(posterMobileOut), "image/webp", cacheControl);

      // Bucket KEYS, not full URLs — so a snapshot restored on another machine (a different
      // S3_PUBLIC_URL) plays clips from wherever that machine's bucket actually is, not the one
      // that originally encoded them. Resolved to a URL at read time by src/lib/cms.ts.
      await mark({
        status: "ready",
        error: null,
        output: {
          desktop: `${prefix}/desktop.mp4`,
          mobile: `${prefix}/mobile.mp4`,
          poster: `${prefix}/poster.webp`,
          posterMobile: `${prefix}/poster-m.webp`,
          duration: realDuration,
          hash,
        },
      });

      await notifyRevalidate(payload.config.serverURL || "http://localhost:3200");

      return { output: { hash, duration: realDuration } };
    } catch (err) {
      const message = (err instanceof Error ? err.message : String(err)).slice(0, 2000);
      await mark({ status: "failed", error: message }).catch(() => {});
      throw err;
    } finally {
      await rm(tmp, { recursive: true, force: true });
    }
  },
};
