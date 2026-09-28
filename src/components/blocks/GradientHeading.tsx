import type { ElementType } from "react";
import { fillTokens } from "@/lib/tokens";
import type { SiteInfo } from "@/types";

/** Renders "heading <gradient>highlight</gradient> tail" — the pattern every block heading uses. */
export function GradientHeading({
  as: As = "h2",
  heading,
  highlight,
  tail,
  site,
  className,
  ...rest
}: {
  as?: ElementType;
  heading: string;
  highlight?: string | null;
  tail?: string | null;
  site: SiteInfo;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <As className={className} {...rest}>
      {fillTokens(heading, site)}
      {highlight && (
        <>
          {" "}
          <span className="text-gradient">{fillTokens(highlight, site)}</span>
        </>
      )}
      {tail && <> {fillTokens(tail, site)}</>}
    </As>
  );
}
