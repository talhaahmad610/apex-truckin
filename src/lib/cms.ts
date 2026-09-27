import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Post } from "@/types";
import type { Category as CmsCategory, Media as CmsMedia, Post as CmsPost } from "@/payload-types";
import { getPayloadClient } from "./payload";
import { richTextToHtml } from "./richtext";

/* ───────────────────────── helpers ───────────────────────── */

const isObj = <T extends object>(v: unknown): v is T => typeof v === "object" && v !== null;

export function postFromDoc(d: CmsPost): Post {
  const cover = isObj<CmsMedia>(d.cover) ? d.cover : null;
  const category = isObj<CmsCategory>(d.category) ? d.category.name : "";
  return {
    id: String(d.id),
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt ?? null,
    content: richTextToHtml(d.content),
    cover_image_url: cover?.url ?? null,
    cover_alt: cover?.alt ?? null,
    published_at: d.publishedAt ?? d.createdAt,
    category,
    author: d.author || "Apex Truckin Team",
    read_time: d.readTime ?? 1,
    meta_title: d.metaTitle ?? null,
    meta_description: d.metaDescription ?? null,
    is_published: d._status === "published",
    created_at: d.createdAt,
    updated_at: d.updatedAt,
  };
}

/* ───────────────────────── posts ───────────────────────── */

export interface PostQuery {
  category?: string | null;
  limit?: number;
  offset?: number;
}

const fetchPosts = unstable_cache(
  async ({ category, limit = 50, offset = 0 }: PostQuery): Promise<{ posts: Post[]; total: number }> => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "posts",
      where: {
        and: [{ _status: { equals: "published" } }, ...(category ? [{ "category.name": { equals: category } }] : [])],
      },
      sort: "-publishedAt",
      limit,
      page: Math.floor(offset / limit) + 1,
      depth: 1,
      overrideAccess: true,
    });
    return { posts: res.docs.map(postFromDoc), total: res.totalDocs };
  },
  ["cms:posts"],
  { tags: ["posts"], revalidate: 3600 },
);

export const getPosts = (q: PostQuery = {}) => fetchPosts(q);

const fetchPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | null> => {
    const payload = await getPayloadClient();
    const res = await payload.find({
      collection: "posts",
      where: { and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }] },
      limit: 1,
      depth: 1,
      overrideAccess: true,
    });
    return res.docs[0] ? postFromDoc(res.docs[0]) : null;
  },
  ["cms:post-by-slug"],
  { tags: ["posts"], revalidate: 3600 },
);

/** `draft: true` (preview mode only) reads the latest unpublished version, uncached. */
export const getPostBySlug = cache(async (slug: string, { draft = false }: { draft?: boolean } = {}): Promise<Post | null> => {
  if (!draft) return fetchPostBySlug(slug);
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    draft: true,
    limit: 1,
    depth: 1,
    overrideAccess: true,
  });
  return res.docs[0] ? postFromDoc(res.docs[0]) : null;
});

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const { posts } = await getPosts({ limit });
  return posts;
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const { posts } = await getPosts({ limit: 20 });
  const same = posts.filter((p) => p.slug !== post.slug && p.category === post.category);
  const rest = posts.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...same, ...rest].slice(0, limit);
}

/* ───────────────────────── categories ───────────────────────── */

export const getCategories = unstable_cache(
  async (): Promise<string[]> => {
    const payload = await getPayloadClient();
    const res = await payload.find({ collection: "categories", sort: "order", limit: 100, depth: 0, overrideAccess: true });
    return res.docs.map((c) => c.name);
  },
  ["cms:categories"],
  { tags: ["categories", "posts"], revalidate: 3600 },
);
