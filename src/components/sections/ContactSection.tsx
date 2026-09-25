import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealWrapper } from "@/components/ui/RevealWrapper";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { LiveDot } from "@/components/ui/Card";

export function ContactMethods() {
  const methods = [
    { icon: <Phone className="h-5 w-5" strokeWidth={1.25} />, label: "Call dispatch", value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: <Mail className="h-5 w-5" strokeWidth={1.25} />, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: <WhatsAppIcon className="h-5 w-5" />, label: "WhatsApp", value: "Message a dispatcher", href: COMPANY.whatsapp, external: true },
  ];
  return (
    <ul className="space-y-3">
      {methods.map((m) => (
        <li key={m.label}>
          <a
            href={m.href}
            {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-500 hover:border-amber/40 hover:bg-amber/[0.04]"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber/10 text-amber">{m.icon}</span>
            <span>
              <span className="block text-[11px] uppercase tracking-[0.2em] text-white/50">{m.label}</span>
              <span className="block font-medium text-white transition-colors group-hover:text-amber">{m.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function MapEmbed() {
  const q = encodeURIComponent(`${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postal}`);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0e14]">
      <iframe
        title="Apex Truckin office location — Dallas, TX"
        src={`https://www.google.com/maps?q=${q}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full grayscale invert-[0.92] hue-rotate-180 contrast-[0.9]"
      />
      <div className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white/85 ring-1 ring-white/10">
        <MapPin className="h-3.5 w-3.5 text-amber" strokeWidth={1.5} /> {COMPANY.address.city}, {COMPANY.address.region} HQ
      </div>
    </div>
  );
}

export function ContactSection() {
  return (
    <RevealWrapper as="section" id="contact" className="relative py-24 md:py-40">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel n="07" label="Contact" />
          <h2 data-reveal="up" className="mt-6 font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-[0.92]">
            Talk to a <span className="text-gradient">real dispatcher.</span>
          </h2>
          <p data-reveal="up" className="mt-5 max-w-md text-muted">
            Tell us about your truck and lanes. We&apos;ll send back a free lane review with the rates you should be getting.
          </p>
          <p data-reveal="up" className="mt-6 inline-flex items-center gap-2.5 text-sm text-white/80">
            <LiveDot /> Dispatch desk online now
            <Clock3 className="ml-2 h-4 w-4 text-white/40" strokeWidth={1.25} />
            <span className="text-white/50">Avg. reply &lt; 1 hr</span>
          </p>
          <div data-reveal="up" className="mt-8">
            <ContactMethods />
          </div>
          <div data-reveal="up" className="mt-6">
            <MapEmbed />
          </div>
        </div>
        <div data-reveal="up" className="lg:col-span-7">
          <div className="bezel">
            <div className="bezel-core relative p-6 sm:p-10">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </RevealWrapper>
  );
}
