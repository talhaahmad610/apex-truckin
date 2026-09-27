import { revalidatePath, revalidateTag } from "next/cache";
import type { PayloadRequest } from "payload";

/**
 * Purge cached site data after a CMS change. `expire: 0` (not "max") so the very next visit
 * after an editor hits Save renders fresh content instead of one stale copy.
 * Silently no-ops outside a Next.js request (e.g. `payload run` seed scripts) or when
 * `req.context.disableRevalidate` is set for bulk operations.
 */
export function revalidate(
  req: PayloadRequest | undefined,
  { tags = [], paths = [], everything = false }: { tags?: string[]; paths?: string[]; everything?: boolean },
) {
  if (req?.context?.disableRevalidate) return;
  try {
    for (const t of new Set(tags)) revalidateTag(t, { expire: 0 });
    for (const p of new Set(paths)) revalidatePath(p);
    // Site-wide content (header/footer/company details) appears on every page.
    if (everything) revalidatePath("/", "layout");
  } catch {
    // Not inside a Next.js server context — nothing is cached to purge.
  }
}
