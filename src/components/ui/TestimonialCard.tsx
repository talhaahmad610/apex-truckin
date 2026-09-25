import { Quote } from "lucide-react";
import type { Testimonial } from "@/types";
import { Stars } from "./Card";
import { TiltCard } from "@/components/3d/TiltCard";
import { cn } from "@/lib/utils";

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  const initials = t.carrier_name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <TiltCard className={cn("h-full rounded-[2rem]", className)} max={6}>
      <figure className="bezel h-full break-inside-avoid">
        <div className="bezel-core relative h-full p-7 md:p-8">
          <Quote aria-hidden className="absolute right-6 top-6 h-10 w-10 text-amber/15" strokeWidth={1} />
          <Stars rating={t.rating} />
          <blockquote className="mt-5 text-lg font-medium leading-relaxed tracking-tight text-white/90">
            &ldquo;{t.review_text}&rdquo;
          </blockquote>
          <figcaption className="mt-7 flex items-center gap-3.5 border-t border-white/10 pt-5">
            <span aria-hidden className="flex h-11 w-11 items-center justify-center rounded-full bg-grad font-display text-lg font-bold text-bg">
              {initials}
            </span>
            <span>
              <span className="block font-semibold text-white">{t.carrier_name}</span>
              <span className="block text-xs uppercase tracking-[0.14em] text-muted">
                {[t.truck_type, t.location].filter(Boolean).join(" · ")}
              </span>
            </span>
          </figcaption>
        </div>
      </figure>
    </TiltCard>
  );
}

export function TestimonialSkeleton() {
  return (
    <div aria-hidden className="bezel mb-5 break-inside-avoid">
      <div className="bezel-core space-y-3 p-8">
        <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
        <div className="h-4 w-full animate-pulse rounded bg-white/5" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-white/5" />
      </div>
    </div>
  );
}
