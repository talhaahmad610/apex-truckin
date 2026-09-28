/**
 * Encoder recipe for the scroll-scrubbed hero (FlightScrub), shared by the dev-only batch script
 * (`scripts/process-footage.ts`) and the admin-upload job (`src/payload/jobs/processFlightLeg.ts`).
 * Both must produce byte-identical output for the same input, so the argument lists live here once.
 *
 * Short GOPs are what make scrubbing smooth: every seek lands ≤ 8 frames from a keyframe.
 *
 * Deliberately free of Payload/Next imports (no `server-only`) — the script runs outside the Next
 * module graph via `payload run`, same as the job.
 */
import { execFile, execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export const SOURCE_FPS = 30;

/** Daylight footage pulled toward dusk — the only per-leg color variant offered in the admin. */
export const DARKER_EXTRA = "eq=brightness=-0.06:gamma=0.92,";

/** Shared look: slight crush, warm amber highlights, teal-neutral shadows, soft vignette, fine sharpening. */
export const GRADE =
  "eq=contrast=1.08:saturation=0.92:gamma=0.96," +
  "colorbalance=rs=-0.03:gs=-0.01:bs=0.04:rm=0.03:bm=-0.02:rh=0.07:gh=0.02:bh=-0.07," +
  "curves=master='0/0.02 0.5/0.47 1/0.97'," +
  "vignette=PI/5," +
  "unsharp=5:5:0.5:5:5:0";

const COMMON = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-sc_threshold", "0", "-movflags", "+faststart"];

export function preFilter(fps: number, extra: string): string {
  return `fps=${fps},${extra}${GRADE}`;
}

export function probeDurationArgs(file: string): string[] {
  return ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file];
}

/** ffprobe: video-stream presence + dimensions, used to reject a non-video upload before encoding. */
export function probeStreamArgs(file: string): string[] {
  return ["-v", "error", "-show_entries", "stream=width,height,codec_type:format=duration", "-of", "json", file];
}

export function desktopArgs(opts: { src: string; ss: number; dur: number; extra: string; fps: number; out: string }): string[] {
  return [
    "-ss",
    String(opts.ss),
    "-t",
    String(opts.dur),
    "-i",
    opts.src,
    "-vf",
    `scale=1600:900:force_original_aspect_ratio=increase:flags=lanczos,crop=1600:900,${preFilter(opts.fps, opts.extra)}`,
    ...COMMON,
    "-crf",
    "24",
    "-g",
    "8",
    "-keyint_min",
    "8",
    opts.out,
  ];
}

export function mobileArgs(opts: { src: string; ss: number; dur: number; extra: string; fps: number; out: string }): string[] {
  return [
    "-ss",
    String(opts.ss),
    "-t",
    String(opts.dur),
    "-i",
    opts.src,
    "-vf",
    `scale=-2:1080:flags=lanczos,crop=608:1080,${preFilter(opts.fps, opts.extra)}`,
    ...COMMON,
    "-crf",
    "27",
    "-g",
    "4",
    "-keyint_min",
    "4",
    opts.out,
  ];
}

export function posterArgs(video: string, out: string): string[] {
  return ["-i", video, "-frames:v", "1", "-c:v", "libwebp", "-quality", "72", out];
}

// --- binary resolution: $FFMPEG_BIN dir → PATH → WinGet Gyan.FFmpeg install. ---

function onPath(bin: string): string | null {
  try {
    execFileSync(bin, ["-version"], { stdio: "ignore" });
    return bin;
  } catch {
    return null;
  }
}

function winget(bin: string): string | null {
  const root = join(homedir(), "AppData", "Local", "Microsoft", "WinGet", "Packages");
  if (!existsSync(root)) return null;
  for (const pkg of readdirSync(root).filter((d) => d.startsWith("Gyan.FFmpeg"))) {
    for (const build of readdirSync(join(root, pkg))) {
      const p = join(root, pkg, build, "bin", `${bin}.exe`);
      if (existsSync(p)) return p;
    }
  }
  return null;
}

/** Never throws/exits — the caller (job or script) decides how to report "not found". */
export function resolveBin(bin: "ffmpeg" | "ffprobe"): string | null {
  if (process.env.FFMPEG_BIN) {
    const p = join(process.env.FFMPEG_BIN, process.platform === "win32" ? `${bin}.exe` : bin);
    if (existsSync(p)) return p;
  }
  return onPath(bin) ?? winget(bin);
}

/** Args array only — never a shell string. Hard timeout so a stuck ffmpeg can't hang a job/worker forever. */
export async function runFfmpeg(bin: string, args: string[], { timeoutMs = 10 * 60 * 1000 } = {}): Promise<void> {
  try {
    await execFileAsync(bin, ["-hide_banner", "-loglevel", "error", "-y", ...args], {
      windowsHide: true,
      maxBuffer: 8 * 1024 * 1024,
      timeout: timeoutMs,
    });
  } catch (err) {
    const stderr = err && typeof err === "object" && "stderr" in err ? String((err as { stderr: unknown }).stderr) : String(err);
    const lastLines = stderr.trim().split("\n").slice(-8).join("\n");
    throw new Error(`ffmpeg failed: ${lastLines || (err instanceof Error ? err.message : String(err))}`);
  }
}

export async function ffprobeDuration(ffprobeBin: string, file: string): Promise<number> {
  const { stdout } = await execFileAsync(ffprobeBin, probeDurationArgs(file));
  return Number(stdout.trim());
}
