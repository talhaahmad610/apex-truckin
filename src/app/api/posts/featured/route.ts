import { getFeaturedPosts } from "@/lib/api";
import { json } from "@/lib/http";

export const revalidate = 300;

/** GET /api/posts/featured — latest 3 published posts (homepage). */
export async function GET() {
  const posts = await getFeaturedPosts(3);
  return json({ data: posts, meta: { count: posts.length } });
}
