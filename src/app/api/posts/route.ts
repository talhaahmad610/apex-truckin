import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { getPosts } from "@/lib/api";
import { createAdminSupabase } from "@/lib/supabase";
import { postCreateSchema } from "@/lib/schemas";
import { PG_UNIQUE_VIOLATION, error, isAuthorized, json, readJson, zodDetails } from "@/lib/http";
import { slugify } from "@/lib/utils";
import type { Post } from "@/types";

export const dynamic = "force-dynamic";

/** GET /api/posts?category=&limit=&offset= — published posts, newest first. */
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const limit = Number(sp.get("limit") ?? 10);
  const offset = Number(sp.get("offset") ?? 0);
  if (!Number.isInteger(limit) || limit < 1 || limit > 100) return error(400, "limit must be an integer between 1 and 100");
  if (!Number.isInteger(offset) || offset < 0) return error(400, "offset must be a non-negative integer");
  const category = sp.get("category");
  const { posts, total } = await getPosts({ category, limit, offset });
  return json({ data: posts, meta: { total, limit, offset, count: posts.length } });
}

/** POST /api/posts — create a post. Requires `x-api-key`. */
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) return error(401, "Unauthorized — missing or invalid x-api-key header");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = postCreateSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));

  const sb = createAdminSupabase();
  if (!sb) return error(503, "Supabase is not configured (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)");

  const input = result.data;
  const row = {
    ...input,
    slug: input.slug ?? slugify(input.title),
    read_time:
      input.read_time ?? Math.max(1, Math.round((input.content ?? "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220)),
  };

  const { data, error: dbError } = await sb.from("posts").insert(row).select().single();
  if (dbError) {
    if (dbError.code === PG_UNIQUE_VIOLATION) return error(409, `A post with slug "${row.slug}" already exists`);
    return error(500, "Failed to create post", dbError.message);
  }
  revalidatePath("/blog");
  revalidatePath("/");
  return json({ data: data as Post }, 201, { Location: `/api/posts/${(data as Post).slug}` });
}
