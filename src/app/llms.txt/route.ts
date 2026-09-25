import { COMPANY, PRICING, SERVICES } from "@/lib/constants";
import { getPosts } from "@/lib/api";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

/** /llms.txt — concise, citation-friendly summary for AI assistants. */
export async function GET() {
  const { posts } = await getPosts({ limit: 50 });
  const body = `# ${COMPANY.name}

> ${COMPANY.name} is a 24/7 truck dispatch service based in ${COMPANY.address.city}, ${COMPANY.address.region}, founded in ${COMPANY.founded}. It finds, negotiates and books freight for owner-operators and small fleets across all 48 contiguous U.S. states. Carriers approve every load (no forced dispatch) and there are no contracts.

Key facts:
- Equipment dispatched: ${SERVICES.map((s) => s.name).join(", ")}
- Pricing: ${PRICING.map((p) => `${p.name} — ${p.price} ${p.unit}`).join("; ")}
- Volume: 500+ loads dispatched monthly; 4.9/5 average carrier rating; 1,200+ broker partners
- Contact: ${COMPANY.phone} · ${COMPANY.email}

## Services
${SERVICES.map((s) => `- [${s.name} dispatch](${SITE_URL}/services/${s.slug}): ${s.short} Typical rate ${s.avgRate}.`).join("\n")}

## Key pages
- [Pricing](${SITE_URL}/pricing): plan comparison and pricing FAQ
- [For carriers](${SITE_URL}/carriers): benefits, onboarding requirements
- [About](${SITE_URL}/about): company story, team, values
- [Contact](${SITE_URL}/contact): phone, email, WhatsApp, business hours

## Articles
${posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt ?? ""}`).join("\n")}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
