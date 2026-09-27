import type { NextRequest } from "next/server";
import { getPosts, postFromDoc } from "@/lib/cms";
import { getPayloadClient } from "@/lib/payload";
import { canWritePosts, toPostData } from "@/lib/posts-api";
import { postCreateSchema } from "@/lib/schemas";
import { error, json, readJson, zodDetails } from "@/lib/http";

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

/** POST /api/posts — create a post (HTML `content` is converted to the CMS rich-text format).
 *  Auth: `Authorization: users API-Key <key>` or the legacy `x-api-key`. */
export async function POST(req: NextRequest) {
  const payload = await getPayloadClient();
  if (!(await canWritePosts(req, payload))) return error(401, "Unauthorized — send a Payload user API key or the x-api-key header");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = postCreateSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));

  const input = result.data;
  if (!input.content) return error(422, "Validation failed", [{ field: "content", message: "content is required" }]);
  // Same defaults as the old API: published, category "General".
  const { data, cover } = await toPostData(payload, { category: "General", is_published: true, ...input });
  if (!cover.ok) return error(422, "Validation failed", [{ field: "cover_image_url", message: cover.message }]);

  const slug = String(data.slug ?? "");
  if (slug) {
    const taken = await payload.count({ collection: "posts", where: { slug: { equals: slug } }, overrideAccess: true });
    if (taken.totalDocs) return error(409, `A post with slug "${slug}" already exists`);
  }
  try {
    const doc = await payload.create({
      collection: "posts",
      data: { slug: "", ...data } as never,
      draft: data._status !== "published",
      overrideAccess: true,
      depth: 1,
    });
    return json({ data: postFromDoc(doc) }, 201, { Location: `/api/posts/${doc.slug}` });
  } catch (err) {
    const e = err as { name?: string; message?: string };
    if (e.name === "ValidationError") {
      // A race on the unique slug surfaces here too; everything else is a real validation failure.
      const slugClash = /slug/i.test(e.message ?? "");
      return error(slugClash ? 409 : 422, e.message ?? "Validation failed");
    }
    console.error("[api/posts] create failed", err);
    return error(500, "Failed to create post");
  }
}
