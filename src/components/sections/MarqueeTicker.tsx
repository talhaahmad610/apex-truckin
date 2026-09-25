import { MARQUEE_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function MarqueeTicker({ className, reverse = false }: { className?: string; reverse?: boolean }) {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-line bg-[linear-gradient(90deg,rgba(245,166,35,0.06),rgba(232,93,4,0.04))] py-5 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]",
        className,
      )}
    >
      <p className="sr-only">Equipment we dispatch: {MARQUEE_ITEMS.join(", ")}.</p>
      <div
        aria-hidden
        className={cn("flex w-max animate-marquee items-center hover:[animation-play-state:paused]", reverse && "[animation-direction:reverse]")}
      >
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span className="px-7 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase tracking-[0.04em] text-white/90">
                  {item}
                </span>
                <span className="text-lg text-amber">◈</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
