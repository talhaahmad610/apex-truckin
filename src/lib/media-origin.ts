/**
 * The public origin browsers fetch media (images, processed hero clips) from — MinIO/S3 behind
 * `S3_PUBLIC_URL`, or `S3_ENDPOINT` in dev. Shared by next.config.ts (images.remotePatterns) and
 * the CSP builder (img-src/media-src/connect-src), so the two never drift apart.
 *
 * Deliberately dependency-free (no `@/` alias, no Next/Payload imports) so next.config.ts — a
 * plain Node/ESM file outside the app's module graph — can import it directly by relative path.
 */
export function getMediaOrigin(): { origin: string; isLoopback: boolean } {
  const raw = process.env.S3_PUBLIC_URL || process.env.S3_ENDPOINT;
  if (!raw) return { origin: "", isLoopback: false };
  try {
    const url = new URL(raw);
    return { origin: url.origin, isLoopback: ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) };
  } catch {
    return { origin: "", isLoopback: false };
  }
}
