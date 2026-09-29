"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { SiteInfo } from "@/types";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";

// Renders nothing until opened, and pulls in framer-motion — keep it (and framer-motion) out
// of every page's initial JS. Prefetched on idle below so the first tap still opens instantly.
const loadMobileMenu = () => import("./MobileMenu");
const MobileMenu = dynamic(() => loadMobileMenu().then((m) => m.MobileMenu), { ssr: false });

export type NavSite = Pick<SiteInfo, "name" | "nav" | "phone" | "phoneHref" | "whatsapp" | "headerCta" | "menuCta" | "whatsappTooltip">;

export function Navbar({ site }: { site: NavSite }) {
  const { scrolled, progressRef } = useScrollProgress(40);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const idle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(loadMobileMenu, { timeout: 2000 })
        : window.setTimeout(loadMobileMenu, 1000);
    return () => (typeof window.requestIdleCallback === "function" ? window.cancelIdleCallback : window.clearTimeout)(idle);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-amber px-4 py-2 text-sm font-semibold text-bg transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-5">
        <nav
          aria-label="Primary"
          className={cn(
            "relative flex w-full items-center justify-between gap-6 rounded-full transition-[max-width,background-color,padding,box-shadow,border-color] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]",
            scrolled || open
              ? "max-w-[1120px] border border-white/10 bg-[#0c0d13]/75 py-2 pl-5 pr-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl"
              : "max-w-[1320px] border border-transparent bg-transparent py-3 pl-3 pr-2",
          )}
        >
          <Logo name={site.name} />
          <ul className="hidden items-center gap-1 lg:flex">
            {site.nav.map((l) => {
              const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300",
                      active ? "text-amber" : "text-white/70 hover:text-white",
                    )}
                  >
                    {l.label}
                    {active && <span className="absolute inset-x-4 -bottom-0.5 h-px bg-amber/70" />}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center gap-2">
            <a href={site.phoneHref} className="hidden text-[13px] font-medium text-white/70 transition-colors hover:text-amber xl:block">
              {site.phone}
            </a>
            <Button href={site.headerCta.href} className="hidden sm:inline-flex">
              {site.headerCta.label}
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-5 rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-[1.5px] w-3.5 -translate-y-1/2 rounded-full bg-amber transition-all duration-300",
                    open && "w-0 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-[1.5px] w-5 rounded-full bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
          {/* scroll progress hairline — transform written directly by useScrollProgress, not React state */}
          <span
            ref={progressRef as React.RefObject<HTMLSpanElement>}
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-x-8 -bottom-px h-px origin-left bg-grad transition-opacity duration-500",
              scrolled ? "opacity-70" : "opacity-0",
            )}
            style={{ transform: "scaleX(0)" }}
          />
        </nav>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} site={site} />
    </>
  );
}
