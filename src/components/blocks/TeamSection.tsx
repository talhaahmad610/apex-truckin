import Image from "next/image";
import type { SiteInfo, TeamMember } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "./GradientHeading";

export function TeamSection({
  n,
  label = "The team",
  heading = "The people",
  highlight = "on your line",
  team,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  team: TeamMember[];
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <SectionLabel n={n} label={label} />
        <GradientHeading
          as="h2"
          data-reveal="up"
          className="mb-14 mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]"
          heading={heading}
          highlight={highlight}
          site={site}
        />
        <ul data-stagger-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <li key={m.name} data-stagger className={i % 2 ? "lg:mt-12" : undefined}>
              <figure className="bezel group">
                <div className="bezel-core overflow-hidden">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={m.image}
                      alt={m.imageAlt || `Portrait of ${m.name}, ${m.role}`}
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
  );
}
