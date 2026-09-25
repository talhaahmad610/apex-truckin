"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { FacebookIcon, LinkedinIcon, WhatsAppIcon, XIcon } from "./BrandIcons";

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on X", href: `https://x.com/intent/tweet?url=${u}&text=${t}`, Icon: XIcon },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedinIcon },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon },
    { label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, Icon: WhatsAppIcon },
  ];
  const cls =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-0.5 hover:text-amber hover:ring-amber/40";
  return (
    <div className="flex flex-wrap items-center gap-2">
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
          <Icon className="h-4 w-4" />
        </a>
      ))}
      <button
        type="button"
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cls}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
      >
        {copied ? <Check className="h-4 w-4 text-amber" /> : <Link2 className="h-4 w-4" strokeWidth={1.5} />}
      </button>
    </div>
  );
}
