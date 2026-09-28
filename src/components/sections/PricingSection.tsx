import { getPricingTiers } from "@/lib/cms";
import type { SiteInfo } from "@/types";
import { PricingCard } from "@/components/ui/PricingCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/blocks/GradientHeading";
import { fillTokens } from "@/lib/tokens";

export async function PricingSection({
  n,
  label = "Pricing",
  heading,
  highlight,
  intro,
  site,
}: {
  n?: string;
  label?: string;
  /** Leave empty to show just the plan cards with no heading (used on /pricing, which has its own hero). */
  heading?: string | null;
  highlight?: string | null;
  intro?: string | null;
  site?: SiteInfo;
}) {
  const PRICING = await getPricingTiers();
  // overflow-x-clip: the 60rem glow would widen the page on phones and break the hero's sticky stage on touch scroll
  return (
    <RevealWrapper as="section" id="pricing" className="relative overflow-x-clip py-24 md:py-40">
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,166,35,0.08),transparent_65%)]" />
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        {heading && site && (
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
            <SectionLabel n={n} label={label} />
            <GradientHeading
              as="h2"
              data-reveal="up"
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]"
              heading={heading}
              highlight={highlight}
              site={site}
            />
            {intro && (
              <p data-reveal="up" className="mx-auto mt-5 max-w-lg text-muted">
                {fillTokens(intro, site)}
              </p>
            )}
          </div>
        )}
        <ul data-stagger-group className="grid items-stretch gap-6 lg:grid-cols-3">
          {PRICING.map((t) => (
            <li key={t.name} data-stagger>
              <PricingCard tier={t} />
            </li>
          ))}
        </ul>
      </div>
    </RevealWrapper>
  );
}
