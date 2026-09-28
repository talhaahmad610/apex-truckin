import Image from "next/image";
import type { SiteInfo } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { GradientHeading } from "./GradientHeading";
import { fillTokens } from "@/lib/tokens";
import { cn } from "@/lib/utils";

export function ImageTextSection({
  n,
  label,
  heading,
  highlight,
  body,
  cta,
  image,
  imageSide = "right",
  site,
}: {
  n?: string;
  label?: string | null;
  heading: string;
  highlight?: string | null;
  body?: string | null;
  cta?: { label?: string | null; href?: string | null } | null;
  image: string;
  imageSide?: "left" | "right" | null;
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" className="py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 sm:px-8 lg:grid-cols-2">
        <div className={cn(imageSide === "left" ? "lg:order-2" : undefined)}>
          {label && <SectionLabel n={n} label={label} />}
          <GradientHeading
            as="h2"
            data-reveal="up"
            className={cn("font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold uppercase leading-[0.92]", label ? "mt-6" : undefined)}
            heading={heading}
            highlight={highlight}
            site={site}
          />
          {body && (
            <p data-reveal="up" className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
              {fillTokens(body, site)}
            </p>
          )}
          {cta?.label && cta.href && (
            <div data-reveal="up" className="mt-8">
              <Button href={cta.href}>{cta.label}</Button>
            </div>
          )}
        </div>
        <div data-reveal="up" className={cn("relative aspect-[4/3] overflow-hidden rounded-[2rem]", imageSide === "left" ? "lg:order-1" : undefined)}>
          <Image src={image} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </RevealWrapper>
  );
}
