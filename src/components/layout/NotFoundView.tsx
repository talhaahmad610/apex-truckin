import { connection } from "next/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { DepthLayers } from "@/components/3d/DepthLayers";
import { getSiteSettings } from "@/lib/cms";
import { skipStaticGeneration } from "@/lib/build-flags";

export async function NotFoundView() {
  // Forces this to render at request time during a DB-free Docker build only (see
  // SiteDocument.tsx) — the 404 views have no dynamic params to key off of, so Next would
  // otherwise try to prerender them (and read the database) during `next build`. A plain host
  // build is unaffected and keeps prerendering this exactly as before.
  if (skipStaticGeneration) await connection();
  const site = await getSiteSettings();
  return (
    <>
      <Navbar site={{ name: site.name, nav: site.nav, phone: site.phone, phoneHref: site.phoneHref, whatsapp: site.whatsapp, headerCta: site.headerCta, menuCta: site.menuCta, whatsappTooltip: site.whatsappTooltip }} />
      <main id="main" className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <DepthLayers />
        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-amber">Error 404 · Wrong exit</p>
          <h1 className="mt-5 font-display text-[clamp(4rem,14vw,12rem)] font-bold uppercase leading-[0.84]">
            Off the <span className="text-gradient">route.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">This page took a detour. Let&apos;s get you back on the highway.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" size="lg">Back Home</Button>
            <Button href="/contact" size="lg" variant="ghost" icon={false}>Talk to Dispatch</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
