import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { DepthLayers } from "@/components/3d/DepthLayers";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <DepthLayers />
        <div className="relative mx-auto max-w-[1320px] px-4 sm:px-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-amber">Error 404 · Wrong exit</p>
          <h1 className="mt-5 font-display text-[clamp(4rem,14vw,12rem)] font-bold uppercase leading-[0.84]">
            Off the <span className="text-gradient">route.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">This page took a detour. Let&apos;s get you back on the highway.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" size="lg">Back Home</Button>
            <Button href="/contact" size="lg" variant="ghost" icon={false}>Talk to Dispatch</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
