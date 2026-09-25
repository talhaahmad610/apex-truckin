import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Apex Truckin — home" className={cn("group inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden>
        <defs>
          <linearGradient id="lg-apex" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f5a623" />
            <stop offset="1" stopColor="#e85d04" />
          </linearGradient>
        </defs>
        <rect x="0.75" y="0.75" width="38.5" height="38.5" rx="11" fill="none" stroke="rgba(245,166,35,0.35)" />
        <path d="M8 29 L20 9 L32 29" fill="none" stroke="url(#lg-apex)" strokeWidth="3.2" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M13.5 23 H26.5" stroke="url(#lg-apex)" strokeWidth="3.2" strokeLinecap="round" className="origin-center transition-transform duration-500 group-hover:scale-x-110" />
      </svg>
      <span className="font-display text-[22px] font-bold uppercase leading-none tracking-[0.04em]">
        Apex<span className="text-amber"> Truckin</span>
      </span>
    </Link>
  );
}
