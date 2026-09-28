import { CheckCircle2 } from "lucide-react";
import type { SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { GradientHeading } from "./GradientHeading";
import { fillTokens } from "@/lib/tokens";

export function RequirementsSection({
  n,
  label = "Requirements",
  heading = "What you'll need",
  highlight = "to start",
  intro,
  cta,
  items,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  intro?: string | null;
  cta?: { label?: string | null; href?: string | null } | null;
  items: string[];
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]"
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {intro && (
            <p data-reveal="up" className="mt-6 text-muted">
              {fillTokens(intro, site)}
            </p>
          )}
          {cta?.label && cta.href && (
            <div data-reveal="up" className="mt-8">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          )}
        </div>
        <ul data-stagger-group className="grid gap-3 lg:col-span-7">
          {items.map((r) => (
            <li key={r} data-stagger className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber" strokeWidth={1.5} />
              <span className="text-white/85">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </RevealWrapper>
  );
}
