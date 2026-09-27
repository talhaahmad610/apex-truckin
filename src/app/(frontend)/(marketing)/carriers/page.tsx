import { CheckCircle2 } from "lucide-react";
import { CARRIER_BENEFITS, CARRIER_REQUIREMENTS, GENERAL_FAQS, STEPS } from "@/lib/constants";
import { faqLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { TiltCard } from "@/components/3d/TiltCard";
import { CssTruck } from "@/components/3d/CssTruck";
import { DepthLayers } from "@/components/3d/DepthLayers";

export const metadata = pageMetadata({
  title: "For Carriers — Dispatch for Owner-Operators & Small Fleets",
  description:
    "Owner-operators and fleets: get higher-paying loads, less deadhead and 24/7 dispatch support. No forced dispatch, no contracts. See requirements and join Apex Truckin.",
  path: "/carriers",
});

export default function CarriersPage() {
  return (
    <>
      <JsonLd data={faqLd(GENERAL_FAQS)} />
      <PageHero
        eyebrow="For owner-operators & fleets"
        title={
          <>
            Drive more. <span className="text-gradient">Earn more.</span> Stress less.
          </>
        }
        subtitle="Join 150+ carriers who let Apex handle the load boards, the brokers and the paperwork — while they keep the wheels turning."
        image="/images/service-power-only.webp"
        crumbs={[{ name: "Carriers", path: "/carriers" }]}
      >
        <Button href="/contact" size="lg">Join the Network</Button>
      </PageHero>

      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel n="01" label="Benefits" />
          <h2 data-reveal="up" className="mb-14 mt-6 max-w-3xl font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
            What changes when <span className="text-gradient">Apex dispatches</span>
          </h2>
          <ul data-stagger-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CARRIER_BENEFITS.map((b, i) => (
              <li key={b.title} data-stagger>
                <TiltCard className="h-full rounded-[2rem]">
                  <div className="bezel h-full">
                    <div className="bezel-core h-full p-8">
                      <span className="font-display text-5xl font-bold text-gradient">0{i + 1}</span>
                      <h3 className="mt-5 font-display text-3xl font-bold uppercase">{b.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
                    </div>
                  </div>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </RevealWrapper>

      <RevealWrapper as="section" className="relative overflow-hidden bg-[linear-gradient(180deg,#0a0a0f,#11131d,#0a0a0f)] py-24 md:py-36">
        <DepthLayers intensity={0.6} particles={false} />
        <div className="relative mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-8 lg:grid-cols-2">
          <div>
            <SectionLabel n="02" label="How dispatch works" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
              A week with <span className="text-gradient">Apex</span>
            </h2>
            <ol data-stagger-group className="mt-10 space-y-6">
              {STEPS.map((s) => (
                <li key={s.n} data-stagger className="flex gap-5">
                  <span className="font-display text-3xl font-bold text-amber">{s.n}</span>
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase">{s.title}</h3>
                    <p className="mt-1 text-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative hidden min-h-[420px] lg:block">
            <CssTruck className="absolute left-1/2 top-1/2 h-0 w-0 [--truck-scale:0.75]" />
          </div>
        </div>
      </RevealWrapper>

      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="03" label="Requirements" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
              What you&apos;ll need <span className="text-gradient">to start</span>
            </h2>
            <p data-reveal="up" className="mt-6 text-muted">
              Most carriers are onboarded in about 20 minutes. New authorities welcome — we&apos;ll help with broker setup.
            </p>
            <div data-reveal="up" className="mt-8">
              <Button href="/contact">Start Onboarding</Button>
            </div>
          </div>
          <ul data-stagger-group className="grid gap-3 lg:col-span-7">
            {CARRIER_REQUIREMENTS.map((r) => (
              <li key={r} data-stagger className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber" strokeWidth={1.5} />
                <span className="text-white/85">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </RevealWrapper>

      <TestimonialsSection />

      <RevealWrapper as="section" className="pb-24 md:pb-32">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel label="FAQ" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.92]">
              Carrier questions
            </h2>
          </div>
          <div data-reveal="up" className="lg:col-span-8">
            <FAQAccordion items={GENERAL_FAQS} />
          </div>
        </div>
      </RevealWrapper>

      <CTABannerSection title={<>Your truck. <span className="text-gradient">Our hustle.</span></>} truck={false} />
    </>
  );
}
