"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal container. Any descendant with `data-reveal="up" | "left" | "fade" | "scale"`
 * animates in when it enters the viewport. Children with `data-stagger` inside a
 * `data-stagger-group` animate sequentially.
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

      const from: Record<string, gsap.TweenVars> = {
        up: { y: 56, opacity: 0, filter: "blur(8px)" },
        left: { x: -40, opacity: 0 },
        fade: { opacity: 0 },
        scale: { scale: 0.94, opacity: 0, y: 24 },
      };

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.closest("[data-stagger-group]") && el.hasAttribute("data-stagger")) return;
        const kind = el.dataset.reveal ?? "up";
        gsap.from(el, {
          ...(from[kind] ?? from.up),
          duration: 1,
          delay: Number(el.dataset.delay ?? 0),
          ease: "expo.out",
          clearProps: "filter",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-stagger-group]").forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>("[data-stagger]");
        if (!items.length) return;
        gsap.from(items, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
          stagger: 0.1,
          clearProps: "transform",
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} id={id} aria-label={ariaLabel} className={cn(className)}>
      {children}
    </Tag>
  );
}
