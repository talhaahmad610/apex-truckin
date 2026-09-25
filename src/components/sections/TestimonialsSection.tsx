import { Suspense } from "react";
import { getTestimonials } from "@/lib/api";
import { TestimonialCard, TestimonialSkeleton } from "@/components/ui/TestimonialCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Stars } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

async function TestimonialGrid() {
  const items = await getTestimonials();
  const avg = items.length ? items.reduce((a, t) => a + t.rating, 0) / items.length : 4.9;
  return (
    <>
      <div data-stagger-group className="columns-1 gap-5 md:columns-2 lg:columns-3 [&>*]:mb-5">
        {items.map((t, i) => (
          <div key={t.id} data-stagger className={i === 1 ? "lg:pt-12" : undefined}>
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
      <div data-reveal="up" className="mt-10 bezel">
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
      </div>
    </>
  );
}

export function TestimonialsSection() {
  return (
    <RevealWrapper as="section" id="testimonials" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mb-14 max-w-3xl md:mb-20">
          <SectionLabel n="06" label="Carrier voice" />
          <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]">
            Real drivers. <span className="text-gradient">Real results.</span>
          </h2>
        </div>
        <Suspense
          fallback={
            <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
              {[0, 1, 2].map((i) => (
                <TestimonialSkeleton key={i} />
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
