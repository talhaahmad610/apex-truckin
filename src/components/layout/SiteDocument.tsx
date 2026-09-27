import { SmoothScroll } from "@/components/3d/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { LazyToaster } from "@/components/layout/LazyToaster";
import { barlow, geist } from "@/lib/fonts";
import { organizationLd, websiteLd } from "@/lib/seo";
import { getServices, getSiteSettings } from "@/lib/cms";

/**
 * The public site's <html>/<body> shell. Shared by the (frontend) root layout and
 * app/global-not-found.tsx, which bypasses layouts entirely and must render its own document.
 */
export async function SiteDocument({ children }: { children: React.ReactNode }) {
  const [site, services] = await Promise.all([getSiteSettings(), getServices()]);
  return (
    <html lang="en-US" className={`${geist.variable} ${barlow.variable}`}>
      <body className="grain min-h-[100dvh] antialiased">
        <JsonLd data={[organizationLd(site, services), websiteLd(site)]} />
        <SmoothScroll />
        {children}
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
