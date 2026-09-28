import { richTextToHtml } from "@/lib/richtext";
import { fillTokens } from "@/lib/tokens";
import type { SiteInfo } from "@/types";
import { cn } from "@/lib/utils";

export function RichTextSection({ content, width, site }: { content: unknown; width?: "820" | "1100" | null; site: SiteInfo }) {
  const html = richTextToHtml(content);
  if (!html) return null;
  return (
    <section className="pb-24 md:pb-36">
      <div className={cn("prose-apex mx-auto px-4 sm:px-8", width === "1100" ? "max-w-[1100px]" : "max-w-[820px]")}>
        <div dangerouslySetInnerHTML={{ __html: fillTokens(html, site) }} />
      </div>
    </section>
  );
}
