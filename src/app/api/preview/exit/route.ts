import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/** GET /api/preview/exit?path=/blog/some-post — leave draft mode and return to the live page. */
export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const p = req.nextUrl.searchParams.get("path");
  redirect(p && p.startsWith("/") && !p.startsWith("//") && !p.includes("\\") ? p : "/");
}
