"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Writes normalized pointer position (-1..1) into CSS vars --mx / --my on the target
 * element, smoothed with rAF. Pure transform-driven — no React re-renders.
 */
export function useMouseParallax<T extends HTMLElement>(strength = 1): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = ((e.clientX / window.innerWidth) * 2 - 1) * strength;
      ty = ((e.clientY / window.innerHeight) * 2 - 1) * strength;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const loop = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty("--mx", cx.toFixed(4));
      el.style.setProperty("--my", cy.toFixed(4));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
