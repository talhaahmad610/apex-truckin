import Image from "next/image";
import { PILLARS } from "@/lib/constants";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ParallaxImage } from "@/components/3d/ParallaxImage";

export function AboutSection() {
  return (
    <RevealWrapper as="section" id="about" className="relative isolate overflow-hidden py-28 md:py-44">
      <ParallaxImage className="-z-20">
        <Image src="/images/about-highway.webp" alt="" fill sizes="100vw" className="object-cover" />
      </ParallaxImage>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,10,15,0.96)_0%,rgba(10,10,15,0.82)_50%,rgba(10,10,15,0.55)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-bg to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionLabel n="—" label="Why Apex" />
          <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.75rem,6.5vw,5.75rem)] font-bold uppercase leading-[0.9]">
            Your freight. <span className="text-gradient">Our responsibility.</span>
          </h2>
          <p data-reveal="up" className="mt-7 max-w-md text-lg leading-relaxed text-white/75">
            We&apos;re dispatchers who&apos;ve sat in the driver&apos;s seat. Every load we book is one we&apos;d haul ourselves —
            fair rate, clean broker, realistic appointment.
          </p>
          <div data-reveal="up" className="mt-9">
            <Button href="/about" variant="ghost">Our Story</Button>
          </div>
        </div>

        <ol data-stagger-group className="grid gap-4 lg:col-span-7 lg:pl-8">
          {PILLARS.map((p, i) => (
            <li key={p.n} data-stagger style={{ marginLeft: `${i * 6}%` }} className="max-lg:!ml-0">
              <div className="bezel">
                <div className="bezel-core grid grid-cols-[auto_1fr] items-start gap-6 p-7 md:p-8">
                  <span className="font-display text-5xl font-bold leading-none text-gradient">{p.n}</span>
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-wide">{p.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </RevealWrapper>
  );
}
