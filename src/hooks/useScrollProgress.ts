"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Page scroll progress 0..1 and whether the page has scrolled past `threshold` px. */
export function useScrollProgress(threshold = 24) {
  const [state, setState] = useState({ progress: 0, scrolled: false });

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const scrolled = self.scroll() > threshold;
        setState((prev) =>
          prev.scrolled === scrolled && Math.abs(prev.progress - self.progress) < 0.005
            ? prev
            : { progress: self.progress, scrolled },
        );
      },
    });
    return () => st.kill();
  }, [threshold]);

  return state;
}
