import { SiteDocument } from "@/components/layout/SiteDocument";
import { NotFoundView } from "@/components/layout/NotFoundView";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import { COMPANY } from "@/lib/constants";
import "./(frontend)/globals.css";

// Unmatched URLs: the app has two root layouts ((frontend) and (payload)), so there's no single
// layout to compose a 404 from — this renders the site's own 404 inside its own document.
export const metadata = { ...siteMetadata, title: `Page not found | ${COMPANY.name}`, robots: { index: false } };
export const viewport = siteViewport;

export default function GlobalNotFound() {
  return (
    <SiteDocument>
      <NotFoundView />
    </SiteDocument>
  );
}
