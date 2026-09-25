import type { NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { newsletterSchema } from "@/lib/schemas";
import { PG_UNIQUE_VIOLATION, error, json, rateLimit, readJson, zodDetails } from "@/lib/http";

export const dynamic = "force-dynamic";

/** POST /api/newsletter — subscribe an email. Idempotent for existing subscribers. */
export async function POST(req: NextRequest) {
  if (!rateLimit(req, "newsletter", 5)) return error(429, "Too many requests — please wait a minute and try again");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = newsletterSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));
  const email = result.data.email.toLowerCase();

  const sb = createServerSupabase();
  if (!sb) {
    if (process.env.NODE_ENV === "production") return error(503, "Newsletter storage is not configured");
    console.info("[newsletter] Supabase not configured — subscriber (dev only):", email);
    return json({ message: "Subscribed! Watch your inbox for weekly lane intel.", stored: false }, 201);
  }

  const { error: dbError } = await sb.from("newsletter_subscribers").insert({ email });
  if (dbError) {
    if (dbError.code === PG_UNIQUE_VIOLATION) return json({ message: "You're already subscribed — thanks!" }, 200);
    return error(500, "Failed to subscribe", dbError.message);
  }
  return json({ message: "Subscribed! Watch your inbox for weekly lane intel." }, 201);
}
