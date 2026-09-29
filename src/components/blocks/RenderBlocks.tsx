import type { HomePage, Page, Faq as CmsFaq } from "@/payload-types";
import type { FAQ } from "@/types";
import { getFaqs, getServices, getSiteContent, getSiteSettings, getTeam, legsFromBlock, mediaUrl } from "@/lib/cms";

import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { CoverageMapSection } from "@/components/sections/CoverageMapSection";
import { MarqueeTicker } from "@/components/sections/MarqueeTicker";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTABannerSection } from "@/components/sections/CTABannerSection";

import { PageHeroBlockView } from "./PageHeroBlockView";
import { FullServiceSection } from "./FullServiceSection";
import { StepsSection } from "./StepsSection";
import { ServicesGridSection } from "./ServicesGridSection";
import { ServicesCompareSection } from "./ServicesCompareSection";
import { PricingCompareSection } from "./PricingCompareSection";
import { FaqSection } from "./FaqSection";
import { ContactBlockSection } from "./ContactBlockSection";
import { TeamSection } from "./TeamSection";
import { TimelineSection } from "./TimelineSection";
import { ValuesSection } from "./ValuesSection";
import { RequirementsSection } from "./RequirementsSection";
import { RichTextSection } from "./RichTextSection";
import { ImageTextSection } from "./ImageTextSection";

