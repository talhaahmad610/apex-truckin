import { pageMetadata } from "@/lib/seo";
import { getServices, getSiteSettings } from "@/lib/cms";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CoverageMapSection } from "@/components/sections/CoverageMapSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { ContactSection } from "@/components/sections/ContactSection";

export const revalidate = 300;

export const generateMetadata = () => pageMetadata({
  // Root layout's title template appends "| Apex Truckin" — don't repeat the brand here.
  title: "Truck Dispatch Services for Owner-Operators & Fleets",
  description:
    "24/7 truck dispatch for owner-operators and fleets: dry van, flatbed, reefer, hotshot, step deck, power only and box truck. Higher-paying loads, no forced dispatch, all 48 states.",
  path: "/",
});

export default async function HomePage() {
  const [services, site] = await Promise.all([getServices(), getSiteSettings()]);
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <StatsSection />
      <AboutSection />
      <ServicesSection services={services} disclaimer={`${site.rateDisclaimer} ${site.grossDisclaimer}`} />
      <HowItWorksSection />
      <CoverageMapSection siteName={site.name} />
      <PricingSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <CTABannerSection title={<>You drive. <span className="text-gradient">We handle the rest.</span></>} />
      <ContactSection />
    </>
  );
}
