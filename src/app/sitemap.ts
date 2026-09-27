import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/cms";
import { SERVICES } from "@/lib/constants";
import { SITE_URL } from "@/lib/seo";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/pricing", priority: 0.9, freq: "monthly" },
    { path: "/carriers", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "yearly" },
    { path: "/blog", priority: 0.8, freq: "weekly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
  ];
  const { posts } = await getPosts({ limit: 1000 });

  return [
    ...staticRoutes.map((r) => ({ url: `${SITE_URL}${r.path}`, lastModified: now, changeFrequency: r.freq, priority: r.priority })),
    ...SERVICES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
      images: [`${SITE_URL}${s.image}`],
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at ?? p.published_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(p.cover_image_url ? { images: [p.cover_image_url.startsWith("http") ? p.cover_image_url : `${SITE_URL}${p.cover_image_url}`] } : {}),
    })),
  ];
}
