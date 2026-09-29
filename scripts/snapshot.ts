/**
 * Exports/imports a mirror of EVERY object in the MinIO/S3 bucket (no prefix filter — CMS images,
 * and once anything's uploaded through the admin, hero-footage outputs under `flight/` and the
 * private `raw/` originals too, so "Reprocess" keeps working after a restore) to/from
 * `snapshot/media/` + a manifest, so locally-uploaded content can be committed to the repo and
 * restored on another machine. Pairs with `scripts/db-restore.sh` (the Postgres half, which
 * excludes credentials/PII — see scripts/db-export.sh) — see README "Run it in Docker".
 *
 * Usage: npm run snapshot:export / npm run snapshot:import (via `payload run`, which loads env).
 */
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { dirname, join } from "node:path";
import type { Readable } from "node:stream";
import {
  CreateBucketCommand,
  GetObjectCommand,
  HeadBucketCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  PutBucketPolicyCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const bucket = process.env.S3_BUCKET || "apex-media";
const SNAPSHOT_DIR = "snapshot";
const MEDIA_DIR = join(SNAPSHOT_DIR, "media");
const MANIFEST_PATH = join(SNAPSHOT_DIR, "media.manifest.json");
const POLICY_PATH = "infra/minio-bucket-policy.json";

interface ManifestEntry {
  key: string;
  size: number;
  contentType?: string;
  cacheControl?: string;
}

const client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

async function exportSnapshot() {
  await mkdir(MEDIA_DIR, { recursive: true });
  const manifest: ManifestEntry[] = [];
  let continuationToken: string | undefined;

  do {
    const page = await client.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: continuationToken }));
    for (const obj of page.Contents ?? []) {
      if (!obj.Key) continue;
      const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: obj.Key }));
      const destPath = join(MEDIA_DIR, obj.Key);
      await mkdir(dirname(destPath), { recursive: true });
      await pipeline(res.Body as Readable, createWriteStream(destPath));
      manifest.push({
        key: obj.Key,
        size: obj.Size ?? 0,
        contentType: res.ContentType,
        cacheControl: res.CacheControl,
      });
    }
    continuationToken = page.NextContinuationToken;
  } while (continuationToken);

  await writeFile(MANIFEST_PATH, `${JSON.stringify({ generated: new Date().toISOString(), bucket, objects: manifest }, null, 2)}\n`);
  console.log(`[snapshot] exported ${manifest.length} objects → ${MEDIA_DIR}/ (+ manifest)`);
}

/** Best-effort — a real deployment's S3 endpoint is administered separately (the lead dev's own
 *  MinIO/S3), so a refusal here is expected there and only logged, never fatal. */
async function ensureBucketAndPolicy() {
  const exists = await client
    .send(new HeadBucketCommand({ Bucket: bucket }))
    .then(() => true)
    .catch(() => false);
  if (!exists) {
    try {
      await client.send(new CreateBucketCommand({ Bucket: bucket }));
      console.log(`[snapshot] created bucket "${bucket}"`);
    } catch (err) {
      console.warn(`[snapshot] could not create bucket "${bucket}" — ${(err as Error).message}`);
    }
  }
  try {
    const policy = (await readFile(POLICY_PATH, "utf8")).replaceAll("__BUCKET__", bucket);
    await client.send(new PutBucketPolicyCommand({ Bucket: bucket, Policy: policy }));
    console.log(`[snapshot] applied bucket policy from ${POLICY_PATH}`);
  } catch (err) {
    console.warn(
      `[snapshot] could not set the bucket policy on this endpoint (normal if this isn't our own MinIO — ` +
        `apply ${POLICY_PATH} on the target S3 endpoint yourself). Reason: ${(err as Error).message}`,
    );
  }
}

async function importSnapshot() {
  const manifestRaw = await readFile(MANIFEST_PATH, "utf8").catch(() => null);
  if (!manifestRaw) {
    console.log(`[snapshot] no ${MANIFEST_PATH} — nothing to import`);
    return;
  }
  await ensureBucketAndPolicy();

  const { objects } = JSON.parse(manifestRaw) as { objects: ManifestEntry[] };
  let imported = 0;
  for (const entry of objects) {
    const exists = await client
      .send(new HeadObjectCommand({ Bucket: bucket, Key: entry.key }))
      .then(() => true)
      .catch(() => false);
    if (exists) continue;
    const body = await readFile(join(MEDIA_DIR, entry.key));
    await client.send(
      new PutObjectCommand({ Bucket: bucket, Key: entry.key, Body: body, ContentType: entry.contentType, CacheControl: entry.cacheControl }),
    );
    imported++;
  }
  console.log(`[snapshot] imported ${imported} of ${objects.length} objects (rest already present)`);
}

const action = process.argv[2];
if (action === "export") await exportSnapshot();
else if (action === "import") await importSnapshot();
else {
  console.error("Usage: npm run snapshot:export | npm run snapshot:import");
  process.exit(1);
}
process.exit(0);
