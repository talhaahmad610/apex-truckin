import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const FacebookIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9z" />
  </svg>
);
export const InstagramIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden {...p}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
  </svg>
);
export const LinkedinIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M6.9 8.8H3.8V20h3.1V8.8zM5.3 4a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM20.2 13.6c0-3-1.6-4.9-4.3-4.9-1.4 0-2.3.7-2.8 1.4V8.8h-3V20h3.1v-5.8c0-1.5.6-2.6 2-2.6s1.9 1.1 1.9 2.6V20h3.1v-6.4z" />
  </svg>
);
export const XIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.7 3.5h3l-6.6 7.5 7.8 9.5h-6.1l-4.8-6.2-5.5 6.2h-3l7-8L2.1 3.5h6.2l4.3 5.7 5.1-5.7zm-1 15.2h1.7L7.4 5.2H5.6l11.1 13.5z" />
  </svg>
);
export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12 2.2A9.7 9.7 0 003.7 16.9L2.3 21.8l5-1.3A9.7 9.7 0 1012 2.2zm0 17.7c-1.5 0-2.9-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 00-.7.3c-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2l-.4-.3z" />
  </svg>
);
