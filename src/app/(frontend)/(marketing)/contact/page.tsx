import { COMPANY, GENERAL_FAQS } from "@/lib/constants";
import { faqLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ContactMethods, MapEmbed } from "@/components/sections/ContactSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/ui/JsonLd";
import { LiveDot } from "@/components/ui/Card";

export const metadata = pageMetadata({
  title: "Contact Apex Truckin — 24/7 Truck Dispatch Support",
  description: `Talk to a truck dispatcher 24/7. Call ${COMPANY.phone}, email ${COMPANY.email} or message us on WhatsApp for a free lane review.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqLd(GENERAL_FAQS)} />
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s get you <span className="text-gradient">loaded.</span>
          </>
        }
        subtitle="Send us your truck details and we'll come back with a free lane review — the rates, lanes and weekly gross you should be seeing."
        crumbs={[{ name: "Contact", path: "/contact" }]}
        className="min-h-[60dvh]"
      />

      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12">
          <div data-reveal="up" className="lg:col-span-7">
            <div className="bezel">
              <div className="bezel-core p-6 sm:p-10">
                <h2 className="mb-8 font-display text-4xl font-bold uppercase">Start dispatching</h2>
                <ContactForm />
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-5">
            <div data-reveal="up">
              <ContactMethods />
            </div>
            <div data-reveal="up" className="bezel">
              <div className="bezel-core p-7">
                <p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                  <LiveDot /> Business hours
                </p>
                <dl className="divide-y divide-white/10">
                  {COMPANY.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-white/70">{h.days}</dt>
                      <dd className="font-medium text-white">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div data-reveal="up">
              <MapEmbed />
            </div>
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel label="FAQ" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.92]">
              Before you call
            </h2>
          </div>
          <div data-reveal="up" className="lg:col-span-8">
            <FAQAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </RevealWrapper>
    </>
  );
}
