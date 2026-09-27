"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import type { Post } from "@/types";
import { BlogCard } from "@/components/ui/BlogCard";
import { cn } from "@/lib/utils";

const PER_PAGE = 6;

export function BlogExplorer({ posts, categories }: { posts: Post[]; categories: string[] }) {
  // Filter chips come from the CMS (Blog → Categories), in their configured order.
  const CATEGORIES = ["All", ...categories];
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (cat === "All" || p.category === cat) &&
        (!needle || `${p.title} ${p.excerpt ?? ""} ${p.category} ${p.author}`.toLowerCase().includes(needle)),
    );
  }, [posts, cat, q]);

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const counts = useMemo(() => {
    const m = new Map<string, number>([["All", posts.length]]);
    posts.forEach((p) => m.set(p.category, (m.get(p.category) ?? 0) + 1));
    return m;
  }, [posts]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => {
                setCat(c);
                setPage(1);
              }}
              className={cn(
                "rounded-full px-4 py-2.5 text-[12px] font-medium uppercase tracking-[0.14em] ring-1 transition-all duration-500",
                cat === c ? "bg-grad text-bg ring-transparent" : "text-white/70 ring-white/10 hover:text-white hover:ring-amber/40",
              )}
            >
              {c}
              <span className={cn("ml-2 tabular-nums", cat === c ? "text-bg/60" : "text-white/35")}>{counts.get(c) ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="relative w-full lg:w-80">
          <label htmlFor="blog-search" className="sr-only">Search articles</label>
          <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" strokeWidth={1.5} />
          <input
            id="blog-search"
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            placeholder="Search articles…"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-3 pl-11 pr-10 text-sm text-white placeholder:text-white/35 focus:border-amber/50 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/50 hover:text-white">
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filtered.length} article{filtered.length === 1 ? "" : "s"} found
      </p>

      {visible.length ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              >
                <BlogCard post={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-white/15 px-6 py-20 text-center">
          <p className="font-display text-3xl font-bold uppercase">No articles found</p>
          <p className="mt-2 text-muted">Try a different category or search term.</p>
        </div>
      )}

      {pages > 1 && (
        <nav aria-label="Blog pagination" className="mt-14 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-white/10 hover:ring-amber/40 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
          {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              aria-current={n === current ? "page" : undefined}
              className={cn(
                "h-11 w-11 rounded-full text-sm font-semibold tabular-nums ring-1 transition-colors",
                n === current ? "bg-grad text-bg ring-transparent" : "text-white/70 ring-white/10 hover:ring-amber/40",
              )}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={current === pages}
            aria-label="Next page"
            className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-white/10 hover:ring-amber/40 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </nav>
      )}
    </div>
  );
}
