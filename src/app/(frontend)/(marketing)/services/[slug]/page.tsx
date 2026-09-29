import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { getFaqs, getPricingTiers, getServiceBySlug, getServices, getSiteContent, getSiteSettings } from "@/lib/cms";
import { faqLd, pageMetadata, serviceLd } from "@/lib/seo";
import { fillTokens } from "@/lib/tokens";
import { PageHero } from "@/components/sections/PageHero";
import { PricingSection } from "@/components/sections/PricingSection";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { TiltCard } from "@/components/3d/TiltCard";
import { StepsSection } from "@/components/blocks/StepsSection";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

// Pre-render every service that exists at build time; services added later in the CMS render on
// first request (and are cached) instead of 404ing.
export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getServiceBySlug(slug);
  if (!s) return { title: "Service not found", robots: { index: false } };
  return pageMetadata({
    title: s.metaTitle || `${s.name} Dispatch Services — ${s.tagline}`,
    description:
      s.metaDescription || `${s.name} truck dispatch for owner-operators and fleets: ${s.short} Average rates ${s.avgRate}. 24/7 dispatch, no forced loads.`,
    path: `/services/${s.slug}`,
    image: s.image,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const [SERVICES, sharedFaqs, site, tiers, content] = await Promise.all([getServices(), getFaqs("service"), getSiteSettings(), getPricingTiers(), getSiteContent()]);
  const idx = SERVICES.findIndex((x) => x.slug === slug);
  const s = SERVICES[idx];
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);
  // Service-specific FAQs, then the shared "every service page" FAQs ({service}/{avgRate}/{weeklyGross} → this service's values).
  const name = s.name.toLowerCase();
  const fill = (t: string) => t.replaceAll("{service}", name).replaceAll("{avgRate}", s.avgRate).replaceAll("{weeklyGross}", s.weeklyGross);
  const faqs = [...s.faqs, ...sharedFaqs.map((f) => ({ q: fill(f.q), a: fill(f.a) }))];
  const svc = content.servicePage;
  const tokens = { service: name, Service: s.name };
  const fillSvc = (t: string) => fillTokens(t, site, tokens);

  return (
    <>
      <JsonLd data={[serviceLd(s, site, tiers), faqLd(faqs)]} />
      <PageHero
        eyebrow={`Service 0${idx + 1} / ${s.name}`}
        title={
          <>
            {s.name} <span className="text-gradient">dispatch</span>
          </>
        }
        subtitle={s.short + " " + s.tagline}
        image={s.image}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: s.name, path: `/services/${s.slug}` },
        ]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Button href={svc.heroCta.href || "/contact"} size="lg">{fillSvc(svc.heroCta.label || "Dispatch My {{Service}}")}</Button>
          <span className="rounded-full border border-line bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-amber">Avg. {s.avgRate}</span>
          <span className="rounded-full border border-line bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-amber">Est. {s.weeklyGross} / week</span>
        </div>
        <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/40">
          {site.rateDisclaimer} {site.grossDisclaimer}
        </p>
      </PageHero>

      {/* What we do */}
      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel n="01" label="What we do" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
              {s.tagline}
            </h2>
            <p data-reveal="up" className="mt-6 text-lg leading-relaxed text-white/75">{s.description}</p>
            <div data-reveal="up" className="mt-8">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Typical loads</h3>
              <ul className="flex flex-wrap gap-2">
                {s.typicalLoads.map((l) => (
                  <li key={l} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80">{l}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid gap-4 lg:col-span-6">
            <div data-reveal="up" className="bezel">
              <div className="bezel-core p-7 md:p-9">
                <h3 className="font-display text-2xl font-bold uppercase">What&apos;s included</h3>
                <ul className="mt-5 space-y-3">
                  {s.included.map((x) => (
                    <li key={x} className="flex gap-3 text-white/85">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-amber" strokeWidth={1.75} /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div data-reveal="up" className="bezel">
              <div className="bezel-core p-7 md:p-9">
                <h3 className="font-display text-2xl font-bold uppercase">Equipment requirements</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {s.requirements.map((x) => (
                    <li key={x} className="flex gap-3 text-sm text-white/80">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-amber" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RevealWrapper>

      {/* Benefits */}
      <RevealWrapper as="section" className="relative isolate overflow-hidden py-24 md:py-36">
        <Image src={s.image} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-20" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/80 to-bg" />
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel n="02" label={svc.benefitsLabel} />
          <h2 data-reveal="up" className="mb-12 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
            {fillSvc(svc.benefitsHeading)} <span className="text-gradient">{fillSvc(svc.benefitsHighlight)}</span>
          </h2>
          <ul data-stagger-group className="grid gap-5 md:grid-cols-3">
            {s.benefits.map((b, i) => (
              <li key={b.title} data-stagger>
                <TiltCard className="h-full rounded-[2rem]">
                  <div className="bezel h-full">
                    <div className="bezel-core h-full p-8">
                      <span className="font-display text-5xl font-bold text-gradient">0{i + 1}</span>
                      <h3 className="mt-6 font-display text-3xl font-bold uppercase">{b.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
                    </div>
                  </div>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </RevealWrapper>

      {/* Process */}
      <StepsSection
        n="03"
        label="Process"
        heading="From call to"
        highlight="first load"
        style="grid"
        steps={content.steps}
        site={site}
      />

      <PricingSection
        n="04"
        label="Pricing"
        heading={svc.pricingHeading}
        highlight={svc.pricingHighlight}
        intro={svc.pricingIntro}
        site={site}
      />

      {/* FAQ */}
      <RevealWrapper as="section" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel n="05" label="FAQ" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.92]">
              {s.name} questions
            </h2>
            <div data-reveal="up" className="mt-10">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Other services</p>
              <ul className="space-y-2">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/services/${o.slug}`} className="font-display text-2xl font-bold uppercase text-white/70 hover:text-amber">
                      {o.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div data-reveal="up" className="lg:col-span-8">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </RevealWrapper>

      <CTABannerSection
        title={
          <>
            {fillSvc(svc.ctaHeading)} <span className="text-gradient">{fillSvc(svc.ctaHighlight)}</span>
          </>
        }
      />
    </>
  );
}
