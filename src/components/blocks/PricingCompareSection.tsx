import { Check, Minus } from "lucide-react";
import { getPricingTiers } from "@/lib/cms";
import type { SiteContentData, SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "./GradientHeading";
import { cn, joinAnd } from "@/lib/utils";

export async function PricingCompareSection({
  n,
  label = "Compare plans",
  heading = "Every feature,",
  highlight = "side by side",
  rows,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  rows: SiteContentData["pricingComparison"];
  site: SiteInfo;
}) {
  const tiers = await getPricingTiers();
  return (
    <RevealWrapper as="section" className="pb-24 md:pb-36">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-8">
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
            <table className="w-full min-w-[640px] text-sm">
              <caption className="sr-only">Feature comparison of {joinAnd(tiers.map((t) => t.name))} plans</caption>
              <thead>
                <tr className="border-b border-white/10">
                  <th scope="col" className="sticky left-0 z-10 bg-card p-5 text-left text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Feature</th>
                  {tiers.map((t) => (
                    <th
                      key={t.id}
                      scope="col"
                      className={cn("p-5 text-center font-display text-xl font-bold uppercase", t.featured ? "bg-amber/[0.06] text-amber" : undefined)}
                    >
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.feature} className="border-b border-white/5 last:border-0">
                    <th scope="row" className="sticky left-0 z-10 bg-card p-5 text-left font-normal text-white/80">{r.feature}</th>
                    {tiers.map((t) => {
                      const cell = r.cells.find((c) => c.tierId === t.id);
                      return (
                        <td key={t.id} className={cn("p-5 text-center", t.featured ? "bg-amber/[0.04]" : undefined)}>
                          {cell?.text ? (
                            <span className="font-medium text-white">{cell.text}</span>
                          ) : cell?.included ? (
                            <Check className="mx-auto h-5 w-5 text-amber" strokeWidth={2} aria-label="Included" />
                          ) : (
                            <Minus className="mx-auto h-5 w-5 text-white/25" aria-label="Not included" />
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
  );
}
