"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { FAQ } from "@/types";
import { cn } from "@/lib/utils";

/** Accordion that keeps every answer in the DOM (crawlable) and animates via grid rows. */
export function FAQAccordion({ items, className }: { items: FAQ[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <div className={cn("divide-y divide-white/10 border-y border-white/10", className)}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`${base}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${base}-a-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className={cn("text-lg font-medium transition-colors md:text-xl", isOpen ? "text-amber" : "text-white group-hover:text-amber")}>
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    isOpen ? "rotate-45 bg-amber text-bg ring-amber" : "text-white/70 ring-white/15",
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div
              id={`${base}-a-${i}`}
              role="region"
              aria-labelledby={`${base}-q-${i}`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-6 leading-relaxed text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
