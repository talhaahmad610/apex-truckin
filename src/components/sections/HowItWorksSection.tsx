"use client";

import { useRef } from "react";
import { Handshake, PhoneCall, Search, Truck } from "lucide-react";
import { STEPS } from "@/lib/constants";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";

const icons = [PhoneCall, Search, Handshake, Truck];

/**
 * Pinned 3D process: the timeline sits on a plane tilted back in perspective; as you
 * scroll it rotates flat, the connector line draws, and steps light up in sequence.
 */
export function HowItWorksSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const plane = el.querySelector<HTMLElement>("[data-plane]");
      const line = el.querySelector<HTMLElement>("[data-line]");
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", el);
      if (prefersReducedMotion()) {
        gsap.set(line, { scaleX: 1, scaleY: 1 });
        steps.forEach((s) => s.setAttribute("data-on", "true"));
        return;
      }
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top top", end: "+=160%", scrub: 0.6, pin: true, anticipatePin: 1 },
        });
        tl.fromTo(plane, { rotateX: 38, z: -160, opacity: 0.4 }, { rotateX: 0, z: 0, opacity: 1, ease: "power2.out", duration: 1 })
          .fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 2 }, 0.4);
        steps.forEach((s, i) => {
          tl.fromTo(s, { y: 60, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.6, onStart: () => s.setAttribute("data-on", "true"), onReverseComplete: () => s.removeAttribute("data-on") }, 0.4 + i * 0.5);
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "bottom 70%", scrub: true } });
        steps.forEach((s) =>
          gsap.from(s, {
            x: -30,
            opacity: 0,
            duration: 0.9,
            scrollTrigger: { trigger: s, start: "top 80%", once: true, onEnter: () => s.setAttribute("data-on", "true") },
          }),
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="how-it-works" className="relative overflow-hidden bg-[linear-gradient(180deg,#0a0a0f_0%,#11131d_50%,#0a0a0f_100%)] lg:h-[100dvh]">
      <div className="mx-auto flex h-full max-w-[1320px] flex-col justify-center px-4 py-24 sm:px-8 lg:py-0">
        <div className="mb-14 flex flex-col gap-6 lg:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionLabel n="03" label="The process" />
            <h2 className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]">
              Less chasing. <span className="text-gradient">More moving.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">Four steps from first call to first load — most carriers are rolling within 24 hours.</p>
        </div>

        <div className="[perspective:1400px]">
          <div data-plane className="relative [transform-style:preserve-3d] lg:origin-bottom">
            {/* connector */}
            <div aria-hidden className="absolute left-[22px] top-0 h-full w-px bg-white/10 lg:left-0 lg:top-[27px] lg:h-px lg:w-full">
              <div data-line className="h-full w-full origin-top bg-grad shadow-[0_0_18px_2px_rgba(245,166,35,0.5)] lg:origin-left" />
            </div>
            <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((step, i) => {
                const Icon = icons[i]!;
                return (
                  <li key={step.n} data-step className="group relative pl-16 lg:pl-0">
                    <span className="absolute left-0 top-0 flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white/15 bg-[#0f1117] text-white/50 transition-all duration-700 group-data-[on=true]:border-amber group-data-[on=true]:text-amber group-data-[on=true]:shadow-[0_0_0_6px_rgba(245,166,35,0.08),0_0_30px_rgba(245,166,35,0.45)] lg:relative lg:h-[55px] lg:w-[55px]">
                      <Icon className="h-5 w-5" strokeWidth={1.25} />
                    </span>
                    <div className="lg:mt-8">
                      <p className="font-display text-sm font-semibold tracking-[0.3em] text-amber/80">STEP {step.n}</p>
                      <h3 className="mt-2 font-display text-4xl font-bold uppercase lg:text-5xl">{step.title}</h3>
                      <p className="mt-3 max-w-xs leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
