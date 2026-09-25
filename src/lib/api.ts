import "server-only";
import { cache } from "react";
import type { Post, Testimonial } from "@/types";
import { createServerSupabase } from "./supabase";
import { SEED_POSTS, SEED_TESTIMONIALS } from "./seed-data";

export interface PostQuery {
  category?: string | null;
  limit?: number;
  offset?: number;
}

const byDateDesc = (a: Post, b: Post) => +new Date(b.published_at) - +new Date(a.published_at);

export async function getPosts({ category, limit = 50, offset = 0 }: PostQuery = {}): Promise<{ posts: Post[]; total: number }> {
  const sb = createServerSupabase();
  if (sb) {
    let q = sb
      .from("posts")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .range(offset, offset + limit - 1);
    if (category) q = q.eq("category", category);
    const { data, error, count } = await q;
    if (!error && data) return { posts: data as Post[], total: count ?? data.length };
    console.error("[api] getPosts failed, using seed data:", error?.message);
  }
  const all = SEED_POSTS.filter((p) => p.is_published && (!category || p.category === category)).sort(byDateDesc);
  return { posts: all.slice(offset, offset + limit), total: all.length };
}

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const sb = createServerSupabase();
  if (sb) {
    const { data, error } = await sb.from("posts").select("*").eq("slug", slug).eq("is_published", true).maybeSingle();
    if (!error) return (data as Post | null) ?? null;
    console.error("[api] getPostBySlug failed, using seed data:", error.message);
  }
  return SEED_POSTS.find((p) => p.slug === slug && p.is_published) ?? null;
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

export async function getTestimonials(): Promise<Testimonial[]> {
  const sb = createServerSupabase();
  if (sb) {
    const { data, error } = await sb
      .from("testimonials")
      .select("*")
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (!error && data) return data as Testimonial[];
    console.error("[api] getTestimonials failed, using seed data:", error?.message);
  }
  return SEED_TESTIMONIALS;
}
