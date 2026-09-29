import { Mail, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/cms";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export async function ContactMethods({ whatsappLabel = "Message a dispatcher" }: { whatsappLabel?: string } = {}) {
  const COMPANY = await getSiteSettings();
  const methods = [
    { icon: <Phone className="h-5 w-5" strokeWidth={1.25} />, label: "Call dispatch", value: COMPANY.phone, href: COMPANY.phoneHref },
    { icon: <Mail className="h-5 w-5" strokeWidth={1.25} />, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: <WhatsAppIcon className="h-5 w-5" />, label: "WhatsApp", value: whatsappLabel, href: COMPANY.whatsapp, external: true },
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

export async function MapEmbed() {
  const COMPANY = await getSiteSettings();
  const q = encodeURIComponent(`${COMPANY.address.street}, ${COMPANY.address.city}, ${COMPANY.address.region} ${COMPANY.address.postal}`);
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0e14]">
      <iframe
        title={`${COMPANY.name} office location — ${COMPANY.address.city}, ${COMPANY.address.region}`}
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
