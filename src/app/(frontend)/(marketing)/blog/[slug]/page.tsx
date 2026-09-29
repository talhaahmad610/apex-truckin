import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock3, UserRound } from "lucide-react";
import { getPostBySlug, getPosts, getRelatedPosts, getSiteContent, getSiteSettings } from "@/lib/cms";
import { articleLd, breadcrumbLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl, buildToc, formatDate } from "@/lib/utils";
import { skipStaticGeneration } from "@/lib/build-flags";
import { BlogCard } from "@/components/ui/BlogCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { TableOfContents } from "@/components/ui/TableOfContents";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { CTABannerSection } from "@/components/sections/CTABannerSection";
import { PreviewBanner } from "@/components/layout/PreviewBanner";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  if (skipStaticGeneration) return [];
  const { posts } = await getPosts({ limit: 100 });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const post = await getPostBySlug(slug, { draft });
  if (!post) return { title: "Article not found", robots: { index: false } };
  return pageMetadata({
    title: post.meta_title || post.title,
    description: post.meta_description ?? post.excerpt ?? post.title,
    path: `/blog/${post.slug}`,
    image: post.cover_image_url ?? undefined,
    type: "article",
    publishedTime: post.published_at,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { isEnabled: draft } = await draftMode();
  const post = await getPostBySlug(slug, { draft });
  if (!post) notFound();
  // HTML is generated server-side from the CMS rich-text JSON (text escaped, URLs sanitized).
  const { html, toc } = buildToc(post.content ?? "");
  const [related, site, content] = await Promise.all([getRelatedPosts(post, 3), getSiteSettings(), getSiteContent()]);
  const url = absoluteUrl(`/blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={[
          articleLd(post, site),
          breadcrumbLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <article>
        <header className="relative isolate flex min-h-[80dvh] items-end overflow-hidden pb-16 pt-40">
          {post.cover_image_url && (
            <Image src={post.cover_image_url} alt={post.cover_alt ?? ""} fill priority sizes="100vw" className="-z-20 object-cover" />
          )}
          <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(0deg,#0a0a0f_5%,rgba(10,10,15,0.75)_50%,rgba(10,10,15,0.5)_100%)]" />
          <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-8">
            <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/60 hover:text-amber">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} /> All insights
            </Link>
            <p className="mb-5">
              <Link
                href="/blog"
                className="rounded-full border border-line bg-black/40 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber"
              >
                {post.category}
              </Link>
            </p>
            <h1 className="font-display text-[clamp(2.5rem,6.5vw,5.75rem)] font-bold uppercase leading-[0.9] text-balance">{post.title}</h1>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <UserRound className="h-4 w-4 text-amber" strokeWidth={1.25} /> {post.author}
              </li>
              <li className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-amber" strokeWidth={1.25} />
                <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
              </li>
              <li className="flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-amber" strokeWidth={1.25} /> {post.read_time} min read
              </li>
            </ul>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1100px] gap-12 px-4 py-16 sm:px-8 lg:grid-cols-[1fr_240px] lg:gap-16">
          <div>
            {post.excerpt && <p className="mb-10 text-xl leading-relaxed text-white/85">{post.excerpt}</p>}
            <div className="prose-apex" dangerouslySetInnerHTML={{ __html: html }} />
            <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">Share this article</p>
              <ShareButtons url={url} title={post.title} />
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-10">
              <TableOfContents items={toc} />
              <div className="rounded-2xl border border-line bg-amber/[0.04] p-5">
                <p className="font-display text-xl font-bold uppercase">{content.blogSidebar.heading}</p>
                <p className="mt-2 text-sm text-muted">{content.blogSidebar.body}</p>
                <Link href={content.blogSidebar.cta.href || "/contact"} className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.18em] text-amber hover:underline">
                  {content.blogSidebar.cta.label || "Talk to dispatch"} →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <RevealWrapper as="section" className="border-t border-white/5 py-24" aria-label="Related articles">
          <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
            <h2 data-reveal="up" className="mb-10 font-display text-4xl font-bold uppercase md:text-5xl">
              Keep <span className="text-gradient">reading</span>
            </h2>
            <ul data-stagger-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.id} data-stagger>
                  <BlogCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </RevealWrapper>
      )}
      <CTABannerSection />
      <PreviewBanner path={`/blog/${post.slug}`} />
    </>
  );
}
