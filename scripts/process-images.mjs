#!/usr/bin/env node
// Converts assets/raw-images/*.jpg → public/images/*.webp (resized, lightly graded toward the
// brand's warm/amber palette). og-default is also emitted as a 1200×630 JPG for social cards.
// Usage: node scripts/process-images.mjs
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, parse } from "node:path";
import { FFMPEG } from "./ffmpeg-path.mjs";

const SRC = "assets/raw-images";
const OUT = "public/images";
const ffmpeg = FFMPEG();
mkdirSync(OUT, { recursive: true });

// Subtle warm split-tone: lifted amber highlights, cool-neutral shadows, slight desaturation.
const GRADE = "eq=contrast=1.06:saturation=0.9:brightness=-0.02,colorbalance=rs=-0.02:bs=0.03:rh=0.05:gh=0.02:bh=-0.05";

const widthFor = (name) => (name.startsWith("team-") ? 800 : name.startsWith("service-") || name.startsWith("blog-") ? 1600 : 2000);

const run = (args) => execFileSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });

for (const file of readdirSync(SRC).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const { name } = parse(file);
  const input = join(SRC, file);
  const w = widthFor(name);
  const vf = name.startsWith("team-")
    ? `crop='min(iw,ih)':'min(iw,ih)':(iw-min(iw\\,ih))/2:0,scale=${w}:-2:flags=lanczos,${GRADE}`
    : `scale='min(${w},iw)':-2:flags=lanczos,${GRADE}`;
  const out = join(OUT, `${name}.webp`);
  run(["-i", input, "-vf", vf, "-c:v", "libwebp", "-quality", "78", "-compression_level", "6", out]);
  console.log(`✔ ${out} (${Math.round(statSync(out).size / 1024)} KB)`);

  if (name === "og-default") {
    const og = join(OUT, "og-default.jpg");
    run(["-i", input, "-vf", `scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,${GRADE}`, "-q:v", "3", og]);
    console.log(`✔ ${og} (social card)`);
  }
}

if (!existsSync(join(OUT, "og-default.jpg"))) console.warn("⚠ og-default.jpg missing — add assets/raw-images/og-default.jpg");
