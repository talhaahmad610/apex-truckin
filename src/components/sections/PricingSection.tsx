import { PRICING } from "@/lib/constants";
import { PricingCard } from "@/components/ui/PricingCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function PricingSection({ withHeading = true }: { withHeading?: boolean }) {
  // overflow-x-clip: the 60rem glow would widen the page on phones and break the hero's sticky stage on touch scroll
  return (
    <RevealWrapper as="section" id="pricing" className="relative overflow-x-clip py-24 md:py-40">
      <div aria-hidden className="absolute left-1/2 top-1/3 -z-10 h-[40rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,166,35,0.08),transparent_65%)]" />
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        {withHeading && (
          <div className="mx-auto mb-16 max-w-3xl text-center md:mb-24">
            <SectionLabel n="04" label="Pricing" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]">
              Straight rates. <span className="text-gradient">No surprises.</span>
            </h2>
            <p data-reveal="up" className="mx-auto mt-5 max-w-lg text-muted">
              No contracts, no setup fees, no forced dispatch. Pick the plan that fits your fleet today — switch anytime.
            </p>
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
