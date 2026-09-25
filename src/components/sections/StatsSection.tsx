import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/3d/TiltCard";

export function StatsSection() {
  return (
    <RevealWrapper as="section" className="relative overflow-hidden py-24 md:py-36" id="stats">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel n="01" label="By the numbers" />
            <h2 data-reveal="up" className="mt-6 max-w-2xl font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]">
              Proof on the <span className="text-gradient">odometer.</span>
            </h2>
          </div>
          <p data-reveal="up" className="max-w-sm text-muted">
            Real numbers from real carriers — loads booked, states covered and drivers who stay with us.
          </p>
        </div>

        <ul data-stagger-group className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <li key={s.label} data-stagger className="h-full">
              <TiltCard className="h-full rounded-[2rem]">
                <div className="bezel h-full animate-float" style={{ animationDelay: `${i * 0.6}s` }}>
                  <div className="bezel-core relative flex h-full flex-col justify-between overflow-hidden p-7 md:p-8">
                    <span aria-hidden className="absolute -right-6 -top-10 font-display text-[9rem] font-bold leading-none text-white/[0.03]">
                      0{i + 1}
                    </span>
                    <AnimatedCounter
                      value={s.value}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      className="font-display text-[clamp(3.5rem,6vw,5rem)] font-bold leading-none text-gradient"
                    />
                    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                      <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/80">{s.label}</p>
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_12px_2px_rgba(245,166,35,0.7)]" />
                    </div>
                  </div>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </RevealWrapper>
  );
}
