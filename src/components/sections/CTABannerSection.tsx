import { getSiteSettings } from "@/lib/cms";
import { Button } from "@/components/ui/Button";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { DepthLayers } from "@/components/3d/DepthLayers";
import { CssTruck } from "@/components/3d/CssTruck";

export async function CTABannerSection({
  title = (
    <>
      Ready to keep your <span className="text-gradient">truck moving?</span>
    </>
  ),
  body = "Get a free lane review and your first load booked within 24 hours. No contracts. No forced dispatch.",
  truck = true,
  cta = { label: "Start Dispatching", href: "/contact" },
}: {
  title?: React.ReactNode;
  body?: string;
  truck?: boolean;
  cta?: { label?: string | null; href?: string | null };
}) {
  const COMPANY = await getSiteSettings();
  return (
    <RevealWrapper as="section" className="px-3 py-16 md:py-24">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] border border-line bg-[linear-gradient(135deg,#141726_0%,#0a0a0f_55%,#1d1208_100%)]">
        <DepthLayers intensity={0.5} />
        {truck && (
          <CssTruck className="absolute bottom-[18%] right-[8%] hidden h-0 w-0 [--truck-scale:0.55] lg:block xl:[--truck-scale:0.7]" />
        )}
        <div className="relative px-6 py-20 sm:px-12 md:py-28 lg:max-w-[62%] lg:px-16">
          <h2 data-reveal="up" className="font-display text-[clamp(2.75rem,7vw,6.5rem)] font-bold uppercase leading-[0.88]">
            {title}
          </h2>
          <p data-reveal="up" className="mt-6 max-w-lg text-lg text-white/75">{body}</p>
          <div data-reveal="up" className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={cta.href || "/contact"} size="lg">{cta.label || "Start Dispatching"}</Button>
            <a href={COMPANY.phoneHref} className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80 underline-offset-4 hover:text-amber hover:underline">
              or call {COMPANY.phone}
            </a>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}
