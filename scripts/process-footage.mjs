#!/usr/bin/env node
/**
 * Footage pipeline for the scroll-scrubbed hero (FlightScrub).
 *
 *   assets/raw/leg-1.mp4 … leg-N.mp4   (any source: stock, Blender, Higgsfield, phone…)
 *        ↓  trim · unify fps · amber cinematic grade · scrub-friendly GOP
 *   public/flight/desktop/leg-N.mp4    1600×900, keyframe every 8 frames, CRF 24
 *   public/flight/mobile/leg-N.mp4     608×1080 (native 9:16 centre crop), keyframe every 4, CRF 27
 *   public/flight/poster-N.webp / poster-N-m.webp   first frame of each leg (LCP image)
 *   src/lib/flight-manifest.json       consumed by HeroSection → FlightScrub
 *
 * Short GOPs are what make scrubbing smooth: every seek lands ≤ 8 frames from a keyframe.
 * Usage: node scripts/process-footage.mjs [--max 8] [--fps 30]
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { FFMPEG, FFPROBE } from "./ffmpeg-path.mjs";

const arg = (name, def) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? Number(process.argv[i + 1]) : def;
};
const MAX = arg("max", 8);
const FPS = arg("fps", 30);

const RAW = "assets/raw";
const OUT = "public/flight";
const ffmpeg = FFMPEG();
const ffprobe = FFPROBE();
mkdirSync(join(OUT, "desktop"), { recursive: true });
mkdirSync(join(OUT, "mobile"), { recursive: true });

// Per-leg overrides: trim start (s) and extra grade (leg 2 is daylight → pull toward dusk).
const LEG_OPTS = {
  1: { ss: 0 },
  2: { ss: 0, extra: "eq=brightness=-0.06:gamma=0.92," },
  3: { ss: 2 },
  4: { ss: 0 },
};

// Shared look: slight crush, warm amber highlights, teal-neutral shadows, soft vignette, fine sharpening.
const GRADE =
  "eq=contrast=1.08:saturation=0.92:gamma=0.96," +
  "colorbalance=rs=-0.03:gs=-0.01:bs=0.04:rm=0.03:bm=-0.02:rh=0.07:gh=0.02:bh=-0.07," +
  "curves=master='0/0.02 0.5/0.47 1/0.97'," +
  "vignette=PI/5," +
  "unsharp=5:5:0.5:5:5:0";

const probe = (file) =>
  Number(
    execFileSync(ffprobe, ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", file], { encoding: "utf8" }).trim(),
  );

const run = (args) => execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
const kb = (f) => `${(statSync(f).size / 1024 / 1024).toFixed(2)} MB`;

const legs = readdirSync(RAW)
  .map((f) => /^leg-(\d+)\.(mp4|mov|webm|mkv)$/i.exec(f))
  .filter(Boolean)
  .sort((a, b) => Number(a[1]) - Number(b[1]));

if (!legs.length) {
  console.error(`✖ No clips found. Put leg-1.mp4, leg-2.mp4 … in ${RAW}/`);
  process.exit(1);
}

const manifest = { generated: new Date().toISOString(), legs: [] };

for (const [file, nStr] of legs) {
  const n = Number(nStr);
  const src = join(RAW, file);
  const opts = LEG_OPTS[n] ?? { ss: 0 };
  const srcDur = probe(src);
  const dur = Math.min(MAX, Math.max(1, srcDur - opts.ss));
  const pre = `fps=${FPS},${opts.extra ?? ""}${GRADE}`;
  const d = join(OUT, "desktop", `leg-${n}.mp4`);
  const m = join(OUT, "mobile", `leg-${n}.mp4`);

  const common = ["-an", "-c:v", "libx264", "-preset", "slow", "-pix_fmt", "yuv420p", "-sc_threshold", "0", "-movflags", "+faststart"];

  console.log(`▶ leg ${n}: ${srcDur.toFixed(1)}s source → ${dur.toFixed(1)}s`);
  run(["-ss", String(opts.ss), "-t", String(dur), "-i", src, "-vf", `scale=1600:900:force_original_aspect_ratio=increase:flags=lanczos,crop=1600:900,${pre}`, ...common, "-crf", "24", "-g", "8", "-keyint_min", "8", d]);
  console.log(`  ✔ ${d} (${kb(d)})`);
  run(["-ss", String(opts.ss), "-t", String(dur), "-i", src, "-vf", `scale=-2:1080:flags=lanczos,crop=608:1080,${pre}`, ...common, "-crf", "27", "-g", "4", "-keyint_min", "4", m]);
  console.log(`  ✔ ${m} (${kb(m)})`);

  const p = join(OUT, `poster-${n}.webp`);
  const pm = join(OUT, `poster-${n}-m.webp`);
  run(["-i", d, "-frames:v", "1", "-c:v", "libwebp", "-quality", "72", p]);
  run(["-i", m, "-frames:v", "1", "-c:v", "libwebp", "-quality", "72", pm]);
  console.log(`  ✔ posters (${Math.round(statSync(p).size / 1024)} KB / ${Math.round(statSync(pm).size / 1024)} KB)`);

  manifest.legs.push({
    desktop: `/flight/desktop/leg-${n}.mp4`,
    mobile: `/flight/mobile/leg-${n}.mp4`,
    poster: `/flight/poster-${n}.webp`,
    posterMobile: `/flight/poster-${n}-m.webp`,
    duration: Number(probe(d).toFixed(3)),
  });
}

writeFileSync("src/lib/flight-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
const total = (dir) => readdirSync(join(OUT, dir)).reduce((a, f) => a + statSync(join(OUT, dir, f)).size, 0) / 1024 / 1024;
console.log(`\n✔ manifest written — desktop chain ${total("desktop").toFixed(1)} MB · mobile chain ${total("mobile").toFixed(1)} MB`);
