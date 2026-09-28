"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { PricingTier } from "@/types";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn("relative h-full rounded-[2rem]", tier.featured && "animate-pulse-ring lg:-my-4")}
    >
      {tier.featured && (
        <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-grad px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-bg shadow-[0_8px_30px_-6px_rgba(245,166,35,0.7)]">
          Most popular
        </span>
      )}
      <div className={cn("bezel h-full", tier.featured && "shimmer-border border-transparent")}>
        <div
          className={cn(
            "bezel-core flex h-full flex-col p-8 md:p-10",
            tier.featured && "bg-[linear-gradient(180deg,rgba(245,166,35,0.10),rgba(15,17,23,0.95)_45%)]",
          )}
        >
          <h3 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-white/90">{tier.name}</h3>
          <p className="mt-2 min-h-12 text-sm text-muted">{tier.blurb}</p>
          <p className="mt-8 flex items-baseline gap-2">
            <span className={cn("font-display text-7xl font-bold leading-none", tier.featured ? "text-gradient" : "text-white")}>{tier.price}</span>
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-white/50">{tier.unit}</p>
          <ul className="my-9 flex-1 space-y-3.5 border-t border-white/10 pt-8">
            {tier.features.map((f) => (
              <li key={f} className="flex gap-3 text-sm text-white/85">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber/10 text-amber">
                  <Check className="h-3 w-3" strokeWidth={2} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button href={tier.ctaHref} variant={tier.featured ? "primary" : "ghost"} className="w-full justify-between">
            {tier.cta}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
