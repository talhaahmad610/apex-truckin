"use client";

import type { ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useCarouselIndex } from "@/hooks/useCarouselIndex";
import { cn } from "@/lib/utils";

/**
 * Testimonial list: a swipeable, scroll-snapped horizontal slider with pagination dots on
 * mobile; the existing CSS-columns masonry, unchanged, from `md:` up. One component so the
 * scroll-container ref can serve both the scroll-into-view reveal animation (same visual as
 * StaggerReveal) and the active-slide tracking for the dots.
 */
export function TestimonialsCarousel({ children, count }: { children: ReactNode; count: number }) {
  const { ref, index } = useCarouselIndex<HTMLDivElement>(count);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const items = gsap.utils.toArray<HTMLElement>(root.children);
      if (!items.length) return;

      gsap.set(items, { y: 60, opacity: 0 });
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          gsap.to(items, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1, clearProps: "transform" });
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(root);
      return () => io.disconnect();
    },
    { scope: ref },
  );

  return (
    <div>
      <div
        ref={ref}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-2 md:mx-0 md:block md:columns-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:columns-3 [&>*]:md:mb-5"
      >
        {children}
      </div>
      {count > 1 && (
        <div className="mt-6 flex justify-center gap-2 md:hidden" role="tablist" aria-label="Testimonial slides">
          {Array.from({ length: count }).map((_, i) => (
            <span
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${count}`}
              className={cn(
                "h-2 w-2 rounded-full ring-1 transition-all duration-300",
                i === index ? "w-5 bg-grad ring-transparent" : "ring-white/20",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
