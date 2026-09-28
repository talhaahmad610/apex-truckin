import Image from "next/image";
import type { SiteContentData, SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ParallaxImage } from "@/components/3d/ParallaxImage";
import { TiltCard } from "@/components/3d/TiltCard";
import { GradientHeading } from "./GradientHeading";
import { fillTokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

type Item = { title: string; body: string };
type Cta = { label?: string | null; href?: string | null } | null | undefined;

export function FullServiceSection({
  n,
  label = "Full-service dispatch",
  heading,
  highlight,
  body,
  cta,
  image,
  style,
  stats,
  items,
  site,
}: {
  n?: string;
  label?: string;
  heading: string;
  highlight?: string | null;
  body?: string | null;
  cta?: Cta;
  image?: string | null;
  style: "split" | "cards" | "compact";
  stats?: SiteContentData["stats"] | null;
  items: Item[];
  site: SiteInfo;
}) {
  if (style === "cards") {
    return (
      <RevealWrapper as="section" className="py-24 md:py-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className={cn("mt-6 max-w-3xl font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]", !body && "mb-14")}
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {body && (
            <p data-reveal="up" className="mb-14 mt-5 max-w-2xl text-muted">
              {fillTokens(body, site)}
            </p>
          )}
          <ul data-stagger-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((b, i) => (
              <li key={b.title} data-stagger>
                <TiltCard className="h-full rounded-[2rem]">
                  <div className="bezel h-full">
                    <div className="bezel-core h-full p-8">
                      <span className="font-display text-5xl font-bold text-gradient">0{i + 1}</span>
                      <h3 className="mt-5 font-display text-3xl font-bold uppercase">{b.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{b.body}</p>
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

  if (style === "compact") {
    return (
      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel n={n} label={label} />
              <GradientHeading
                as="h2"
                data-reveal="up"
                className="mt-6 font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]"
                heading={heading}
                highlight={highlight}
                site={site}
              />
              {stats && stats.length > 0 && (
                <dl data-stagger-group className="mt-10 grid grid-cols-2 gap-4">
                  {stats.map((s) => (
                    <div key={s.label} data-stagger className="flex flex-col-reverse rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                      <dt className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{s.label}</dt>
                      <dd>
                        <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals} className="font-display text-4xl font-bold text-gradient" />
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
            <ul data-stagger-group className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
              {items.map((b) => (
                <li key={b.title} data-stagger className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="font-display text-2xl font-bold uppercase">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </RevealWrapper>
    );
  }

  // split (home page default)
  return (
    <RevealWrapper as="section" id="about" className="relative isolate overflow-hidden py-28 md:py-44">
      {image ? (
        <ParallaxImage className="-z-20">
          <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        </ParallaxImage>
      ) : (
        <div aria-hidden className="absolute inset-0 -z-20 bg-[#0d0e14]" />
      )}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,15,0.96)_0%,rgba(10,10,15,0.82)_50%,rgba(10,10,15,0.55)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel n={n} label={label} />
          <GradientHeading
            as="h2"
            data-reveal="up"
            className="mt-6 font-display text-[clamp(2.75rem,6.5vw,5.75rem)] font-bold uppercase leading-[0.9]"
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {body && (
            <p data-reveal="up" className="mt-7 max-w-md text-lg leading-relaxed text-white/75">
              {fillTokens(body, site)}
            </p>
          )}
          {cta?.label && cta.href && (
            <div data-reveal="up" className="mt-9">
              <Button href={cta.href} variant="ghost">{cta.label}</Button>
            </div>
          )}
        </div>

        <ol data-stagger-group className="grid gap-4 lg:col-span-7 lg:pl-8">
          {items.map((p, i) => (
            <li key={p.title} data-stagger style={{ marginLeft: `${(i % 3) * 6}%` }} className="max-lg:!ml-0">
              <div className="bezel">
                <div className="bezel-core grid grid-cols-[auto_1fr] items-start gap-6 p-7 md:p-8">
                  <span className="font-display text-5xl font-bold leading-none text-gradient">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-wide">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </RevealWrapper>
  );
}
