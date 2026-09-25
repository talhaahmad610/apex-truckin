import type { NextRequest } from "next/server";
import { createServerSupabase } from "@/lib/supabase";
import { contactSchema } from "@/lib/schemas";
import { error, json, rateLimit, readJson, zodDetails } from "@/lib/http";

export const dynamic = "force-dynamic";

/** POST /api/contact — save a contact form submission. */
export async function POST(req: NextRequest) {
  if (!rateLimit(req, "contact", 5)) return error(429, "Too many requests — please wait a minute and try again");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = contactSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));

  const { company_website, ...v } = result.data;
  // Honeypot filled → pretend success, store nothing.
  if (company_website) return json({ message: "Thanks! We'll be in touch shortly." }, 201);

  const row = {
    full_name: v.full_name,
    email: v.email.toLowerCase(),
    phone: v.phone || null,
    equipment_type: v.equipment_type || null,
    message: v.message || null,
  };

  const sb = createServerSupabase();
  if (!sb) {
    if (process.env.NODE_ENV === "production") return error(503, "Contact storage is not configured");
    console.info("[contact] Supabase not configured — submission (dev only):", row);
    return json({ message: "Thanks! We'll be in touch shortly.", stored: false }, 201);
  }

  const { error: dbError } = await sb.from("contact_submissions").insert(row);
  if (dbError) return error(500, "Failed to save your message", dbError.message);
  return json({ message: "Thanks! A dispatcher will reach out within 1 business hour.", stored: true }, 201);
}
