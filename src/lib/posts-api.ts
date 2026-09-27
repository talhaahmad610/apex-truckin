import "server-only";
import type { NextRequest } from "next/server";
import type { Payload } from "payload";
import { isAuthorized } from "./http";
import { htmlToLexical } from "@/payload/htmlToLexical";
import type { PostCreateInput } from "./schemas";

/**
 * Write access for the legacy /api/posts endpoints:
 *  - a Payload user API key (`Authorization: users API-Key <key>`), or
 *  - the transitional shared `x-api-key` (BLOG_API_KEY).
 */
export async function canWritePosts(req: NextRequest, payload: Payload): Promise<boolean> {
  if (isAuthorized(req)) return true;
  if (!req.headers.get("authorization")) return false;
  const { user } = await payload.auth({ headers: req.headers });
  return Boolean(user);
}

async function categoryId(payload: Payload, name: string): Promise<number> {
  const found = await payload.find({ collection: "categories", where: { name: { equals: name } }, limit: 1, depth: 0, overrideAccess: true });
  if (found.docs[0]) return found.docs[0].id;
  const created = await payload.create({ collection: "categories", data: { name, slug: "" }, overrideAccess: true });
  return created.id;
}

/** Match `cover_image_url` to an already-uploaded media item by URL or filename. */
async function coverId(payload: Payload, url: string): Promise<number | null> {
  const filename = decodeURIComponent(url.split("?")[0]!.split("/").pop() || "");
  const found = await payload.find({
    collection: "media",
    where: { or: [{ url: { equals: url } }, ...(filename ? [{ filename: { equals: filename } }] : [])] },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return found.docs[0]?.id ?? null;
}

export type CoverResult = { ok: true; id: number | null } | { ok: false; message: string };

/** Map the legacy snake_case API body onto Payload post fields. */
export async function toPostData(payload: Payload, input: Partial<PostCreateInput>) {
  const data: Record<string, unknown> = {};
  if (input.title !== undefined) data.title = input.title;
  if (input.slug !== undefined) data.slug = input.slug;
  if (input.excerpt !== undefined) data.excerpt = input.excerpt;
  if (input.content !== undefined) data.content = input.content ? await htmlToLexical(payload, input.content) : null;
  if (input.author !== undefined) data.author = input.author;
  if (input.published_at !== undefined) data.publishedAt = input.published_at;
  if (input.meta_description !== undefined) data.metaDescription = input.meta_description;
  if (input.category !== undefined) data.category = await categoryId(payload, input.category);
  if (input.is_published !== undefined) data._status = input.is_published ? "published" : "draft";

  let cover: CoverResult = { ok: true, id: null };
  if (input.cover_image_url) {
    const id = await coverId(payload, input.cover_image_url);
    cover = id
      ? { ok: true, id }
      : { ok: false, message: "cover_image_url must point to an image already uploaded to the CMS (POST /cms-api/media)" };
    if (id) data.cover = id;
  } else if (input.cover_image_url === null) {
    data.cover = null;
  }
  return { data, cover };
}
