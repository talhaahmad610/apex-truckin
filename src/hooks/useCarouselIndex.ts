"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Tracks which direct child of a horizontally-scrolling container is currently most
 * centered in view — for a swipeable slider's pagination dots. Scroll-listener based
 * (passive, rAF-throttled), since no snap/carousel library is used in this project.
 */
export function useCarouselIndex<T extends HTMLElement>(count: number): { ref: RefObject<T | null>; index: number } {
  const ref = useRef<T | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || count < 2) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const children = Array.from(el.children) as HTMLElement[];
      if (!children.length) return;
      const center = el.scrollLeft + el.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      children.forEach((child, i) => {
        const dist = Math.abs(child.offsetLeft + child.offsetWidth / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setIndex(closest);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [count]);

  return { ref, index };
}
