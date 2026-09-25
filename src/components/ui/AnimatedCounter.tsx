"use client";

import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

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
        {suffix}
      </span>
    </span>
  );
}
