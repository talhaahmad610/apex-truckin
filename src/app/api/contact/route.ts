import { after, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { error, json, rateLimit, readJson, zodDetails } from "@/lib/http";
import { getPayloadClient } from "@/lib/payload";
import { notifyNewLead } from "@/lib/notify";

export const dynamic = "force-dynamic";

const THANKS = "Thanks! A dispatcher will reach out within 1 business hour.";

async function successMessage(payload: Awaited<ReturnType<typeof getPayloadClient>>): Promise<string> {
  const notifications = await payload.findGlobal({ slug: "notifications", overrideAccess: true, depth: 0 });
  return notifications.contactSuccessMessage || THANKS;
}

function sourceFromPath(path: string): "home" | "contact" | "service" | "other" {
  if (path === "/") return "home";
  if (path === "/contact") return "contact";
  if (path.startsWith("/services")) return "service";
  return "other";
}

/** POST /api/contact — save a contact form submission as a CRM lead. */
export async function POST(req: NextRequest) {
  if (!rateLimit(req, "contact", 5)) return error(429, "Too many requests — please wait a minute and try again");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = contactSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));

  const { company_website, source_path, ...v } = result.data;
  const payload = await getPayloadClient();

  // A second, per-email cap (independent of the per-IP one above): the auto-reply is sent to
  // whatever address is submitted, so without this an attacker with many IPs (or one IP under
  // TRUST_PROXY=0) could aim the site's branded auto-reply email at one address repeatedly.
  if (!rateLimit(req, `contact:email:${v.email.toLowerCase()}`, 2, 60 * 60_000)) {
    return error(429, "Too many requests — please wait a minute and try again");
  }

  // Honeypot filled → identical response to the real success path (stored: true) — nothing is
  // actually stored, but a bot probing the shape of the response can't tell the two apart.
  if (company_website) return json({ message: await successMessage(payload), stored: true }, 201);

  const path = source_path || "/";
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || null;

  try {
    const lead = await payload.create({
      collection: "leads",
      overrideAccess: true, // public submissions are validated above; the collection itself is admin-only
      data: {
        fullName: v.full_name,
        email: v.email.toLowerCase(),
        phone: v.phone || null,
        equipmentType: v.equipment_type || null,
        message: v.message || null,
        status: "new",
        source: sourceFromPath(path),
        sourcePath: path,
        ip,
        userAgent: req.headers.get("user-agent")?.slice(0, 300) ?? null,
      },
    });

    // Runs after the response is sent — email latency/outages never affect the visitor.
    after(() =>
      notifyNewLead(payload, {
        id: lead.id,
        fullName: lead.fullName,
        email: lead.email,
        phone: lead.phone,
        equipmentType: lead.equipmentType,
        message: lead.message,
        sourcePath: lead.sourcePath,
      }),
    );

    return json({ message: await successMessage(payload), stored: true }, 201);
  } catch (err) {
    console.error("[contact] failed to save lead", err);
    return error(500, "Failed to save your message");
  }
}
