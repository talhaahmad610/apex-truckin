import { connection } from "next/server";
import { SmoothScroll } from "@/components/3d/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { LazyToaster } from "@/components/layout/LazyToaster";
import { SiteScripts } from "@/components/layout/SiteScripts";
import { barlow, geist } from "@/lib/fonts";
import { organizationLd, websiteLd } from "@/lib/seo";
import { getServices, getSiteSettings } from "@/lib/cms";
import { buildCsp } from "@/lib/csp";
import { getMediaOrigin } from "@/lib/media-origin";
import { skipStaticGeneration } from "@/lib/build-flags";

/**
 * The public site's <html>/<body> shell. Shared by the (frontend) root layout and
 * app/global-not-found.tsx, which bypasses layouts entirely and must render its own document.
 */
export async function SiteDocument({ children }: { children: React.ReactNode }) {
  // /_not-found has no dynamic segment to skip via generateStaticParams (unlike every CMS route,
  // which already renders on-demand during a DB-free build — see build-flags.ts) and Next always
  // attempts to prerender it, so this is the one place that needs an explicit bailout, and only
  // for the DB-free Docker build: a plain host build must keep prerendering it normally.
  if (skipStaticGeneration) await connection();
  const [site, services] = await Promise.all([getSiteSettings(), getServices()]);
  const csp = buildCsp({
    head: site.scripts.head,
    bodyEnd: site.scripts.bodyEnd,
    extraAllowedDomains: site.scripts.extraAllowedDomains,
    mediaOrigin: getMediaOrigin().origin,
    isDev: process.env.NODE_ENV !== "production",
  });
  return (
    <html lang="en-US" className={`${geist.variable} ${barlow.variable}`}>
      <body className="grain min-h-[100dvh] antialiased">
        {/* Rendered first so it applies to everything that follows — see next.config.ts for why
            this can't be a static header directive (it has to reflect admin-pasted scripts). */}
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <SiteScripts nodes={site.scripts.head} />
        <JsonLd data={[organizationLd(site, services), websiteLd(site)]} />
        <SmoothScroll />
        {children}
        <SiteScripts nodes={site.scripts.bodyEnd} />
        <LazyToaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            classNames: {
              toast: "!rounded-2xl !border !border-[rgba(245,166,35,0.2)] !bg-[#13151f]/95 !text-white !backdrop-blur-xl",
              description: "!text-[#a0aec0]",
            },
          }}
        />
      </body>
    </html>
  );
}
