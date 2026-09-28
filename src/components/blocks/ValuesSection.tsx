import Image from "next/image";
import type { SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ParallaxImage } from "@/components/3d/ParallaxImage";
import { TiltCard } from "@/components/3d/TiltCard";
import { GradientHeading } from "./GradientHeading";

export function ValuesSection({
  n,
  label = "Mission & values",
  heading,
  highlight,
  image,
  cards,
  site,
}: {
  n?: string;
  label?: string;
  heading: string;
  highlight?: string | null;
  image?: string | null;
  cards: { title: string; body: string }[];
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" className="relative isolate overflow-hidden py-24 md:py-36">
      {image && (
        <ParallaxImage className="-z-20">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-30" />
        </ParallaxImage>
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/80 to-bg" />
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionLabel n={n} label={label} />
        <GradientHeading
          as="h2"
          data-reveal="up"
          className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.5vw,4rem)] font-bold uppercase leading-[0.95]"
          heading={heading}
          highlight={highlight}
          site={site}
        />
        <ul data-stagger-group className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((v, i) => (
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
  );
}
