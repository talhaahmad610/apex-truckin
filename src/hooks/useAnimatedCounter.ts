"use client";

import { useEffect, useRef } from "react";

/**
 * Drives the count-up by writing `textContent` straight to `valueRef`'s node inside the rAF
 * loop instead of `setState` (previously a React re-render on every one of ~110 frames per
 * counter). `containerRef` is the IntersectionObserver target that triggers the run.
 */
export function useAnimatedCounter(target: number, { duration = 1800, decimals = 0 } = {}) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const valueRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    // Reduced motion: leave the server-rendered final value in place (see AnimatedCounter.tsx).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          if (valueRef.current) valueRef.current.textContent = (target * eased).toFixed(decimals);
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration, decimals]);

  return { containerRef, valueRef };
}
