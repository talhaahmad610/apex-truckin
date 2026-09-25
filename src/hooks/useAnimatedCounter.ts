"use client";

import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(target: number, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Start at the real target, not 0: this is what search/AI crawlers and no-JS clients see
  // in the server-rendered HTML. The element is off-screen at mount (that's the whole point
  // of the scroll-triggered reveal below), so nobody ever sees this value on screen — it only
  // resets to 0 once the element is about to scroll into view, right before the count-up runs.
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setValue(target * eased);
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
  }, [target, duration]);

  return { ref, display: value.toFixed(decimals) };
}
