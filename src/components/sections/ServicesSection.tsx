"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import type { Service } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const ease = [0.32, 0.72, 0, 1] as const;

export function ServicesSection({ services: SERVICES, disclaimer }: { services: Service[]; disclaimer?: string }) {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();
  const s = SERVICES[active]!;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = SERVICES.length;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n
      : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <RevealWrapper as="section" id="services" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mb-14 max-w-3xl md:mb-20">
          <SectionLabel n="02" label="What we do" />
          <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]">
            The right dispatch for <span className="text-gradient">the right haul.</span>
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Dispatch services"
            data-reveal="left"
            className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {SERVICES.map((svc, i) => {
              const selected = i === active;
              return (
                <button
                  key={svc.slug}
                  ref={(el) => {
                    tabsRef.current[i] = el;
                  }}
                  role="tab"
                  id={`${base}-tab-${i}`}
                  aria-selected={selected}
                  aria-controls={`${base}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={cn(
                    "group relative flex shrink-0 items-center justify-between gap-6 rounded-2xl px-5 py-4 text-left transition-colors duration-500 lg:py-5",
                    selected ? "bg-amber/[0.08] text-white" : "text-white/55 hover:bg-white/[0.03] hover:text-white",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="svc-indicator"
                      className="absolute inset-0 rounded-2xl ring-1 ring-amber/35"
                      transition={{ duration: 0.6, ease }}
                    />
                  )}
                  <span className="flex items-baseline gap-4">
                    <span className={cn("text-[11px] tabular-nums tracking-[0.2em]", selected ? "text-amber" : "text-white/30")}>
                      0{i + 1}
                    </span>
                    <span className="whitespace-nowrap font-display text-2xl font-bold uppercase tracking-wide lg:text-[28px]">
                      {svc.name}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "hidden h-px bg-amber transition-all duration-500 lg:block",
                      selected ? "w-10 opacity-100" : "w-0 opacity-0",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`${base}-panel`}
            aria-labelledby={`${base}-tab-${active}`}
            className="lg:col-span-8"
            data-reveal="up"
          >
            <div className="bezel">
              <div className="bezel-core overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-[calc(2rem-0.375rem)]">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={s.slug}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease }}
                      className="absolute inset-0"
                    >
                      <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1117] via-[#0f1117]/20 to-transparent" />
                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className="rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber ring-1 ring-white/10">
                      Avg. {s.avgRate}
                    </span>
                    <span className="rounded-full bg-black/55 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-amber ring-1 ring-white/10">
                      Est. {s.weeklyGross} / week
                    </span>
                  </div>
                </div>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={s.slug}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.45, ease }}
                    className="grid gap-8 p-7 md:grid-cols-5 md:p-10"
                  >
                    <div className="md:col-span-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-amber">{s.tagline}</p>
                      <h3 className="mt-3 font-display text-4xl font-bold uppercase">{s.name} Dispatch</h3>
                      <p className="mt-4 leading-relaxed text-muted">{s.description}</p>
                      <div className="mt-8">
                        <Button href={`/services/${s.slug}`}>Explore {s.name}</Button>
                      </div>
                    </div>
                    <ul className="space-y-3 md:col-span-2">
                      {s.included.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-white/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={1.5} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
                {disclaimer && (
                  <p className="border-t border-white/5 px-7 pb-6 pt-4 text-xs leading-relaxed text-white/35 md:px-10 md:pb-8">
                    {disclaimer}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}
