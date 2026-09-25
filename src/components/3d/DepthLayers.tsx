"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { Particles } from "./Particles";

/**
 * Multi-plane parallax background: glow orbs, perspective highway grid,
 * horizon glow and particles — each plane moves at a different scroll speed
 * to create depth without WebGL.
 */
export function DepthLayers({
  className,
  grid = true,
  particles = true,
  intensity = 1,
}: {
  className?: string;
  grid?: boolean;
  particles?: boolean;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || prefersReducedMotion()) return;
      ref.current.querySelectorAll<HTMLElement>("[data-depth]").forEach((el) => {
        const depth = Number(el.dataset.depth);
        gsap.to(el, {
          yPercent: -18 * depth * intensity,
          ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div data-depth="0.3" className="absolute -left-[10%] top-[5%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(245,166,35,0.16),transparent_62%)]" />
      <div data-depth="0.6" className="absolute -right-[15%] top-[30%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(232,93,4,0.14),transparent_60%)]" />
      {grid && (
        <div className="absolute inset-x-0 bottom-0 h-[55%] [perspective:600px]">
          <div
            className="absolute inset-x-[-50%] bottom-[-10%] h-[160%] origin-bottom [transform:rotateX(72deg)] [mask-image:linear-gradient(to_top,#000_10%,transparent_75%)]"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(245,166,35,0.22) 0 1px, transparent 1px 80px), repeating-linear-gradient(0deg, rgba(245,166,35,0.16) 0 1px, transparent 1px 80px)",
              animation: "grid-flow 2.4s linear infinite",
            }}
          />
          <div className="absolute inset-x-0 bottom-[42%] h-px bg-gradient-to-r from-transparent via-amber/60 to-transparent shadow-[0_0_40px_6px_rgba(245,166,35,0.35)]" />
        </div>
      )}
      {particles && <div data-depth="1"><Particles /></div>}
      <style>{`@keyframes grid-flow { from { background-position: 0 0, 0 0; } to { background-position: 0 0, 0 80px; } }`}</style>
    </div>
  );
}
