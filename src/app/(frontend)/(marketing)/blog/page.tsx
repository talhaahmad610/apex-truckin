import { getCategories, getPosts, getSiteContent, getSiteSettings } from "@/lib/cms";
import { collectionLd, pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { BlogExplorer } from "@/components/sections/BlogExplorer";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { BlogCard } from "@/components/ui/BlogCard";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { JsonLd } from "@/components/ui/JsonLd";

export const dynamic = "force-dynamic";

export const generateMetadata = async () => {
  const content = await getSiteContent();
  return pageMetadata({
    title: content.blogIndex.metaTitle,
    description: content.blogIndex.metaDescription,
    path: "/blog",
  });
};

export default async function BlogPage() {
  const [{ posts }, categories, site, content] = await Promise.all([getPosts({ limit: 100 }), getCategories(), getSiteSettings(), getSiteContent()]);
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={collectionLd({
          site,
          name: content.blogIndex.ldName,
          description: content.blogIndex.ldDescription,
          path: "/blog",
          items: posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}`, image: p.cover_image_url ?? undefined })),
        })}
      />
      <PageHero
        eyebrow={content.blogIndex.eyebrow}
        title={
          <>
            {content.blogIndex.heading} <span className="text-gradient">{content.blogIndex.highlight}</span>
          </>
        }
        subtitle={content.blogIndex.subtitle}
        crumbs={[{ name: "Blog", path: "/blog" }]}
        className="min-h-[60dvh]"
      />

      {featured && (
        <RevealWrapper as="section" className="pb-16">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
            <h2 className="sr-only">Featured Article</h2>
            <SectionLabel label="Featured" />
            <div data-reveal="up" className="mt-6">
              <BlogCard post={featured} featured priority />
            </div>
          </div>
        </RevealWrapper>
      )}

      <section className="pb-24 md:pb-36" aria-label="All articles">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
          <h2 className="mb-8 font-display text-4xl font-bold uppercase md:text-5xl">All articles</h2>
          <BlogExplorer posts={rest.length ? rest : posts} categories={categories} />
        </div>
      </section>

      <CTABannerSection />
    </>
  );
}
