import type { NextRequest } from "next/server";
import { newsletterSchema } from "@/lib/schemas";
import { error, json, rateLimit, readJson, zodDetails } from "@/lib/http";
import { getPayloadClient } from "@/lib/payload";

export const dynamic = "force-dynamic";

const SUBSCRIBED = "Subscribed! Watch your inbox for weekly lane intel.";

/** POST /api/newsletter — subscribe an email. Idempotent for existing subscribers. */
export async function POST(req: NextRequest) {
  if (!rateLimit(req, "newsletter", 5)) return error(429, "Too many requests — please wait a minute and try again");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = newsletterSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));
  const email = result.data.email.toLowerCase();

  try {
    const payload = await getPayloadClient();
    const existing = await payload.find({
      collection: "subscribers",
      where: { email: { equals: email } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const current = existing.docs[0];
    if (current) {
      // Re-subscribing after an unsubscribe reactivates; otherwise it's a no-op. Same response
      // either way (and the same one a brand-new signup gets, below) — an identical message/status
      // for "new" vs "already subscribed" vs "reactivated" means the endpoint can't be used to
      // probe which emails are already on the list.
      if (current.status !== "active") {
        await payload.update({ collection: "subscribers", id: current.id, data: { status: "active" }, overrideAccess: true });
      }
      return json({ message: SUBSCRIBED }, 200);
    }
    await payload.create({
      collection: "subscribers",
      overrideAccess: true,
      data: { email, status: "active", source: result.data.source_path || null },
    });
    return json({ message: SUBSCRIBED }, 200);
  } catch (err) {
    // Two simultaneous signups for the same email: the unique index rejects the second insert.
    if ((err as { name?: string }).name === "ValidationError") {
      return json({ message: SUBSCRIBED }, 200);
    }
    console.error("[newsletter] failed to subscribe", err);
    return error(500, "Failed to subscribe");
  }
}
