import type { Payload } from "payload";

// No `import "server-only"` here: this is reachable from payload.config.ts's onInit AND from
// scripts/seed-cms.ts, both loaded by the Payload CLI (`payload run`, `migrate`, ...) under plain
// Node with no `react-server` condition — server-only's export map throws unconditionally there.

/**
 * Creates the first admin user from SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD when the `users` table is
 * empty — never touches an existing user. Called from payload.config.ts's onInit (every server
 * boot; see the ordering note there) and from scripts/seed-cms.ts (CLI runs skip onInit).
 *
 * This exists because the committed snapshot/db.dump deliberately excludes `users` data (see
 * scripts/db-export.sh) — a restored production database has zero users, and Payload's public
 * `first-register` endpoint would let anyone claim the first admin account if this didn't run
 * before the server accepts requests.
 */
export async function ensureAdmin(payload: Payload): Promise<void> {
  const { totalDocs } = await payload.count({ collection: "users", overrideAccess: true });
  if (totalDocs > 0) return;

  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password || password.startsWith("replace_with") || password.length < 12) {
    payload.logger.error(
      "[ensure-admin] no users exist and SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD are missing, a placeholder, or under 12 characters — no admin was created. Set both in .env.local (or the server's env) and restart, or create one at /admin.",
    );
    return;
  }

  await payload.create({
    collection: "users",
    data: { email, password, name: "Admin" },
    overrideAccess: true,
    context: { bootstrap: true },
  });
  payload.logger.info(`[ensure-admin] created admin user ${email}`);
}
