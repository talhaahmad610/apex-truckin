"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

/**
 * Renders the suffix as a smaller, muted companion to the number rather than matching its
 * size/weight/color — the convention premium stat rows use (e.g. Stripe's own stat cards:
 * unit at ~half the value's font-size, muted, small left margin) instead of a same-size
 * suffix, which both reads as more intentional and avoids a long word-suffix (e.g. " States")
 * wrapping onto its own line at the number's giant size.
 */
export function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const { ref, display } = useAnimatedCounter(value, { decimals });
  const final = `${value.toFixed(decimals)}${suffix}`;
  return (
    <span ref={ref} className={className} aria-label={final}>
      <span aria-hidden className="tabular-nums">
        {display}
      </span>
      {suffix && (
        <span aria-hidden className="ml-1 whitespace-nowrap text-[0.45em] font-medium normal-case tracking-normal text-muted">
          {suffix.trim()}
        </span>
      )}
    </span>
  );
}
