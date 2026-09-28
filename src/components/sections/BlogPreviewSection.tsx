import { Suspense } from "react";
import { getFeaturedPosts } from "@/lib/cms";
import type { SiteInfo } from "@/types";
import { BlogCard, BlogCardSkeleton } from "@/components/ui/BlogCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GradientHeading } from "@/components/blocks/GradientHeading";
import { Button } from "@/components/ui/Button";

async function LatestPosts({ limit }: { limit: number }) {
  const posts = await getFeaturedPosts(limit);
  return (
    <StaggerReveal as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.id}>
          <BlogCard post={p} />
        </li>
      ))}
    </StaggerReveal>
  );
}

export function BlogPreviewSection({
  n,
  label = "Insights",
  heading = "Latest dispatch",
  highlight = "insights.",
  cta = { label: "All Articles", href: "/blog" },
  limit = 3,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string;
  highlight?: string | null;
  cta?: { label?: string | null; href?: string | null } | null;
  limit?: number;
  site: SiteInfo;
}) {
  return (
    <RevealWrapper as="section" id="insights" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel n={n} label={label} />
            <GradientHeading
              as="h2"
              data-reveal="up"
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]"
              heading={heading}
              highlight={highlight}
              site={site}
            />
          </div>
          {cta?.label && cta.href && (
            <div data-reveal="up">
              <Button href={cta.href} variant="ghost">{cta.label}</Button>
            </div>
          )}
        </div>
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: Math.min(limit, 3) }, (_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <LatestPosts limit={limit} />
        </Suspense>
      </div>
    </RevealWrapper>
  );
}
