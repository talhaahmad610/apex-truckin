/**
 * A thin S3/MinIO client for code that needs to read/write objects directly — the hero-video job
 * (download a raw upload, write processed outputs) and its cleanup hook. Payload's own uploads
 * (the `media` collection) go through `@payloadcms/storage-s3` instead; this is only for the parts
 * outside Payload's upload lifecycle.
 *
 * Uses the exact same env vars as the `s3Storage` plugin in `payload.config.ts` so the two never
 * point at different buckets.
 *
 * Deliberately no `import "server-only"`: this is reached from `FlightSources.ts`'s hooks, which
 * `payload.config.ts` loads eagerly — including under the `payload` CLI (migrate/generate/run),
 * which runs under plain Node without the `react-server` condition `server-only` requires to be a
 * no-op. It would otherwise throw on every Payload CLI command, not just in the browser.
 */
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import type { Readable } from "node:stream";

export const bucket = process.env.S3_BUCKET || "apex-media";

const publicOrigin = (process.env.S3_PUBLIC_URL || process.env.S3_ENDPOINT || "").replace(/\/$/, "");

export function publicUrl(key: string): string {
  return `${publicOrigin}/${bucket}/${key}`;
}

export const s3Client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
  },
});

/** Downloads an object straight to a local file (never buffers the whole video in memory). */
export async function downloadObjectToFile(key: string, destPath: string): Promise<void> {
  const res = await s3Client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  const body = res.Body as Readable | undefined;
  if (!body) throw new Error(`S3 object has no body: ${key}`);
  await pipeline(body, createWriteStream(destPath));
}

export async function uploadFile(key: string, body: Buffer, contentType: string, cacheControl: string): Promise<void> {
  await s3Client.send(
    new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: contentType, CacheControl: cacheControl }),
  );
}

/** Best-effort cleanup of a leg's processed outputs — never throws (caller logs and moves on). */
export async function deleteObjectsUnderPrefix(prefix: string): Promise<void> {
  const keys = [
    `${prefix}/desktop.mp4`,
    `${prefix}/mobile.mp4`,
    `${prefix}/poster.webp`,
    `${prefix}/poster-m.webp`,
  ];
  await s3Client.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: keys.map((Key) => ({ Key })) } }));
}
