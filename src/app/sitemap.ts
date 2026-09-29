import type { MetadataRoute } from "next";
import { getPosts, getPublishedPages, getServices } from "@/lib/cms";
import { absoluteUrl } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [{ posts }, SERVICES, pages] = await Promise.all([getPosts({ limit: 1000 }), getServices(), getPublishedPages()]);

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...pages
      .filter((p) => p.showInSitemap)
      .map((p) => ({
        url: `${SITE_URL}/${p.slug}`,
        lastModified: new Date(p.updatedAt),
        changeFrequency: p.changeFrequency,
        priority: p.sitemapPriority,
      })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [absoluteUrl(s.image)],
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(p.cover_image_url ? { images: [absoluteUrl(p.cover_image_url)] } : {}),
    })),
  ];
}
