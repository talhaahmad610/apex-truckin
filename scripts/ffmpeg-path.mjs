// Resolve an ffmpeg/ffprobe binary: $FFMPEG_BIN dir → PATH → WinGet Gyan.FFmpeg install.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

function onPath(bin) {
  try {
    execFileSync(bin, ["-version"], { stdio: "ignore" });
    return bin;
  } catch {
    return null;
  }
}

function winget(bin) {
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

export function resolveBin(bin) {
  if (process.env.FFMPEG_BIN) {
    const p = join(process.env.FFMPEG_BIN, process.platform === "win32" ? `${bin}.exe` : bin);
    if (existsSync(p)) return p;
  }
  const found = onPath(bin) ?? winget(bin);
  if (!found) {
    console.error(`✖ ${bin} not found. Install it (Windows: winget install Gyan.FFmpeg · macOS: brew install ffmpeg) or set FFMPEG_BIN.`);
    process.exit(1);
  }
  return found;
}

export const FFMPEG = () => resolveBin("ffmpeg");
export const FFPROBE = () => resolveBin("ffprobe");
