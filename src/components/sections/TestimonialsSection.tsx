import { Suspense } from "react";
import { getTestimonials } from "@/lib/cms";
import type { SiteInfo } from "@/types";
import { TestimonialCard, TestimonialSkeleton } from "@/components/ui/TestimonialCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { TestimonialsCarousel } from "./TestimonialsCarousel";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/blocks/GradientHeading";
import { Stars } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

async function TestimonialGrid() {
  const items = await getTestimonials();
  const avg = items.length ? items.reduce((a, t) => a + t.rating, 0) / items.length : 4.9;
  return (
    <>
      <TestimonialsCarousel count={items.length}>
        {items.map((t, i) => (
          <div
            key={t.id}
            className={cn(
              "w-[85%] shrink-0 snap-center sm:w-[65%] md:w-auto md:shrink md:snap-none",
              i === 1 && "lg:pt-12",
            )}
          >
            <TestimonialCard t={t} />
          </div>
        ))}
      </TestimonialsCarousel>
      <Reveal as="div" className="mt-10 bezel">
        <div className="bezel-core flex flex-col items-center justify-between gap-6 p-7 text-center md:flex-row md:p-9 md:text-left">
          <div className="flex flex-col items-center gap-5 md:flex-row">
            <p className="font-display text-7xl font-bold leading-none text-gradient">{Math.min(avg, 4.9).toFixed(1)}★</p>
            <div>
              <Stars rating={5} />
              <p className="mt-2 font-display text-2xl font-bold uppercase tracking-wide">Average carrier satisfaction</p>
              <p className="text-sm text-muted">Based on verified reviews from owner-operators and fleets we dispatch.</p>
            </div>
          </div>
          <Button href="/contact">Join Them</Button>
        </div>
      </Reveal>
    </>
  );
}

export function TestimonialsSection({
  n,
  label = "Carrier voice",
  heading = "Real drivers.",
  highlight = "Real results.",
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" id="testimonials" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mb-14 max-w-3xl md:mb-20">
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]"
            heading={heading}
            highlight={highlight}
            site={site}
          />
        </div>
        <Suspense
          fallback={
            <div className="no-scrollbar -mx-4 flex gap-5 overflow-x-auto px-4 md:mx-0 md:block md:columns-2 md:overflow-visible md:px-0 lg:columns-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-[85%] shrink-0 sm:w-[65%] md:w-auto md:shrink">
                  <TestimonialSkeleton />
                </div>
              ))}
            </div>
          }
        >
          <TestimonialGrid />
        </Suspense>
      </div>
    </RevealWrapper>
  );
}
