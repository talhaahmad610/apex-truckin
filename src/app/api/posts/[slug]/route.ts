import type { NextRequest } from "next/server";
import { getPostBySlug, postFromDoc } from "@/lib/cms";
import { getPayloadClient } from "@/lib/payload";
import { canWritePosts, toPostData } from "@/lib/posts-api";
import { postUpdateSchema } from "@/lib/schemas";
import { error, json, readJson, zodDetails } from "@/lib/http";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

async function findBySlug(slug: string) {
  const payload = await getPayloadClient();
  const res = await payload.find({ collection: "posts", where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true });
  return { payload, doc: res.docs[0] ?? null };
}

/** GET /api/posts/:slug — published post. */
export async function GET(_req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return error(404, `Post "${slug}" not found`);
  return json({ data: post });
}

/** PUT /api/posts/:slug — partial update. Auth: Payload user API key or legacy `x-api-key`. */
export async function PUT(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const { payload, doc } = await findBySlug(slug);
  if (!(await canWritePosts(req, payload))) return error(401, "Unauthorized — send a Payload user API key or the x-api-key header");
  const parsed = await readJson(req);
  if (!parsed.ok) return error(400, "Request body must be valid JSON");
  const result = postUpdateSchema.safeParse(parsed.body);
  if (!result.success) return error(422, "Validation failed", zodDetails(result.error));
  if (!doc) return error(404, `Post "${slug}" not found`);

  const { data, cover } = await toPostData(payload, result.data);
  if (!cover.ok) return error(422, "Validation failed", [{ field: "cover_image_url", message: cover.message }]);
  if (typeof data.slug === "string" && data.slug !== slug) {
    const taken = await payload.count({ collection: "posts", where: { slug: { equals: data.slug } }, overrideAccess: true });
    if (taken.totalDocs) return error(409, "Another post already uses that slug");
  }
  try {
    const updated = await payload.update({
      collection: "posts",
      id: doc.id,
      data: data as never,
      // Only publish when explicitly asked; otherwise keep the post's current published/draft state.
      ...(data._status === "draft" ? { draft: true } : {}),
      overrideAccess: true,
      depth: 1,
    });
    return json({ data: postFromDoc(updated) });
  } catch (err) {
    console.error("[api/posts] update failed", err);
    return error(500, "Failed to update post");
  }
}

/** DELETE /api/posts/:slug — Auth: Payload user API key or legacy `x-api-key`. */
export async function DELETE(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const { payload, doc } = await findBySlug(slug);
  if (!(await canWritePosts(req, payload))) return error(401, "Unauthorized — send a Payload user API key or the x-api-key header");
  if (!doc) return error(404, `Post "${slug}" not found`);
  await payload.delete({ collection: "posts", id: doc.id, overrideAccess: true });
  return json({ data: { id: String(doc.id), slug }, message: `Post "${slug}" deleted` });
}
