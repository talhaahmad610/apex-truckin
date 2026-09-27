/**
 * Seed the CMS with the site's current content. Idempotent — upserts by slug/filename, so it is
 * safe to re-run (it refreshes seeded documents to the values below and never duplicates).
 *
 *   npm run seed
 *
 * Runs through `payload run`, which loads .env.local and the Payload config.
 */
import path from "path";
import { getPayload, type Payload } from "payload";
import config from "../src/payload.config";
import { htmlToLexical } from "../src/payload/htmlToLexical";
import { SEED_POSTS } from "../src/lib/seed-data";

// A FRESH object per call: Payload hooks mutate req.context (the S3 plugin sets skipCloudStorage
// after an upload), so a shared object would make every later upload silently skip storage.
const ctx = () => ({ disableRevalidate: true });
const log = (...a: unknown[]) => console.log("[seed]", ...a);

async function ensureAdmin(payload: Payload) {
  const { totalDocs } = await payload.count({ collection: "users" });
  if (totalDocs) return log("admin user exists — skipped");
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password || password.startsWith("replace_with")) {
    throw new Error("No users yet: set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local (or create one at /admin).");
  }
  await payload.create({ collection: "users", data: { email, password, name: "Admin" }, context: ctx() });
  log(`created admin user ${email}`);
}

/** Upload a file from /public (once) and return its media id. Matches on the stored filename. */
const mediaCache = new Map<string, number>();
export async function ensureMedia(payload: Payload, publicPath: string, alt: string): Promise<number> {
  if (mediaCache.has(publicPath)) return mediaCache.get(publicPath)!;
  const base = path.basename(publicPath).replace(/\.(jpe?g|png|avif)$/i, ".webp"); // uploads are stored as webp
  const found = await payload.find({ collection: "media", where: { filename: { equals: base } }, limit: 1, depth: 0 });
  let id = found.docs[0]?.id;
  // Self-heal: a record whose file is missing from storage gets re-uploaded (file replaced in place).
  const reachable = found.docs[0]?.url ? (await fetch(found.docs[0].url, { method: "HEAD" }).catch(() => null))?.ok : false;
  if (id && reachable) {
    await payload.update({ collection: "media", id, data: { alt }, context: ctx() });
  } else if (id) {
    await payload.update({
      collection: "media",
      id,
      data: { alt },
      filePath: path.resolve(process.cwd(), "public", publicPath.replace(/^\//, "")),
      overwriteExistingFiles: true,
      context: ctx(),
    });
    log(`re-uploaded missing file ${publicPath} → media #${id}`);
  } else {
    const doc = await payload.create({
      collection: "media",
      data: { alt },
      filePath: path.resolve(process.cwd(), "public", publicPath.replace(/^\//, "")),
      context: ctx(),
    });
    id = doc.id;
    log(`uploaded ${publicPath} → media #${id}`);
  }
  mediaCache.set(publicPath, id);
  return id;
}

async function upsert(payload: Payload, collection: "categories" | "posts", where: Record<string, unknown>, data: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const found = await payload.find({ collection, where: where as never, limit: 1, depth: 0, draft: collection === "posts" });
  const existing = found.docs[0];
  if (existing) {
    await payload.update({ collection, id: existing.id, data: data as never, context: ctx(), ...extra });
    return existing.id;
  }
  const doc = await payload.create({ collection, data: data as never, context: ctx(), ...extra });
  return doc.id;
}

async function seedBlog(payload: Payload) {
  const categories = ["Dispatch Tips", "Industry News", "Owner-Operator", "Regulations"];
  const catIds = new Map<string, number>();
  for (const [order, name] of categories.entries()) {
    catIds.set(name, await upsert(payload, "categories", { name: { equals: name } }, { name, slug: "", order }));
  }
  log(`categories: ${categories.length}`);

  for (const p of SEED_POSTS) {
    const cover = p.cover_image_url ? await ensureMedia(payload, p.cover_image_url, p.title) : null;
    await upsert(
      payload,
      "posts",
      { slug: { equals: p.slug } },
      {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: await htmlToLexical(payload, p.content ?? ""),
        category: catIds.get(p.category),
        cover,
        author: p.author,
        publishedAt: p.published_at,
        metaDescription: p.meta_description,
        _status: p.is_published ? "published" : "draft",
      },
    );
  }
  log(`posts: ${SEED_POSTS.length}`);
}

const payload = await getPayload({ config });
await ensureAdmin(payload);
await seedBlog(payload);
log("done");
process.exit(0);
