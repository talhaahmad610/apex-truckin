import { connection } from "next/server";
import { SiteDocument } from "@/components/layout/SiteDocument";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { getSiteMetadata, siteViewport } from "@/lib/site-metadata";
import { getSiteSettings } from "@/lib/cms";
import { skipStaticGeneration } from "@/lib/build-flags";
import "./(frontend)/globals.css";

// Unmatched URLs: the app has two root layouts ((frontend) and (payload)), so there's no single
// layout to compose a 404 from — this renders the site's own 404 inside its own document.
export async function generateMetadata() {
  // See NotFoundView.tsx / SiteDocument.tsx: only bails to request-time during a DB-free Docker
  // build — a plain host build keeps prerendering this exactly as before.
  if (skipStaticGeneration) await connection();
  const [base, site] = await Promise.all([getSiteMetadata(), getSiteSettings()]);
  return { ...base, title: `Page not found | ${site.name}`, robots: { index: false } };
}
export const viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFoundView />
    </SiteDocument>
  );
}
