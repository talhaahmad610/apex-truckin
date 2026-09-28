import type { FAQ, SiteInfo } from "@/types";
import { faqLd } from "@/lib/seo";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { GradientHeading } from "./GradientHeading";

export function FaqSection({
  n,
  label = "FAQ",
  heading = "Questions",
  highlight,
  items,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string | null;
  highlight?: string | null;
  items: FAQ[];
  site: SiteInfo;
}) {
  if (items.length === 0) return null;
  return (
    <RevealWrapper as="section" className="py-24 md:py-32">
      <JsonLd data={faqLd(items)} />
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionLabel n={n} label={label} />
          {heading && (
            <GradientHeading
              as="h2"
              data-reveal="up"
              className="mt-6 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold uppercase leading-[0.92]"
              heading={heading}
              highlight={highlight}
              site={site}
            />
          )}
        </div>
        <div data-reveal="up" className="lg:col-span-8">
          <FAQAccordion items={items} />
        </div>
      </div>
    </RevealWrapper>
  );
}
