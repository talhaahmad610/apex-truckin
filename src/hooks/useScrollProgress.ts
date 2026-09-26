"use client";

import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Whether the page has scrolled past `threshold` px (reactive — changes rarely, fine as state),
 * plus a ref to attach to the element whose `transform: scaleX()` should track scroll progress.
 * Progress is written straight to that DOM node on every ScrollTrigger tick instead of through
 * React state, so scrolling doesn't re-render the consumer (previously ~200 setState calls per
 * full page scroll).
 */
export function useScrollProgress(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const next = self.scroll() > threshold;
        setScrolled((prev) => (prev === next ? prev : next));
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
      },
    });
    return () => st.kill();
  }, [threshold]);

  return { scrolled, progressRef };
}