export type LayoutBlock = HomePage["layout"][number] | Page["layout"][number];
export interface PageCtx {
  /** The page's own path, e.g. "/" or "/about" — used as the last breadcrumb. */
  path: string;
  /** Short breadcrumb name for this page (the `pages` collection's `title` field, or "Home"). */
  title: string;
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

/** The running "01", "02"… counter, or "—", or no number — computed once per page render, in
 *  layout order, so reordering blocks in the admin automatically renumbers the page. Plain
 *  closure, not a React Hook — named to avoid tripping the hooks-naming lint rule. */
function makeNumberer() {
  let n = 0;
  return (numbering: ("counter" | "dash" | "none") | null | undefined) => {
    if (numbering === "dash") return "—";
    if (numbering === "none") return undefined;
    n += 1;
    return String(n).padStart(2, "0");
  };
}

export async function RenderBlocks({ blocks, ctx }: { blocks: LayoutBlock[]; ctx: PageCtx }) {
  const enabled = blocks.filter((b) => b.enabled !== false);
  if (enabled.length === 0) return null;

  const needs = (type: string) => enabled.some((b) => b.blockType === type);
  const [site, content, services, team] = await Promise.all([
    getSiteSettings(),
    getSiteContent(),
    needs("servicesTabs") || needs("servicesGrid") || needs("servicesCompare") ? getServices() : Promise.resolve(null),
    needs("team") ? getTeam() : Promise.resolve(null),
  ]);

  const nextN = makeNumberer();

  const rendered = await Promise.all(
    enabled.map(async (block) => {
      const n = "numbering" in block ? nextN(block.numbering) : undefined;
      const label = "label" in block ? (block.label ?? undefined) : undefined;

      switch (block.blockType) {
        case "flightHero":
          return <HeroSection key={block.id} beats={block.beats} legs={legsFromBlock(block.legs)} site={site} />;

        case "howItWorks":
          return (
            <HowItWorksSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              intro={block.intro}
              steps={content.steps}
              site={site}
            />
          );

        case "coverageMap":
          return (
            <CoverageMapSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              intro={block.intro}
              regions={(block.regions ?? []).map((r) => ({ name: r.name, states: (r.states ?? []).map((s) => s.text) }))}
              site={site}
            />
          );

        case "pageHero":
          return (
            <PageHeroBlockView
              key={block.id}
              eyebrow={block.eyebrow}
              heading={block.heading}
              highlight={block.highlight}
              tail={block.tail}
              subtitle={block.subtitle}
              image={mediaUrl(block.image) || undefined}
              cta={block.cta}
              size={block.size}
              updated={block.updated}
              crumbs={[{ name: ctx.title, path: ctx.path }]}
              site={site}
            />
          );

        case "marquee":
          return <MarqueeTicker key={block.id} items={content.marqueeItems} reverse={block.reverse ?? false} />;

        case "stats":
          return (
            <StatsSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              tail={block.tail}
              intro={block.intro}
              items={content.stats}
              site={site}
            />
          );

        case "fullService":
          return (
            <FullServiceSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              body={block.body}
              cta={block.cta}
              image={mediaUrl(block.image) || undefined}
              style={block.style ?? "split"}
              stats={block.showStats ? content.stats : undefined}
              items={content.fullService}
              site={site}
            />
          );

        case "steps":
          return (
            <StepsSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              intro={block.intro}
              style={block.style ?? "list"}
              steps={content.steps}
              site={site}
            />
          );

        case "servicesTabs":
          return (
            <ServicesSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              services={services ?? []}
              disclaimer={`${site.rateDisclaimer} ${site.grossDisclaimer}`}
              site={site}
            />
          );

        case "servicesGrid":
          return <ServicesGridSection key={block.id} services={services ?? []} />;

        case "servicesCompare":
          return (
            <ServicesCompareSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              services={services ?? []}
              site={site}
              emitCollectionLd={block.emitCollectionLd}
            />
          );

        case "pricing":
          return (
            <PricingSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              intro={block.intro}
              site={site}
            />
          );

        case "pricingCompare":
          return (
            <PricingCompareSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              rows={content.pricingComparison}
              site={site}
            />
          );

        case "testimonials":
          return (
            <TestimonialsSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              statLine={block.statLine ?? undefined}
              statNote={block.statNote ?? undefined}
              cta={block.cta}
              site={site}
            />
          );

        case "faq": {
          let items: FAQ[];
          if (block.source === "picked") {
            items = (block.items ?? []).filter((f): f is CmsFaq => isObj(f)).map((f) => ({ q: f.question, a: f.answer }));
          } else {
            items = await getFaqs(block.group ?? "general");
          }
          return <FaqSection key={block.id} n={n} label={label} heading={block.heading} highlight={block.highlight} items={items} site={site} />;
        }

        case "blogPreview":
          return (
            <BlogPreviewSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              cta={block.cta}
              limit={block.limit ?? 3}
              site={site}
            />
          );

        case "ctaBanner":
          return (
            <CTABannerSection
              key={block.id}
              title={
                <>
                  {block.heading}
                  {block.highlight && <span className="text-gradient"> {block.highlight}</span>}
                  {block.tail && <> {block.tail}</>}
                </>
              }
              body={block.body ?? undefined}
              truck={block.truck ?? true}
              cta={block.cta}
            />
          );

        case "contact":
          return (
            <ContactBlockSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              intro={block.intro}
              formHeading={block.formHeading}
              statusLine={block.statusLine}
              replyNote={block.replyNote}
              methodsLabel={block.methodsLabel}
              style={block.style ?? "section"}
              site={site}
            />
          );

        case "team":
          return <TeamSection key={block.id} n={n} label={label} heading={block.heading} highlight={block.highlight} team={team ?? []} site={site} />;

        case "timeline":
          return (
            <TimelineSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              paragraphs={block.paragraphs ?? []}
              milestones={block.milestones ?? []}
              site={site}
            />
          );

        case "values":
          return (
            <ValuesSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              image={mediaUrl(block.image) || undefined}
              cards={block.cards ?? []}
              site={site}
            />
          );

        case "requirements":
          return (
            <RequirementsSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              intro={block.intro}
              cta={block.cta}
              items={content.carrierRequirements}
              site={site}
            />
          );

        case "richText":
          return <RichTextSection key={block.id} content={block.content} width={block.width} site={site} />;

        case "imageText":
          return (
            <ImageTextSection
              key={block.id}
              n={n}
              label={label}
              heading={block.heading}
              highlight={block.highlight}
              body={block.body}
              cta={block.cta}
              image={mediaUrl(block.image)}
              imageSide={block.imageSide}
              site={site}
            />
          );

        default:
          return null;
      }
    }),
  );

  return <>{rendered}</>;
}
