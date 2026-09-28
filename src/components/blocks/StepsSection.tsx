import type { SiteContentData, SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CssTruck } from "@/components/3d/CssTruck";
import { DepthLayers } from "@/components/3d/DepthLayers";
import { GradientHeading } from "./GradientHeading";
import { fillTokens } from "@/lib/tokens";

export function StepsSection({
  n,
  label = "How dispatch works",
  heading,
  highlight,
  intro,
  style,
  steps,
  site,
}: {
  n?: string;
  label?: string;
  heading: string;
  highlight?: string | null;
  intro?: string | null;
  style: "list" | "grid";
  steps: SiteContentData["steps"];
  site: SiteInfo;
}) {
  if (style === "grid") {
    return (
      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className="mb-12 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]"
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {intro && <p className="-mt-8 mb-12 max-w-lg text-muted">{fillTokens(intro, site)}</p>}
          <ol
            data-stagger-group
            className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
            style={{ "--n": steps.length } as React.CSSProperties}
          >
            {steps.map((st, i) => (
              <li key={`${st.title}-${i}`} data-stagger className="bg-[#0d0e14] p-8">
                <span className="font-display text-sm font-semibold tracking-[0.3em] text-amber">STEP {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-3xl font-bold uppercase">{st.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </RevealWrapper>
    );
  }

  return (
    <RevealWrapper as="section" className="relative overflow-hidden bg-[linear-gradient(180deg,#0a0a0f,#11131d,#0a0a0f)] py-24 md:py-36">
      <DepthLayers intensity={0.6} particles={false} />
      <div className="relative mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-8 lg:grid-cols-2">
        <div>
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]"
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {intro && <p className="mt-4 max-w-lg text-muted">{fillTokens(intro, site)}</p>}
          <ol data-stagger-group className="mt-10 space-y-6">
            {steps.map((s, i) => (
              <li key={`${s.title}-${i}`} data-stagger className="flex gap-5">
                <span className="font-display text-3xl font-bold text-amber">{String(i + 1).padStart(2, "0")}</span>
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
  );
}
