import "server-only";
import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import type { ZodError } from "zod";

export const json = <T>(data: T, status = 200, headers?: HeadersInit) => NextResponse.json(data, { status, headers });

export const error = (status: number, message: string, details?: unknown) =>
  NextResponse.json({ error: message, ...(details !== undefined ? { details } : {}) }, { status });

export const zodDetails = (e: ZodError) =>
  e.issues.map((i) => ({ field: i.path.join("."), message: i.message }));

/** Constant-time check of the `x-api-key` header against BLOG_API_KEY. */
export function isAuthorized(req: NextRequest): boolean {
  const expected = process.env.BLOG_API_KEY;
  const got = req.headers.get("x-api-key");
  if (!expected || expected.startsWith("your_") || !got) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function readJson(req: NextRequest): Promise<{ ok: true; body: unknown } | { ok: false }> {
  try {
    return { ok: true, body: await req.json() };
  } catch {
    return { ok: false };
  }
}

/* Tiny fixed-window rate limiter (per instance). Good enough to blunt form spam. */
const buckets = new Map<string, { count: number; reset: number }>();
export function rateLimit(req: NextRequest, key: string, limit = 5, windowMs = 60_000): boolean {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip") ?? "local";
  const id = `${key}:${ip}`;
  const now = Date.now();
  const b = buckets.get(id);
  if (!b || b.reset < now) {
    buckets.set(id, { count: 1, reset: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

export const PG_UNIQUE_VIOLATION = "23505";
