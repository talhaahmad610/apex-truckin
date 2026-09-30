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
  // Reject unset values and anything short enough or shaped like an unfilled-in placeholder
  // (`.env.example`'s "replace_with_..." doesn't start with the old "your_" check, so a deployment
  // that forgot to fill it in would otherwise ship a real, guessable key).
  if (!expected || !got || expected.length < 32 || /^(your_|replace_with)/.test(expected)) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(got);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Same-site path only — never redirect/revalidate to another origin (open-redirect guard). Blocks
 * a leading `//` or backslash (browsers turn `/\evil.com` and `//evil.com` into a scheme-relative
 * URL), and any control character (tab/CR/LF get stripped by URL parsers, which can turn
 * `/%09/evil.com` into `//evil.com` after that stripping) or whitespace.
 */
export function safePath(p: string | null): string | null {
  if (!p || !p.startsWith("/") || p.startsWith("//") || p.includes("\\")) return null;
  if (/[\u0000-\u001f\u007f\s]/.test(p)) return null;
  return p;
}

export async function readJson(req: NextRequest): Promise<{ ok: true; body: unknown } | { ok: false }> {
  try {
    return { ok: true, body: await req.json() };
  } catch {
    return { ok: false };
  }
}

/**
 * The client's own X-Forwarded-For / X-Real-IP headers are attacker-controlled unless a trusted
 * reverse proxy strips and re-sets them — Next's standalone server exposes no raw socket address
 * on NextRequest, so without a trusted proxy in front there is no honest per-IP key at all. Set
 * TRUST_PROXY=1 on a server that puts one in front (Caddy `reverse_proxy` / nginx with
 * `proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for` both APPEND the real client to the
 * header, so the RIGHTMOST entry — the hop the proxy itself added — is the one to trust; anything
 * to its left was supplied by the client and is not trustworthy). Leave it unset locally and on any
 * deployment without a trusted proxy: rateLimit then ignores the headers entirely and falls back to
 * one bucket shared by every caller of that endpoint, still capped at the endpoint's own `limit` —
 * stricter than isolating by (spoofable) IP would be, but it can't be bypassed by forging a header.
 */
function clientKey(req: NextRequest): string {
  if (process.env.TRUST_PROXY !== "1") return "global";
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((h) => h.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1]!;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

/* Tiny fixed-window rate limiter (per instance). Good enough to blunt form spam. */
const buckets = new Map<string, { count: number; reset: number }>();
const MAX_BUCKETS = 2000;

function evictIfNeeded(now: number) {
  if (buckets.size <= MAX_BUCKETS) return;
  for (const [id, b] of buckets) if (b.reset < now) buckets.delete(id);
  if (buckets.size <= MAX_BUCKETS) return;
  // Still over the cap after clearing expired entries (e.g. a flood of distinct global/no-proxy
  // keys, which can't happen today but costs nothing to guard) — drop the oldest by insertion order.
  for (const id of buckets.keys()) {
    if (buckets.size <= MAX_BUCKETS) break;
    buckets.delete(id);
  }
}

/**
 * `limit` applies per client key (see clientKey) when TRUST_PROXY is set; without a trusted proxy
 * every caller of this `key` shares one bucket, still capped at the same `limit` — see clientKey.
 */
export function rateLimit(req: NextRequest, key: string, limit = 5, windowMs = 60_000): boolean {
  const client = clientKey(req);
  const id = `${key}:${client}`;
  const now = Date.now();
  evictIfNeeded(now);
  const b = buckets.get(id);
  if (!b || b.reset < now) {
    buckets.set(id, { count: 1, reset: now + windowMs });
    return true;
  }
  b.count += 1;
  return b.count <= limit;
}

export const PG_UNIQUE_VIOLATION = "23505";
