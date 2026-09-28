import Link from "next/link";
import { Check, Minus } from "lucide-react";
import type { Service, SiteInfo } from "@/types";
import { collectionLd } from "@/lib/seo";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "./GradientHeading";
import { JsonLd } from "@/components/ui/JsonLd";

const CDL_LABEL = { yes: "Yes", no: "No", depends: "Depends" } as const;
const COMPARE = [
  { key: "Avg. rate", get: (s: Service) => s.avgRate.replace(" / mile", "") },
  { key: "Potential weekly gross", get: (s: Service) => s.weeklyGross },
  { key: "CDL required", get: (s: Service) => CDL_LABEL[s.comparison.cdl] },
  { key: "Tarp / accessorial pay", get: (s: Service) => s.comparison.tarpPay },
  { key: "Permit coordination", get: (s: Service) => s.comparison.permits },
  { key: "Temperature monitoring", get: (s: Service) => s.comparison.tempMonitoring },
  { key: "Drop & hook focus", get: (s: Service) => s.comparison.dropHook },
];

export function ServicesCompareSection({
  n,
  label = "Compare",
  heading = "Side by",
  highlight = "side",
  services,
  site,
  emitCollectionLd,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  services: Service[];
  site: SiteInfo;
  emitCollectionLd?: boolean | null;
}) {
  return (
    <RevealWrapper as="section" className="pb-24 md:pb-36">
      {emitCollectionLd && (
        <JsonLd
          data={collectionLd({
            site,
            name: "Truck Dispatch Services",
            description: "Dispatch services by equipment type: " + services.map((s) => s.name.toLowerCase()).join(", ") + ".",
            path: "/services",
            items: services.map((s) => ({ name: `${s.name} Dispatch`, path: `/services/${s.slug}`, image: s.image })),
          })}
        />
      )}
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionLabel n={n} label={label} />
        <GradientHeading
          as="h2"
          data-reveal="up"
          className="mb-10 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]"
          heading={heading}
          highlight={highlight}
          site={site}
        />
        <div data-reveal="up" className="bezel">
          <div className="bezel-core relative overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <caption className="sr-only">Comparison of dispatch services by equipment type</caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="sticky left-0 z-10 bg-card p-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Feature</th>
                  {services.map((s) => (
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
                    {services.map((s) => {
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
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-white/35">
          {site.rateDisclaimer} {site.grossDisclaimer}
        </p>
      </div>
    </RevealWrapper>
  );
}
