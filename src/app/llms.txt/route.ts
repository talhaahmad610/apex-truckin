import { getPosts, getPricingTiers, getPublishedPages, getServices, getSiteContent, getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";
import { fillTokens } from "@/lib/tokens";

export const revalidate = 3600;

/** /llms.txt — concise, citation-friendly summary for AI assistants. */
export async function GET() {
  const [{ posts }, COMPANY, SERVICES, PRICING, content, pages] = await Promise.all([
    getPosts({ limit: 50 }),
    getSiteSettings(),
    getServices(),
    getPricingTiers(),
    getSiteContent(),
    getPublishedPages(),
  ]);
  const lastUpdated = new Date().toISOString().slice(0, 10);
  const keyPages = pages.filter((p) => p.showInSitemap && p.sitemapPriority > 0.3);
  const optionalPages = pages.filter((p) => p.showInSitemap && p.sitemapPriority <= 0.3);
  const body = `# ${COMPANY.name}

> ${COMPANY.name} is a 24/7 truck dispatch service based in ${COMPANY.address.city}, ${COMPANY.address.region}, founded in ${COMPANY.founded}. It finds, negotiates and books freight for owner-operators and small fleets across all 48 contiguous U.S. states. Carriers approve every load (no forced dispatch) and there are no contracts.

Last updated: ${lastUpdated}

Key facts:
- Equipment dispatched: ${SERVICES.map((s) => s.name).join(", ")}
- Pricing: ${PRICING.map((p) => `${p.name} — ${p.price} ${p.unit}`).join("; ")}
- Self-reported volume: 500+ loads dispatched monthly; 4.9/5 average carrier rating; 1,200+ broker partners
- Load boards used: DAT, Truckstop, 123Loadboard, plus a private broker network
- Onboarding: ~20 minutes (MC, W-9, COI); most carriers booked on their first load within 24 hours
- Carrier requirements: ${content.carrierRequirements.join("; ")}
- Cross-border freight (Canada/Mexico): handled case by case
- Address: ${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postal}
- Contact: ${COMPANY.phone} · ${COMPANY.email}

## How dispatch works
${content.steps.map((s, i) => `${String(i + 1).padStart(2, "0")}. ${s.title} — ${s.body}`).join("\n")}

## Services
${SERVICES.map((s) => `- [${s.name} dispatch](${SITE_URL}/services/${s.slug}): ${s.short} Typical freight rate paid to the carrier: ${s.avgRate}. Estimated weekly gross per truck before fuel & dispatch fees: ${s.weeklyGross}.`).join("\n")}

## Key pages
${keyPages.map((p) => `- [${p.title}](${SITE_URL}/${p.slug})${p.description ? `: ${fillTokens(p.description, COMPANY)}` : ""}`).join("\n")}
- [Blog](${SITE_URL}/blog): dispatch tips, industry news, owner-operator guides

## Articles
${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt ?? ""}`).join("\n")}
${
  optionalPages.length
    ? `
## Optional
${optionalPages.map((p) => `- [${p.title}](${SITE_URL}/${p.slug})`).join("\n")}
`
    : ""
}`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
