import Image from "next/image";
import Link from "next/link";
import { getServices, getSiteSettings } from "@/lib/cms";
import { FacebookIcon, InstagramIcon, LinkedinIcon, WhatsAppIcon, XIcon } from "@/components/ui/BrandIcons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { Logo } from "./Logo";

export async function Footer() {
  const [COMPANY, SERVICES] = await Promise.all([getSiteSettings(), getServices()]);
  const socials = [
    { label: "Facebook", href: COMPANY.socials.facebook, Icon: FacebookIcon },
    { label: "Instagram", href: COMPANY.socials.instagram, Icon: InstagramIcon },
    { label: "LinkedIn", href: COMPANY.socials.linkedin, Icon: LinkedinIcon },
    { label: "X (Twitter)", href: COMPANY.socials.x, Icon: XIcon },
    { label: "WhatsApp", href: COMPANY.whatsapp, Icon: WhatsAppIcon },
  ].filter((s) => s.href);
  const year = new Date().getFullYear();
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/5">
      <Image
        src={COMPANY.footer.image ?? "/images/footer-sunset.webp"}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center opacity-45"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-bg via-bg/85 to-bg/95" />

      <div className="mx-auto max-w-[1320px] px-4 pb-10 pt-24 sm:px-8 md:pt-32">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[clamp(3rem,10vw,9rem)] font-bold uppercase leading-[0.85] tracking-tight">
              {COMPANY.footer.headline}{COMPANY.footer.highlight ? <> <span className="text-gradient">{COMPANY.footer.highlight}</span></> : null}
            </p>
            <p className="mt-4 max-w-md text-muted">{COMPANY.tagline} {COMPANY.subTagline}</p>
          </div>
          <NewsletterForm label={COMPANY.footer.newsletterLabel} />
        </div>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-4">
            <Logo name={COMPANY.name} />
            <address className="mt-6 space-y-1.5 text-sm not-italic text-muted">
              <p>{COMPANY.address.street}</p>
              <p>
                {COMPANY.address.city}, {COMPANY.address.region} {COMPANY.address.postal}
              </p>
              <p>
                <a href={COMPANY.phoneHref} className="hover:text-amber">{COMPANY.phone}</a>
              </p>
              <p>
                <a href={`mailto:${COMPANY.email}`} className="hover:text-amber">{COMPANY.email}</a>
              </p>
            </address>
            <ul className="mt-6 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${COMPANY.name} on ${label}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-0.5 hover:text-amber hover:ring-amber/40"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterCol title="Company" className="md:col-span-2" links={COMPANY.nav} />
          <FooterCol
            title="Services"
            className="md:col-span-3"
            links={SERVICES.map((s) => ({ label: `${s.name} Dispatch`, href: `/services/${s.slug}` }))}
          />
          <FooterCol
            title="Legal"
            className="md:col-span-3"
            links={COMPANY.footer.legalLinks}
          />
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>© {year} {COMPANY.legalName}. All rights reserved.</p>
          {COMPANY.footer.bottomLine && <p>{COMPANY.footer.bottomLine}</p>}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links, className }: { title: string; links: { label: string; href: string }[]; className?: string }) {
  return (
    <nav aria-label={title} className={className}>
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-amber">{title}</p>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-white/65 transition-colors hover:text-white">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
