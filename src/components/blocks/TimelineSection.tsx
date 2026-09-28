import type { SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "./GradientHeading";
import { fillTokens } from "@/lib/tokens";

export function TimelineSection({
  n,
  label = "Our story",
  heading = "Started in the cab.",
  highlight = "Built for carriers.",
  paragraphs,
  milestones,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  paragraphs: { text: string }[];
  milestones: { year: string; title: string; body: string }[];
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
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
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-white/75 lg:col-span-7">
          {paragraphs.map((p, i) => (
            <p key={i} data-reveal="up">
              {fillTokens(p.text, site)}
            </p>
          ))}
        </div>
      </div>

      <ol data-stagger-group className="mx-auto mt-20 grid max-w-[1320px] gap-px px-4 sm:px-8 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]" style={{ "--n": milestones.length } as React.CSSProperties}>
        {milestones.map((t) => (
          <li key={t.year} data-stagger className="relative border-t border-white/10 pt-8 md:pr-8">
            <span aria-hidden className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_14px_3px_rgba(245,166,35,0.6)]" />
            <p className="font-display text-5xl font-bold text-gradient">{t.year}</p>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase">{t.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
          </li>
        ))}
      </ol>
    </RevealWrapper>
  );
}
