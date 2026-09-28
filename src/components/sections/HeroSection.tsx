import { ChevronDown } from "lucide-react";
import { FlightScrub, type FlightLeg } from "@/components/3d/FlightScrub";
import { CssTruck } from "@/components/3d/CssTruck";
import { DepthLayers } from "@/components/3d/DepthLayers";
import { Button } from "@/components/ui/Button";
import { LiveDot } from "@/components/ui/Card";
import { ICONS } from "@/components/blocks/icons";
import { fillTokens } from "@/lib/tokens";
import type { SiteInfo } from "@/types";
import type { FlightHeroBlock } from "@/payload-types";
import type { IconKey } from "@/payload/blocks/iconOptions";
import manifest from "@/lib/flight-manifest.json";

const legs = manifest.legs as FlightLeg[];

const rise = (i: number) => ({ animationDelay: `${0.15 + i * 0.1}s` });
const riseCls = "animate-[page-in_1s_cubic-bezier(0.32,0.72,0,1)_both]";

function BeatShell({ children, align = "left" }: { children: React.ReactNode; align?: "left" | "center" }) {
  return (
    <div
      className={`mx-auto flex h-full w-full max-w-[1320px] flex-col justify-end px-4 pb-24 pt-32 sm:px-8 md:justify-center md:pb-0 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      {children}
    </div>
  );
}

function Chip({ icon, children }: { icon?: string | null; children: React.ReactNode }) {
  const Icon = ICONS[(icon as IconKey) ?? "clock-3"] ?? ICONS["clock-3"];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] text-white/85">
      <span className="text-amber">
        <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>
      {children}
    </span>
  );
}

/** Builds the FlightScrub beat ReactNodes from the flightHero block's editable beats. The first
 *  beat gets the special intro treatment (live-dot pill, 2-line h1, 2 buttons, scroll hint); the
 *  rest are supporting screens (kicker, h2, body, chips or buttons). */
function buildBeats(beats: FlightHeroBlock["beats"], site: SiteInfo) {
  return (beats ?? []).map((beat, i) => {
    const fill = (t?: string | null) => fillTokens(t, site);
    const heading = fill(beat.heading);
    const highlight = beat.highlight ? fill(beat.highlight) : null;
    const isFirst = i === 0;
    return {
      id: beat.id ?? `beat-${i}`,
      label: beat.railLabel,
      content: isFirst ? (
        <BeatShell>
          {beat.eyebrow && (
            <p className={`${riseCls} mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-black/40 px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.24em] text-white/85`} style={rise(0)}>
              <LiveDot /> {fill(beat.eyebrow)}
            </p>
          )}
          <h1 className="font-display font-bold uppercase leading-[0.84] tracking-[-0.01em]">
            <span className={`${riseCls} block text-[clamp(4.25rem,15vw,13rem)]`} style={rise(1)}>
              {heading} {highlight && <span className="text-gradient">{highlight}</span>}
            </span>
            {beat.subheading && (
              <span className={`${riseCls} mt-3 block text-[clamp(1.6rem,4.2vw,3.5rem)] font-semibold tracking-[0.02em] text-white/90`} style={rise(2)}>
                {fill(beat.subheading)}
              </span>
            )}
          </h1>
          {beat.body && (
            <p className={`${riseCls} mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg`} style={rise(3)}>
              {fill(beat.body)}
            </p>
          )}
          {beat.ctas && beat.ctas.length > 0 && (
            <div className={`${riseCls} mt-9 flex flex-wrap gap-3`} style={rise(4)}>
              {beat.ctas.map((cta) =>
                cta.variant === "ghost" ? (
                  <Button key={cta.id ?? cta.label} href={cta.href} size="lg" variant="ghost" icon={false}>
                    {cta.label}
                  </Button>
                ) : (
                  <Button key={cta.id ?? cta.label} href={cta.href} size="lg">
                    {cta.label}
                  </Button>
                ),
              )}
            </div>
          )}
          <div className={`${riseCls} mt-14 hidden items-center gap-3 text-[11px] uppercase tracking-[0.26em] text-white/50 md:flex`} style={rise(6)}>
            <span className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
              <span className="h-2 w-px animate-bounce bg-amber" />
            </span>
            Scroll to ride along <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.25} />
          </div>
        </BeatShell>
      ) : (
        <BeatShell>
          {beat.eyebrow && <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.26em] text-amber">{fill(beat.eyebrow)}</p>}
          <h2 className="max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.88]">
            {heading} {highlight && <span className="text-gradient">{highlight}</span>}
          </h2>
          {beat.body && <p className="mt-6 max-w-lg text-white/75 md:text-lg">{fill(beat.body)}</p>}
          {beat.chips && beat.chips.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {beat.chips.map((chip) => (
                <Chip key={chip.id ?? chip.text} icon={chip.icon}>
                  {chip.text}
                </Chip>
              ))}
            </div>
          )}
          {beat.ctas && beat.ctas.length > 0 && (
            <div className="mt-9 flex flex-wrap gap-3">
              {beat.ctas.map((cta) => (
                <Button key={cta.id ?? cta.label} href={cta.href} size="lg" variant={cta.variant === "ghost" ? "ghost" : "primary"} icon={cta.variant === "ghost" ? false : undefined}>
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </BeatShell>
      ),
    };
  });
}

/** Stylized CSS 3D scene used when no pre-rendered footage is installed. */
function FallbackStage() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#1a1f35_0%,#0a0a0f_65%)]">
      <DepthLayers />
      <div
        className="absolute inset-0"
        style={
          {
            "--ry": "calc(var(--flight-p, 0) * 70deg)",
            "--tx": "calc(var(--flight-p, 0) * -18vw)",
          } as React.CSSProperties
        }
      >
        <CssTruck
          className="absolute left-[58%] top-[56%] h-0 w-0 [--truck-scale:0.62] sm:[--truck-scale:0.8] lg:[--truck-scale:1.05] max-md:left-1/2 max-md:top-[34%]"
        />
      </div>
    </div>
  );
}

export function HeroSection({ beats, site }: { beats: FlightHeroBlock["beats"]; site: SiteInfo }) {
  return <FlightScrub legs={legs} beats={buildBeats(beats, site)} fallback={legs.length ? undefined : <FallbackStage />} />;
}
