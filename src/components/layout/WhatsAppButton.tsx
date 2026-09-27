import { WhatsAppIcon } from "@/components/ui/BrandIcons";

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Apex Truckin dispatch on WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-110 active:scale-95 md:bottom-8 md:right-8"
    >
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-[#0c0d13]/90 px-3 py-1.5 text-xs font-medium text-white opacity-0 ring-1 ring-white/10 transition-opacity duration-300 group-hover:opacity-100 md:block">
        Talk to dispatch
      </span>
    </a>
  );
}
