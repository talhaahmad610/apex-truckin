"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TableOfContents({ items }: { items: { id: string; text: string; level: 2 | 3 }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (!items.length) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">On this page</p>
      <ol className="space-y-1 border-l border-white/10">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1.5 text-sm leading-snug transition-colors duration-300",
                i.level === 3 ? "pl-7" : "pl-4",
                active === i.id ? "border-amber text-white" : "border-transparent text-white/50 hover:text-white",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
