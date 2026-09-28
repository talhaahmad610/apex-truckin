import Image from "next/image";
import { Check } from "lucide-react";
import type { Service } from "@/types";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/3d/TiltCard";

export function ServicesGridSection({ services }: { services: Service[] }) {
  return (
    <RevealWrapper as="section" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-8">
        <ul data-stagger-group className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <li key={s.slug} data-stagger className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <TiltCard className="h-full rounded-[2rem]" max={6}>
                <article className="bezel h-full">
                  <div className="bezel-core flex h-full flex-col overflow-hidden">
                    <div className={`relative overflow-hidden ${i < 2 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                      <Image src={s.image} alt={s.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0f1117] to-transparent" />
                      <span className="absolute left-5 top-5 font-display text-sm font-semibold tracking-[0.3em] text-amber">0{i + 1}</span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <h2 className="font-display text-4xl font-bold uppercase">{s.name}</h2>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-amber">{s.tagline}</p>
                      <p className="mt-4 text-sm leading-relaxed text-muted">{s.description}</p>
                      <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
                        <div>
                          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">What&apos;s included</h3>
                          <ul className="space-y-2">
                            {s.included.slice(0, 3).map((x) => (
                              <li key={x} className="flex gap-2 text-sm text-white/80">
                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber" strokeWidth={1.5} /> {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Equipment</h3>
                          <ul className="space-y-2">
                            {s.requirements.slice(0, 3).map((x) => (
                              <li key={x} className="flex gap-2 text-sm text-white/80">
                                <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-amber" /> {x}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-auto pt-8">
                        <Button href={`/services/${s.slug}`} variant="ghost">{s.name} Dispatch</Button>
                      </div>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </RevealWrapper>
  );
}
