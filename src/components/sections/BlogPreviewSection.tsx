import { Suspense } from "react";
import { getFeaturedPosts } from "@/lib/api";
import { BlogCard, BlogCardSkeleton } from "@/components/ui/BlogCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";

async function LatestPosts() {
  const posts = await getFeaturedPosts(3);
  return (
    <ul data-stagger-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <li key={p.id} data-stagger>
          <BlogCard post={p} />
        </li>
      ))}
    </ul>
  );
}

export function BlogPreviewSection() {
  return (
    <RevealWrapper as="section" id="insights" className="relative py-24 md:py-40">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <div className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel n="05" label="Insights" />
            <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.5rem,6vw,5.25rem)] font-bold uppercase leading-[0.92]">
              Latest dispatch <span className="text-gradient">insights.</span>
            </h2>
          </div>
          <div data-reveal="up">
            <Button href="/blog" variant="ghost">All Articles</Button>
          </div>
        </div>
        <Suspense
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <BlogCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <LatestPosts />
        </Suspense>
      </div>
    </RevealWrapper>
  );
}
