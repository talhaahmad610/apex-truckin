"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { NavSite } from "./Navbar";
import { Button } from "@/components/ui/Button";
import { getLenis } from "@/components/3d/SmoothScroll";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";

const ease = [0.32, 0.72, 0, 1] as const;

export function MobileMenu({ open, onClose, site }: { open: boolean; onClose: () => void; site: NavSite }) {
  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
          className="fixed inset-0 z-40 flex flex-col bg-[#07070b]/90 px-6 pb-10 pt-28 backdrop-blur-3xl lg:hidden"
        >
          <nav aria-label="Mobile" className="flex-1">
            <ul className="space-y-1">
              {site.nav.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.12 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      onClick={onClose}
                      className="flex items-baseline gap-4 py-2 font-display text-[44px] font-bold uppercase leading-none tracking-tight text-white/90 hover:text-amber"
                    >
                      <span className="text-xs font-medium tracking-[0.2em] text-amber/70">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.45 }}
            className="space-y-5"
          >
            <Button href={site.menuCta.href} size="lg" className="w-full justify-between" onClick={onClose}>
              {site.menuCta.label}
            </Button>
            <div className="flex items-center justify-between text-sm text-muted">
              <a href={site.phoneHref} className="hover:text-amber">{site.phone}</a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-amber">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
