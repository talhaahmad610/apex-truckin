import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { getPostBySlug } from "@/lib/api";
import { createAdminSupabase } from "@/lib/supabase";
import { postUpdateSchema } from "@/lib/schemas";
import { PG_UNIQUE_VIOLATION, error, isAuthorized, json, readJson, zodDetails } from "@/lib/http";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

/** GET /api/posts/:slug */
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return error(404, `Post "${slug}" not found`);
  return json({ data: post });
}

/** PUT /api/posts/:slug — partial update. Requires `x-api-key`. */
export async function PUT(req: NextRequest, { params }: Ctx) {
  if (!isAuthorized(req)) return error(401, "Unauthorized — missing or invalid x-api-key header");
  const { slug } = await params;
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = postUpdateSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));

  const sb = createAdminSupabase();
  if (!sb) return error(503, "Supabase is not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)");

  const { data, error: dbError } = await sb.from("posts").update(result.data).eq("slug", slug).select().maybeSingle();
  if (dbError) {
    if (dbError.code === PG_UNIQUE_VIOLATION) return error(409, "Another post already uses that slug");
    return error(500, "Failed to update post", dbError.message);
  }
  if (!data) return error(404, `Post "${slug}" not found`);
  const post = data as Post;
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  if (post.slug !== slug) revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  return json({ data: post });
}

/** DELETE /api/posts/:slug — Requires `x-api-key`. */
export async function DELETE(req: NextRequest, { params }: Ctx) {
  if (!isAuthorized(req)) return error(401, "Unauthorized — missing or invalid x-api-key header");
  const { slug } = await params;
  const sb = createAdminSupabase();
  if (!sb) return error(503, "Supabase is not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)");

  const { data, error: dbError } = await sb.from("posts").delete().eq("slug", slug).select("id, slug").maybeSingle();
  if (dbError) return error(500, "Failed to delete post", dbError.message);
  if (!data) return error(404, `Post "${slug}" not found`);
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  return json({ data, message: `Post "${slug}" deleted` });
}
