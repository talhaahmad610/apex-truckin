import { Check, Minus } from "lucide-react";
import { PRICING_COMPARISON, PRICING_FAQS } from "@/lib/constants";
import { faqLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata = pageMetadata({
  title: "Truck Dispatch Pricing — 5% Per Load or $300/Truck Flat",
  description:
    "Transparent truck dispatch pricing: Starter at 5% per load, Professional at $300 per truck per month, or custom Enterprise plans. No contracts or setup fees.",
  path: "/pricing",
});

function Cell({ v }: { v: boolean | string }) {
  if (typeof v === "string") return <span className="font-medium text-white">{v}</span>;
  return v ? (
    <Check className="mx-auto h-5 w-5 text-amber" strokeWidth={2} aria-label="Included" />
  ) : (
    <Minus className="mx-auto h-5 w-5 text-white/25" aria-label="Not included" />
  );
}

export default function PricingPage() {
  return (
    <>
      <JsonLd data={faqLd(PRICING_FAQS)} />
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Pay for results. <span className="text-gradient">Not promises.</span>
          </>
        }
        subtitle="Simple, transparent dispatch pricing. No contracts, no setup fees, no forced dispatch — cancel anytime."
        crumbs={[{ name: "Pricing", path: "/pricing" }]}
        className="min-h-[60dvh]"
      />
      <PricingSection withHeading={false} />

      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-8">
          <SectionLabel label="Compare plans" />
          <h2 data-reveal="up" className="mb-10 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
            Every feature, <span className="text-gradient">side by side</span>
          </h2>
          <div data-reveal="up" className="bezel">
            <div className="bezel-core relative overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <caption className="sr-only">Feature comparison of Starter, Professional and Enterprise plans</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="sticky left-0 z-10 bg-card p-5 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Feature</th>
                    <th scope="col" className="p-5 text-center font-display text-xl font-bold uppercase">Starter</th>
                    <th scope="col" className="bg-amber/[0.06] p-5 text-center font-display text-xl font-bold uppercase text-amber">Professional</th>
                    <th scope="col" className="p-5 text-center font-display text-xl font-bold uppercase">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_COMPARISON.map((r) => (
                    <tr key={r.feature} className="border-b border-white/5 last:border-0">
                      <th scope="row" className="sticky left-0 z-10 bg-card p-5 text-left font-normal text-white/80">{r.feature}</th>
                      <td className="p-5 text-center"><Cell v={r.starter} /></td>
                      <td className="bg-amber/[0.04] p-5 text-center"><Cell v={r.pro} /></td>
                      <td className="p-5 text-center"><Cell v={r.ent} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Scroll affordance: hints that more columns exist off-screen on narrow viewports. */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent md:hidden" />
            </div>
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel label="FAQ" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.92]">
              Pricing questions
            </h2>
          </div>
          <div data-reveal="up" className="lg:col-span-8">
            <FAQAccordion items={PRICING_FAQS} />
          </div>
        </div>
      </RevealWrapper>
      <CTABannerSection />
    </>
  );
}
