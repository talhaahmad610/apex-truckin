import { draftMode } from "next/headers";

/** Fixed bar shown only while an admin is previewing unpublished CMS content. */
export async function PreviewBanner({ path }: { path: string }) {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] flex items-center justify-center gap-4 bg-amber px-4 py-2.5 text-sm font-semibold text-bg">
      Preview mode — you&apos;re viewing unpublished changes.
      <a href={`/api/preview/exit?path=${encodeURIComponent(path)}`} className="rounded-full bg-bg px-3 py-1 text-xs text-amber">
        Exit preview
      </a>
    </div>
  );
}
