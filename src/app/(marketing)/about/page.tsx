import Image from "next/image";
import { COMPANY, STATS, TEAM, VALUES, CARRIER_BENEFITS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { TiltCard } from "@/components/3d/TiltCard";
import { ParallaxImage } from "@/components/3d/ParallaxImage";

export const metadata = pageMetadata({
  title: "About Apex Truckin — Dispatchers Who've Driven the Miles",
  description:
    "Founded in Dallas in 2019 by a former owner-operator, Apex Truckin dispatches 500+ loads a month for carriers across all 48 states. Meet the team and our values.",
  path: "/about",
});

const TIMELINE = [
  { year: "2019", title: "One truck, one phone", body: "Founder Ryan Mitchell starts dispatching for three owner-operator friends out of a Dallas apartment." },
  { year: "2021", title: "24/7 desk goes live", body: "We add overnight dispatchers after too many 2 AM broker calls went to voicemail at other firms." },
  { year: "2023", title: "Flatbed & reefer desks", body: "Specialist desks launch for open-deck and temperature-controlled freight." },
  { year: "2025", title: "500+ loads a month", body: "Apex now dispatches for carriers in all 48 states with a 4.9★ average rating." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Apex"
        title={
          <>
            Dispatchers who&apos;ve <span className="text-gradient">driven the miles.</span>
          </>
        }
        subtitle={`Founded in ${COMPANY.address.city} in ${COMPANY.founded}, Apex Truckin exists for one reason: to keep independent carriers loaded, paid and in control.`}
        image="/images/about-highway.webp"
        crumbs={[{ name: "About", path: "/about" }]}
      />

      {/* Story */}
      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel n="01" label="Our story" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
              Started in the cab. <span className="text-gradient">Built for carriers.</span>
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/75 lg:col-span-7">
            <p data-reveal="up">
              After twelve years running dry van and reefer, our founder was tired of dispatchers who booked cheap freight, forced
              loads and disappeared after 5 PM. So he built the dispatch service he always wanted: one that treats every truck like
              its own business.
            </p>
            <p data-reveal="up">
              Today Apex Truckin is a team of dispatchers, former brokers and billing specialists. We still work the same way —
              plan loops instead of one-offs, negotiate every accessorial, send every load for approval, and pick up the phone at
              any hour.
            </p>
          </div>
        </div>

        <ol data-stagger-group className="mx-auto mt-20 grid max-w-[1320px] gap-px px-4 sm:px-8 md:grid-cols-4">
          {TIMELINE.map((t) => (
            <li key={t.year} data-stagger className="relative border-t border-white/10 pt-8 md:pr-8">
              <span aria-hidden className="absolute -top-[5px] left-0 h-2.5 w-2.5 rounded-full bg-amber shadow-[0_0_14px_3px_rgba(245,166,35,0.6)]" />
              <p className="font-display text-5xl font-bold text-gradient">{t.year}</p>
              <h3 className="mt-3 font-display text-2xl font-bold uppercase">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.body}</p>
            </li>
          ))}
        </ol>
      </RevealWrapper>

      {/* Mission & values */}
      <RevealWrapper as="section" className="relative isolate overflow-hidden py-24 md:py-36">
        <ParallaxImage className="-z-20">
          <Image src="/images/footer-sunset.webp" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        </ParallaxImage>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/80 to-bg" />
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel n="02" label="Mission & values" />
          <p data-reveal="up" className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.5vw,4rem)] font-bold uppercase leading-[0.95]">
            Our mission: make every independent carrier as profitable as the <span className="text-gradient">biggest fleets.</span>
          </p>
          <ul data-stagger-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <li key={v.title} data-stagger>
                <TiltCard className="h-full rounded-[2rem]">
                  <div className="bezel h-full">
                    <div className="bezel-core h-full p-7">
                      <span className="font-display text-sm font-semibold tracking-[0.3em] text-amber">0{i + 1}</span>
                      <h3 className="mt-4 font-display text-3xl font-bold uppercase">{v.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
                    </div>
                  </div>
                </TiltCard>
              </li>
            ))}
          </ul>
        </div>
      </RevealWrapper>

      {/* Team */}
      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel n="03" label="The team" />
          <h2 data-reveal="up" className="mb-14 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
            The people <span className="text-gradient">on your line</span>
          </h2>
          <ul data-stagger-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((m, i) => (
              <li key={m.name} data-stagger className={i % 2 ? "lg:mt-12" : undefined}>
                <figure className="bezel group">
                  <div className="bezel-core overflow-hidden">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={m.image}
                        alt={`Portrait of ${m.name}, ${m.role}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                    </div>
                    <figcaption className="p-6">
                      <p className="font-display text-2xl font-bold uppercase">{m.name}</p>
                      <p className="text-[11px] uppercase tracking-[0.18em] text-amber">{m.role}</p>
                      <p className="mt-3 text-sm text-muted">{m.bio}</p>
                    </figcaption>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </RevealWrapper>

      {/* Why choose + network stats */}
      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel n="04" label="Why Apex" />
              <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]">
                Why carriers <span className="text-gradient">choose us</span>
              </h2>
              <dl data-stagger-group className="mt-10 grid grid-cols-2 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} data-stagger className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                    <dt className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                    <dd>
                      <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} className="font-display text-4xl font-bold text-gradient" />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <ul data-stagger-group className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {CARRIER_BENEFITS.map((b) => (
                <li key={b.title} data-stagger className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-display text-2xl font-bold uppercase">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealWrapper>

      <CTABannerSection />
    </>
  );
}
