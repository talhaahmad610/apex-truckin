import type { Metadata } from "next";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <HowItWorksSection />
      <CoverageMapSection />
      <PricingSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <CTABannerSection />
      <ContactSection />
    </>
  );
}
