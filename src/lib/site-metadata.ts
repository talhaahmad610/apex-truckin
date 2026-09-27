import type { Metadata, Viewport } from "next";
import { getSiteSettings } from "@/lib/cms";
import { SITE_URL } from "@/lib/seo";

export async function getSiteMetadata(): Promise<Metadata> {
  const COMPANY = await getSiteSettings();
  return {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${COMPANY.name} — Truck Dispatch Services for Owner-Operators & Fleets`,
    template: `%s | ${COMPANY.name}`,
  },
  description:
    "Apex Truckin is a 24/7 truck dispatch service for owner-operators and fleets. Dry van, flatbed, reefer, hotshot, step deck, power only & box truck dispatch across all 48 states.",
  applicationName: COMPANY.name,
  keywords: [
    "truck dispatch services",
    "truck dispatcher",
    "owner operator dispatch",
    "dry van dispatch",
    "flatbed dispatch",
    "reefer dispatch",
    "hotshot dispatch",
    "box truck dispatch",
  ],
  authors: [{ name: COMPANY.name, url: SITE_URL }],
  creator: COMPANY.name,
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    locale: "en_US",
    url: "/",
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: "Apex Truckin — Built to Haul. Built to Win." }],
  },
  twitter: { card: "summary_large_image", site: "@apextruckin" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  category: "transportation",
  };
}

export const siteViewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Keeps the mobile layout viewport equal to the visual viewport; otherwise any element wider
  // than the screen lets touch scrolling pan the viewport and visibly un-pins `position: sticky`.
  minimumScale: 1,
};
