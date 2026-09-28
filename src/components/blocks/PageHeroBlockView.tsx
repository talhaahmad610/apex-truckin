import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { fillTokens } from "@/lib/tokens";
import type { SiteInfo } from "@/types";

const SIZE_CLASS: Record<string, string> = {
  short: "min-h-[60dvh]",
  legal: "min-h-[50dvh]",
};

export function PageHeroBlockView({
  eyebrow,
  heading,
  highlight,
  tail,
  subtitle,
  image,
  cta,
  size,
  updated,
  crumbs,
  site,
}: {
  eyebrow: string;
  heading: string;
  highlight?: string | null;
  tail?: string | null;
  subtitle?: string | null;
  image?: string | null;
  cta?: { label?: string | null; href?: string | null } | null;
  size?: string | null;
  updated?: string | null;
  crumbs: { name: string; path: string }[];
  site: SiteInfo;
}) {
  const isLegal = size === "legal";
  return (
    <PageHero
      eyebrow={isLegal && updated ? `Last updated ${updated}` : fillTokens(eyebrow, site)}
      title={
        <>
          {fillTokens(heading, site)}
          {highlight && <span className="text-gradient"> {fillTokens(highlight, site)}</span>}
          {tail && <> {fillTokens(tail, site)}</>}
        </>
      }
      subtitle={subtitle ? fillTokens(subtitle, site) : undefined}
      image={image ?? undefined}
      crumbs={crumbs}
      className={size ? SIZE_CLASS[size] : undefined}
    >
      {cta?.label && cta.href ? <Button href={cta.href} size="lg">{cta.label}</Button> : undefined}
    </PageHero>
  );
}
