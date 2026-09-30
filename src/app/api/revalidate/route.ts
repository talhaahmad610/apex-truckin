import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { error, json, readJson } from "@/lib/http";
import { isValidRevalidateToken } from "@/lib/revalidate-token";

export const dynamic = "force-dynamic";

// revalidateTag/revalidatePath only work inside a Next request's work store — a Payload job
// running from cron has none — so the hero-video job calls this route over HTTP instead of
// calling them in-process (where they'd throw and be silently swallowed).
const ALLOWED_TAGS = new Set(["home", "flight", "pages", "settings", "content"]);
// Every path this route is ever asked to revalidate is a plain site route (no query string,
// fragment, or scheme-relative form) — this is the token holder trusting itself, not user input,
// but shaping it this tightly means a leaked token can't be used to revalidate arbitrary/expensive
// paths outside the site.
const SAFE_PATH = /^\/[\w\-/]*$/;

/** POST /api/revalidate — internal only, guarded by a token derived from PAYLOAD_SECRET. */
export async function POST(req: NextRequest) {
  const token = req.headers.get("x-revalidate-token") || "";
  if (!isValidRevalidateToken(token)) return error(401, "Invalid token");

  const parsed = await readJson(req);
  if (!parsed.ok || typeof parsed.body !== "object" || parsed.body === null) return error(400, "Request body must be valid JSON");
  const { tags, paths } = parsed.body as { tags?: unknown; paths?: unknown };

  for (const t of Array.isArray(tags) ? tags : []) {
    if (typeof t === "string" && ALLOWED_TAGS.has(t)) revalidateTag(t, { expire: 0 });
  }
  for (const p of Array.isArray(paths) ? paths : []) {
    if (typeof p === "string" && SAFE_PATH.test(p)) revalidatePath(p);
  }

  return json({ ok: true });
}
