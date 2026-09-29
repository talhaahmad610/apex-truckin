import { Clock3 } from "lucide-react";
import { getEquipmentTypes } from "@/lib/cms";
import type { SiteInfo } from "@/types";
import { ContactMethods, MapEmbed } from "@/components/sections/ContactSection";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LiveDot } from "@/components/ui/Card";
import { GradientHeading } from "./GradientHeading";
import { fillTokens } from "@/lib/tokens";

export async function ContactBlockSection({
  n,
  label = "Contact",
  heading,
  highlight,
  intro,
  formHeading = "Start dispatching",
  statusLine,
  replyNote,
  methodsLabel = "Message a dispatcher",
  style,
  site,
}: {
  n?: string;
  label?: string;
  heading?: string | null;
  highlight?: string | null;
  intro?: string | null;
  formHeading?: string | null;
  statusLine?: string | null;
  replyNote?: string | null;
  methodsLabel?: string | null;
  style: "section" | "page";
  site: SiteInfo;
}) {
  const equipmentTypes = await getEquipmentTypes();

  if (style === "page") {
    return (
      <RevealWrapper as="section" className="pb-24 md:pb-36">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-4 sm:px-8 lg:grid-cols-12">
          <div data-reveal="up" className="lg:col-span-7">
            <div className="bezel">
              <div className="bezel-core p-6 sm:p-10">
                {formHeading && <h2 className="mb-8 font-display text-4xl font-bold uppercase">{fillTokens(formHeading, site)}</h2>}
                <ContactForm equipmentTypes={equipmentTypes} />
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:col-span-5">
            <div data-reveal="up">
              <ContactMethods whatsappLabel={methodsLabel ?? undefined} />
            </div>
            <div data-reveal="up" className="bezel">
              <div className="bezel-core p-7">
                <p className="mb-5 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">
                  <LiveDot /> Business hours
                </p>
                <dl className="divide-y divide-white/10">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 py-3 text-sm">
                      <dt className="text-white/70">{h.days}</dt>
                      <dd className="font-medium text-white">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <div data-reveal="up">
              <MapEmbed />
            </div>
          </div>
        </div>
      </RevealWrapper>
    );
  }

  return (
    <RevealWrapper as="section" id="contact" className="relative py-24 md:py-40">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel n={n} label={label} />
          {heading && (
            <GradientHeading
              as="h2"
              data-reveal="up"
              className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.92]"
              heading={heading}
              highlight={highlight}
              site={site}
            />
          )}
          {intro && (
            <p data-reveal="up" className="mt-5 max-w-md text-muted">
              {fillTokens(intro, site)}
            </p>
          )}
          {statusLine && (
            <p data-reveal="up" className="mt-6 inline-flex items-center gap-2.5 text-sm text-white/80">
              <LiveDot /> {statusLine}
              {replyNote && (
                <>
                  <Clock3 className="ml-2 h-4 w-4 text-white/40" strokeWidth={1.25} />
                  <span className="text-white/50">{replyNote}</span>
                </>
              )}
            </p>
          )}
          <div data-reveal="up" className="mt-8">
            <ContactMethods whatsappLabel={methodsLabel ?? undefined} />
          </div>
          <div data-reveal="up" className="mt-6">
            <MapEmbed />
          </div>
        </div>
        <div data-reveal="up" className="lg:col-span-7">
          <div className="bezel">
            <div className="bezel-core relative p-6 sm:p-10">
              <ContactForm equipmentTypes={equipmentTypes} />
            </div>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}
