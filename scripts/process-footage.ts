/**
 * Footage pipeline for the scroll-scrubbed hero (FlightScrub) — the offline/dev path and fallback
 * source. Since Phase 6, an admin can also upload+process a leg from `/admin` (see
 * `src/payload/jobs/processFlightLeg.ts`); both paths share the exact encoder recipe in
 * `src/lib/footage.ts` so their output is byte-identical for the same input and settings.
 *
 *   assets/raw/leg-1.mp4 … leg-N.mp4   (any source: stock, Blender, Higgsfield, phone…)
 *        ↓  trim · unify fps · amber cinematic grade · scrub-friendly GOP
 *   public/flight/desktop/leg-N.mp4    1600×900, keyframe every 8 frames, CRF 24
 *   public/flight/mobile/leg-N.mp4     608×1080 (native 9:16 centre crop), keyframe every 4, CRF 27
 *   public/flight/poster-N.webp / poster-N-m.webp   first frame of each leg (LCP image)
 *   src/lib/flight-manifest.json       consumed by HeroSection → FlightScrub as the fallback source
 *
 * Usage: npm run footage  (runs via `payload run`, which loads .env.local — set FFMPEG_BIN there if
 * ffmpeg isn't on PATH). `--max`/`--fps` still work when running the compiled script directly with
 * a Node loader that supports TS, since `payload run`'s own CLI parsing consumes `--`-prefixed args
 * before they'd reach this script's argv.
 */
import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { DARKER_EXTRA, SOURCE_FPS, desktopArgs, ffprobeDuration, mobileArgs, posterArgs, resolveBin, runFfmpeg } from "../src/lib/footage";

const arg = (name: string, def: number): number => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : def;
};
const MAX = arg("max", 8);
const FPS = arg("fps", SOURCE_FPS);

const RAW = "assets/raw";
const OUT = "public/flight";

const ffmpeg = resolveBin("ffmpeg");
const ffprobe = resolveBin("ffprobe");
if (!ffmpeg || !ffprobe) {
  console.error("✖ ffmpeg/ffprobe not found. Install it (Windows: winget install Gyan.FFmpeg · macOS: brew install ffmpeg) or set FFMPEG_BIN.");
  process.exit(1);
}

mkdirSync(join(OUT, "desktop"), { recursive: true });
mkdirSync(join(OUT, "mobile"), { recursive: true });

// Per-leg overrides: trim start (s) and extra grade (leg 2 is daylight → pull toward dusk).
const LEG_OPTS: Record<number, { ss: number; extra?: string }> = {
  1: { ss: 0 },
  2: { ss: 0, extra: DARKER_EXTRA },
  3: { ss: 2 },
  4: { ss: 0 },
};

const kb = (f: string) => `${(statSync(f).size / 1024 / 1024).toFixed(2)} MB`;

const legs = readdirSync(RAW)
  .map((f) => /^leg-(\d+)\.(mp4|mov|webm|mkv)$/i.exec(f))
  .filter((m): m is RegExpExecArray => Boolean(m))
  .sort((a, b) => Number(a[1]) - Number(b[1]));

if (!legs.length) {
  console.error(`✖ No clips found. Put leg-1.mp4, leg-2.mp4 … in ${RAW}/`);
  process.exit(1);
}

interface ManifestLeg {
  desktop: string;
  mobile: string;
  poster: string;
  posterMobile: string;
  duration: number;
}
const manifest: { generated: string; legs: ManifestLeg[] } = { generated: new Date().toISOString(), legs: [] };

for (const match of legs) {
  const [file, nStr] = match;
  const n = Number(nStr);
  const src = join(RAW, file);
  const opts = LEG_OPTS[n] ?? { ss: 0 };
  const extra = opts.extra ?? "";
  const srcDur = await ffprobeDuration(ffprobe, src);
  const dur = Math.min(MAX, Math.max(1, srcDur - opts.ss));
  const d = join(OUT, "desktop", `leg-${n}.mp4`);
  const m = join(OUT, "mobile", `leg-${n}.mp4`);

  console.log(`▶ leg ${n}: ${srcDur.toFixed(1)}s source → ${dur.toFixed(1)}s`);
  await runFfmpeg(ffmpeg, desktopArgs({ src, ss: opts.ss, dur, extra, fps: FPS, out: d }));
  console.log(`  ✔ ${d} (${kb(d)})`);
  await runFfmpeg(ffmpeg, mobileArgs({ src, ss: opts.ss, dur, extra, fps: FPS, out: m }));
  console.log(`  ✔ ${m} (${kb(m)})`);

  const p = join(OUT, `poster-${n}.webp`);
  const pm = join(OUT, `poster-${n}-m.webp`);
  await runFfmpeg(ffmpeg, posterArgs(d, p));
  await runFfmpeg(ffmpeg, posterArgs(m, pm));
  console.log(`  ✔ posters (${Math.round(statSync(p).size / 1024)} KB / ${Math.round(statSync(pm).size / 1024)} KB)`);

  manifest.legs.push({
    desktop: `/flight/desktop/leg-${n}.mp4`,
    mobile: `/flight/mobile/leg-${n}.mp4`,
    poster: `/flight/poster-${n}.webp`,
    posterMobile: `/flight/poster-${n}-m.webp`,
    duration: Number((await ffprobeDuration(ffprobe, d)).toFixed(3)),
  });
}

writeFileSync("src/lib/flight-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
const total = (dir: string) => readdirSync(join(OUT, dir)).reduce((a, f) => a + statSync(join(OUT, dir, f)).size, 0) / 1024 / 1024;
console.log(`\n✔ manifest written — desktop chain ${total("desktop").toFixed(1)} MB · mobile chain ${total("mobile").toFixed(1)} MB`);
process.exit(0);
