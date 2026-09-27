import { CARRIER_REQUIREMENTS, STEPS } from "@/lib/constants";
import { getPosts, getPricingTiers, getServices, getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

/** /llms.txt — concise, citation-friendly summary for AI assistants. */
export async function GET() {
  const [{ posts }, COMPANY, SERVICES, PRICING] = await Promise.all([getPosts({ limit: 50 }), getSiteSettings(), getServices(), getPricingTiers()]);
  const lastUpdated = new Date().toISOString().slice(0, 10);
  const body = `# ${COMPANY.name}

> ${COMPANY.name} is a 24/7 truck dispatch service based in ${COMPANY.address.city}, ${COMPANY.address.region}, founded in ${COMPANY.founded}. It finds, negotiates and books freight for owner-operators and small fleets across all 48 contiguous U.S. states. Carriers approve every load (no forced dispatch) and there are no contracts.

Last updated: ${lastUpdated}

Key facts:
- Equipment dispatched: ${SERVICES.map((s) => s.name).join(", ")}
- Pricing: ${PRICING.map((p) => `${p.name} — ${p.price} ${p.unit}`).join("; ")}
- Self-reported volume: 500+ loads dispatched monthly; 4.9/5 average carrier rating; 1,200+ broker partners
- Load boards used: DAT, Truckstop, 123Loadboard, plus a private broker network
- Onboarding: ~20 minutes (MC, W-9, COI); most carriers booked on their first load within 24 hours
- Carrier requirements: ${CARRIER_REQUIREMENTS.join("; ")}
- Cross-border freight (Canada/Mexico): handled case by case
- Address: ${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postal}
- Contact: ${COMPANY.phone} · ${COMPANY.email}

## How dispatch works
${STEPS.map((s) => `${s.n}. ${s.title} — ${s.body}`).join("\n")}

## Services
${SERVICES.map((s) => `- [${s.name} dispatch](${SITE_URL}/services/${s.slug}): ${s.short} Typical rate ${s.avgRate}.`).join("\n")}

## Key pages
- [All services](${SITE_URL}/services): every equipment type dispatched, compared side by side
- [Pricing](${SITE_URL}/pricing): plan comparison and pricing FAQ
- [For carriers](${SITE_URL}/carriers): benefits, onboarding requirements
- [About](${SITE_URL}/about): company story, team, values
- [Contact](${SITE_URL}/contact): phone, email, WhatsApp, business hours
- [Blog](${SITE_URL}/blog): dispatch tips, industry news, owner-operator guides

## Articles
${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt ?? ""}`).join("\n")}

## Optional
- [Privacy policy](${SITE_URL}/privacy)
- [Terms of service](${SITE_URL}/terms)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
