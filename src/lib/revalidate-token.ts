/**
 * Authenticates the job → site `/api/revalidate` call. `revalidateTag`/`revalidatePath` only work
 * inside a Next request's work store — a cron-run Payload job has none — so the job hits this route
 * over HTTP instead of calling them directly. No separate secret to configure: derived from
 * `PAYLOAD_SECRET`, which never leaves the server either way.
 *
 * Deliberately no `import "server-only"`: `processFlightLeg.ts` (which uses this) is registered in
 * `jobs.tasks`, so `payload.config.ts` loads it eagerly under the `payload` CLI too (migrate/
 * generate/run), which runs under plain Node without the `react-server` condition `server-only`
 * needs to be a no-op — it would throw there instead of guarding a browser import.
 */
import { createHash, timingSafeEqual } from "node:crypto";

export function revalidateToken(): string {
  return createHash("sha256").update(`revalidate:${process.env.PAYLOAD_SECRET || ""}`).digest("hex");
}

export function isValidRevalidateToken(candidate: string): boolean {
  const expected = Buffer.from(revalidateToken());
  const given = Buffer.from(candidate || "");
  return given.length === expected.length && timingSafeEqual(given, expected);
}
