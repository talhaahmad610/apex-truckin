import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteSettings } from "@/lib/cms";

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings();
  return (
    <>
      <Navbar site={{ name: site.name, nav: site.nav, phone: site.phone, phoneHref: site.phoneHref, whatsapp: site.whatsapp, headerCta: site.headerCta, menuCta: site.menuCta, whatsappTooltip: site.whatsappTooltip }} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppButton href={site.whatsapp} name={site.name} tooltip={site.whatsappTooltip} />
    </>
  );
}
