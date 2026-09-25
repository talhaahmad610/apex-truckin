"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { REVEAL_FROM, REVEAL_TO, type RevealKind } from "@/lib/reveal";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal container. Any descendant with `data-reveal="up" | "left" | "fade" | "scale"`
 * animates in when it enters the viewport. Children with `data-stagger` inside a
 * `data-stagger-group` animate sequentially.
 *
 * Uses one shared IntersectionObserver per instance rather than a GSAP ScrollTrigger per
 * element: profiling (Lighthouse forced-reflow audit) found dozens of individual
 * `ScrollTrigger.create()` calls across a page each force a synchronous layout read at mount,
 * adding 600ms-1.5s of main-thread blocking during hydration — even on pages with no other
 * scroll-driven content. IntersectionObserver is async/browser-batched and never forces layout.
 */
export function RevealWrapper({
  children,
  className,
  as: Tag = "div",
  id,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
  id?: string;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;

      const singles = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]")).filter(
        (el) => !(el.closest("[data-stagger-group]") && el.hasAttribute("data-stagger")),
      );
      const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-stagger-group]"));
      if (!singles.length && !groups.length) return;

      // One write pass to set every "from" state up front — no reads interleaved between
      // them, which is what causes layout thrashing when many elements are involved.
      singles.forEach((el) => gsap.set(el, REVEAL_FROM[(el.dataset.reveal as RevealKind) ?? "up"] ?? REVEAL_FROM.up));
      groups.forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>(group.querySelectorAll("[data-stagger]"));
        if (items.length) gsap.set(items, { y: 60, opacity: 0 });
      });

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            io.unobserve(entry.target);
            const el = entry.target as HTMLElement;
            if (el.hasAttribute("data-stagger-group")) {
              const items = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-stagger]"));
              if (items.length) gsap.to(items, { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.1, clearProps: "transform" });
            } else {
              const kind = (el.dataset.reveal as RevealKind) ?? "up";
              gsap.to(el, {
                ...(REVEAL_TO[kind] ?? REVEAL_TO.up),
                duration: 1,
                delay: Number(el.dataset.delay ?? 0),
                ease: "expo.out",
                clearProps: "filter,transform",
              });
            }
          }
        },
        { threshold: 0, rootMargin: "0px 0px -12% 0px" },
      );
      singles.forEach((el) => io.observe(el));
      groups.forEach((el) => io.observe(el));

      // IntersectionObserver isn't a GSAP-tracked object, so gsap.context() won't clean it up
      // on revert automatically — returning a cleanup fn from a useGSAP callback is the
      // documented way to have it run on unmount alongside GSAP's own teardown.
      return () => io.disconnect();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} id={id} aria-label={ariaLabel} className={cn(className)}>
      {children}
    </Tag>
  );
}
