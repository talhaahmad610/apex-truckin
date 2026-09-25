"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Self-contained stagger-in animation for a list of direct children, scoped to its own
 * mount/hydration lifecycle.
 *
 * Use this instead of RevealWrapper's `data-stagger-group` / `data-stagger` pattern when
 * the group is rendered inside a `<Suspense>` boundary around an async Server Component.
 * RevealWrapper's raw `querySelectorAll` scan runs on ITS OWN mount, independent of when
 * React actually hydrates a nested Suspense boundary — it can mutate DOM nodes before
 * React hydrates them, producing a hydration mismatch. StaggerReveal instead owns its own
 * `useGSAP`, so its effect can only run after its own component instance (and therefore
 * its own DOM) has mounted/hydrated. Uses IntersectionObserver rather than a GSAP
 * ScrollTrigger — see the comment in RevealWrapper.tsx for why.
 */
export function StaggerReveal({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

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
    <Tag ref={ref as React.Ref<HTMLElement>} className={cn(className)}>
      {children}
    </Tag>
  );
}
