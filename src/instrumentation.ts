/**
 * Runs once when the Next.js server starts, before it accepts its first request — this is what
 * lets a fresh container become ready on its own: `getPayload({ cron: true })` connects to
 * Postgres, applies any pending `prodMigrations` (see payload.config.ts), runs the jobs `onInit`
 * sweep, and starts the jobs cron (hero-footage processing, scheduled publish) immediately,
 * instead of waiting for the first admin/auth request to trigger it internally.
 *
 * Must not run during `next build` — the image build has no live database (see
 * src/lib/build-flags.ts) and `next build` also loads this file, so it's guarded the same way
 * Payload guards its own build-time behavior (isNextBuild()).
 */
/**
 * Log-only sanity check for the obvious ways a server deploy can accidentally ship local-dev
 * values: never blocks boot (a false positive here must not take the site down), just makes the
 * mistake visible in the container logs instead of silently running with a known-weak config.
 */
function warnIfDevDefaults() {
  if (process.env.NODE_ENV !== "production") return;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  if (/^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])/.test(siteUrl)) return; // looks like local dev itself

  const problems: string[] = [];
  if ((process.env.DATABASE_URI ?? "").includes("apex_dev_password")) problems.push("DATABASE_URI still has the dev Postgres password");
  if ((process.env.POSTGRES_PASSWORD ?? "") === "apex_dev_password") problems.push("POSTGRES_PASSWORD is still the dev default");
  if ((process.env.S3_SECRET_ACCESS_KEY ?? "") === "apex_minio_dev_password") problems.push("S3_SECRET_ACCESS_KEY is still the dev MinIO default");
  const secret = process.env.PAYLOAD_SECRET ?? "";
  if (!secret || secret.startsWith("replace_with")) problems.push("PAYLOAD_SECRET is empty or still the placeholder");
  if (process.env.TRUST_PROXY !== "1") problems.push("TRUST_PROXY is not set — rate limiting can't isolate clients behind a reverse proxy (see src/lib/http.ts)");

  if (problems.length) {
    console.error(`[instrumentation] production boot with suspicious config:\n - ${problems.join("\n - ")}`);
  }
}

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { isNextBuild } = await import("payload/shared");
  if (isNextBuild()) return;

  warnIfDevDefaults();

  const { getPayloadClient } = await import("@/lib/payload");

  // `depends_on: condition: service_healthy` should mean Postgres already accepts connections by
  // the time this runs, but a few retries guard against any remaining boot-order race — without
  // them, a transient blip here would keep the whole container from ever starting.
  for (let attempt = 1; ; attempt++) {
    try {
      await getPayloadClient();
      return;
    } catch (err) {
      if (attempt >= 5) {
        // The server still starts — the next request that needs Payload calls getPayloadClient()
        // itself (this was only a head start on migrations/cron, not the only path to a working
        // instance) — but migrations/cron won't have run yet, so this is worth seeing in the logs.
        console.error("[instrumentation] Payload failed to initialize after 5 attempts; continuing to boot", err);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
    }
  }
}
