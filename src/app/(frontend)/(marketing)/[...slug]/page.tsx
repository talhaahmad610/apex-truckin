import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { getPageBySlug, getPublishedPages, getSiteSettings, mediaUrl } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { fillTokens } from "@/lib/tokens";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { PreviewBanner } from "@/components/layout/PreviewBanner";

type Props = { params: Promise<{ slug: string[] }> };

export const revalidate = 300;

// New pages published in the admin render on first request (and are then cached) instead of
// 404ing until the next build.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getPublishedPages()).map((p) => ({ slug: [p.slug] }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug.length !== 1) return { title: "Page not found", robots: { index: false } };
  const [{ isEnabled: draft }, site] = await Promise.all([draftMode(), getSiteSettings()]);
  const page = await getPageBySlug(slug[0]!, { draft });
  if (!page) return { title: "Page not found", robots: { index: false } };
  const hero = page.layout.find((b) => b.blockType === "pageHero");
  const description = page.meta?.description || (hero && "subtitle" in hero ? hero.subtitle : undefined) || "";
  return pageMetadata({
    title: fillTokens(page.meta?.title || page.title, site),
    description: fillTokens(description, site),
    path: `/${page.slug}`,
    image: mediaUrl(page.meta?.image) || undefined,
    canonical: page.meta?.canonical || undefined,
    noIndex: page.meta?.noIndex ?? false,
  });
}

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  if (slug.length !== 1) notFound();
  const { isEnabled: draft } = await draftMode();
  const page = await getPageBySlug(slug[0]!, { draft });
  if (!page) notFound();
  return (
    <>
      <RenderBlocks blocks={page.layout} ctx={{ path: `/${page.slug}`, title: page.title }} />
      <PreviewBanner path={`/${page.slug}`} />
    </>
  );
}
