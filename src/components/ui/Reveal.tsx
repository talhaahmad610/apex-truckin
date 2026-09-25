"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { REVEAL_FROM, REVEAL_TO, type RevealKind } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Self-contained single-element scroll reveal, scoped to its own mount/hydration
 * lifecycle. Use this instead of RevealWrapper's `data-reveal` attribute when the element
 * is rendered inside a `<Suspense>` boundary around an async Server Component (see
 * StaggerReveal for the full rationale). Uses IntersectionObserver rather than a GSAP
 * ScrollTrigger — see the comment in RevealWrapper.tsx for why.
 */
export function Reveal({
  children,
  className,
  as: Tag = "div",
  kind = "up",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  kind?: RevealKind;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;

      gsap.set(el, REVEAL_FROM[kind] ?? REVEAL_FROM.up);
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          io.disconnect();
          gsap.to(el, { ...(REVEAL_TO[kind] ?? REVEAL_TO.up), duration: 1, delay, ease: "expo.out", clearProps: "filter,transform" });
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
