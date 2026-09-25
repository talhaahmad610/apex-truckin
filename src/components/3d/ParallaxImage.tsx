"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/** Full-bleed background that drifts + slowly zooms with scroll (depth cue). */
export function ParallaxImage({ children, className, amount = 14 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el.firstElementChild,
        { yPercent: -amount / 2, scale: 1.15 },
        {
          yPercent: amount / 2,
          scale: 1.02,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    },
    { scope: ref },
  );
  return (
    <div ref={ref} aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <div className="absolute inset-[-8%] will-change-transform">{children}</div>
    </div>
  );
}
