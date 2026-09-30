import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/payload";
import { error, safePath } from "@/lib/http";

export const dynamic = "force-dynamic";

/**
 * GET /api/preview?path=/blog/some-post — enables Next draft mode so the page renders the latest
 * unpublished CMS version. Only for signed-in admins (checked against the Payload session).
 */
export async function GET(req: NextRequest) {
  const path = safePath(req.nextUrl.searchParams.get("path"));
  if (!path) return error(400, "Invalid preview path");
  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) return error(401, "Sign in to the admin to preview drafts");
  (await draftMode()).enable();
  redirect(path);
}
