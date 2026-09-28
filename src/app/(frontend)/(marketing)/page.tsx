import { draftMode } from "next/headers";
import { getHomePage, getSiteSettings, mediaUrl } from "@/lib/cms";
import { pageMetadata } from "@/lib/seo";
import { fillTokens } from "@/lib/tokens";
import { RenderBlocks } from "@/components/blocks/RenderBlocks";
import { PreviewBanner } from "@/components/layout/PreviewBanner";

export const revalidate = 300;

export async function generateMetadata() {
  const [{ isEnabled: draft }, site] = await Promise.all([draftMode(), getSiteSettings()]);
  const home = await getHomePage({ draft });
  return pageMetadata({
    // Root layout's title template appends "| Apex Truckin" — don't repeat the brand here.
    title: fillTokens(home.meta?.title || "Truck Dispatch Services for Owner-Operators & Fleets", site),
    description: fillTokens(
      home.meta?.description ||
        "24/7 truck dispatch for owner-operators and fleets: dry van, flatbed, reefer, hotshot, step deck, power only and box truck. Higher-paying loads, no forced dispatch, all 48 states.",
      site,
    ),
    path: "/",
    image: mediaUrl(home.meta?.image) || undefined,
    canonical: home.meta?.canonical || undefined,
    noIndex: home.meta?.noIndex ?? false,
  });
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode();
  const home = await getHomePage({ draft });
  return (
    <>
      <RenderBlocks blocks={home.layout} ctx={{ path: "/", title: "Home" }} />
      <PreviewBanner path="/" />
    </>
  );
}
