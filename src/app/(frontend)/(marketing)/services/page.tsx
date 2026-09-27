import Image from "next/image";
import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { getServices, getSiteSettings } from "@/lib/cms";
import { collectionLd, pageMetadata } from "@/lib/seo";
import type { Service } from "@/types";
import { PageHero } from "@/components/sections/PageHero";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { TiltCard } from "@/components/3d/TiltCard";

export const generateMetadata = () => pageMetadata({
  title: "Truck Dispatch Services — Dry Van, Flatbed, Reefer & More",
  description:
    "Comprehensive truck dispatch services for dry van, flatbed, reefer, hotshot, step deck, power only and box truck carriers. Load sourcing, negotiation, paperwork and 24/7 support.",
  path: "/services",
});

// Each service's column comes from its "Comparison table" tab in the CMS.
const CDL_LABEL = { yes: "Yes", no: "No", depends: "Depends" } as const;
const COMPARE = [
  { key: "Avg. rate", get: (s: Service) => s.avgRate.replace(" / mile", "") },
  { key: "CDL required", get: (s: Service) => CDL_LABEL[s.comparison.cdl] },
  { key: "Tarp / accessorial pay", get: (s: Service) => s.comparison.tarpPay },
  { key: "Permit coordination", get: (s: Service) => s.comparison.permits },
  { key: "Temperature monitoring", get: (s: Service) => s.comparison.tempMonitoring },
  { key: "Drop & hook focus", get: (s: Service) => s.comparison.dropHook },
];

export default async function ServicesPage() {
  const [SERVICES, site] = await Promise.all([getServices(), getSiteSettings()]);
  return (
    <>
      <JsonLd
        data={collectionLd({
          site,
          name: "Truck Dispatch Services",
          description: "Dispatch services by equipment type: dry van, flatbed, reefer, hotshot, step deck, power only and box truck.",
          path: "/services",
          items: SERVICES.map((s) => ({ name: `${s.name} Dispatch`, path: `/services/${s.slug}`, image: s.image })),
        })}
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            Comprehensive truck <span className="text-gradient">dispatch services</span>
          </>
        }
        subtitle="Seven equipment types. One dispatch desk that knows the lanes, the brokers and the rates for every one of them."
        image="/images/service-dry-van.webp"
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <Button href="/contact" size="lg">Get a Free Lane Review</Button>
      </PageHero>
      <MarqueeTicker />

      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <ul data-stagger-group className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
            {SERVICES.map((s, i) => (
              <li key={s.slug} data-stagger className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
                <TiltCard className="h-full rounded-[2rem]" max={6}>
                  <article className="bezel h-full">
                    <div className="bezel-core flex h-full flex-col overflow-hidden">
                      <div className={`relative overflow-hidden ${i < 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                        <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1117] to-transparent" />
                        <span className="absolute left-5 top-5 font-display text-sm font-semibold tracking-[0.3em] text-amber">0{i + 1}</span>
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <h2 className="font-display text-4xl font-bold uppercase">{s.name}</h2>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-amber">{s.tagline}</p>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{s.description}</p>
                        <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                          <div>
                            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">What&apos;s included</h3>
                            <ul className="space-y-2">
                              {s.included.slice(0, 3).map((x) => (
                                <li key={x} className="flex gap-2 text-sm text-white/80">
                                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={1.5} /> {x}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Equipment</h3>
                            <ul className="space-y-2">
                              {s.requirements.slice(0, 3).map((x) => (
                                <li key={x} className="flex gap-2 text-sm text-white/80">
                                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-amber" /> {x}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-auto pt-8">
                          <Button href={`/services/${s.slug}`} variant="ghost">{s.name} Dispatch</Button>
                        </div>
                      </div>
                    </div>
                  </article>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </RevealWrapper>

      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel label="Compare" />
          <h2 data-reveal="up" className="mb-10 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
            Side by side
          </h2>
          <div data-reveal="up" className="bezel">
            <div className="bezel-core relative overflow-x-auto">
              <table className="w-full min-w-[860px] text-left text-sm">
                <caption className="sr-only">Comparison of dispatch services by equipment type</caption>
                <thead>
                  <tr className="border-b border-white/10">
                    <th scope="col" className="sticky left-0 z-10 bg-card p-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Feature</th>
                    {SERVICES.map((s) => (
                      <th key={s.slug} scope="col" className="p-5 font-display text-lg font-bold uppercase text-white">
                        <Link href={`/services/${s.slug}`} className="hover:text-amber">{s.name}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row) => (
                    <tr key={row.key} className="border-b border-white/5 last:border-0">
                      <th scope="row" className="sticky left-0 z-10 bg-card p-5 font-medium text-white/80">{row.key}</th>
                      {SERVICES.map((s) => {
                        const v = row.get(s);
                        return (
                          <td key={s.slug} className="p-5 text-white/75">
                            {typeof v === "boolean" ? (
                              v ? (
                                <Check className="h-4 w-4 text-amber" strokeWidth={2} aria-label="Yes" />
                              ) : (
                                <Minus className="h-4 w-4 text-white/25" aria-label="No" />
                              )
                            ) : (
                              v
                            )}
                          </td>
                        );
                      })}
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

      <CTABannerSection />
    </>
  );
}
