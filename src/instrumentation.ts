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
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { isNextBuild } = await import("payload/shared");
  if (isNextBuild()) return;

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
