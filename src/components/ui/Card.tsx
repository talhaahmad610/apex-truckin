import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Double-bezel card: machined outer shell + inner core. */
export function Card({
  children,
  className,
  coreClassName,
  ...rest
}: { children: ReactNode; className?: string; coreClassName?: string } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("bezel", className)} {...rest}>
      <div className={cn("bezel-core h-full", coreClassName)}>{children}</div>
    </div>
  );
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-amber/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)} aria-hidden>
      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-live" />
      <span className="absolute -inset-1 rounded-full bg-emerald-400/25 animate-live" />
    </span>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn("h-4 w-4", i < rating ? "fill-amber" : "fill-white/15")} aria-hidden>
          <path d="M10 1.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6L1.4 7.8l6-.8z" />
        </svg>
      ))}
    </span>
  );
}
