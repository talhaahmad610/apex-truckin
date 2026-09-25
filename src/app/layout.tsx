import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { SmoothScroll } from "@/components/3d/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { COMPANY } from "@/lib/constants";
import { SITE_URL, organizationLd, websiteLd } from "@/lib/seo";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
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

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${geist.variable} ${barlow.variable}`}>
      <body className="grain min-h-[100dvh] antialiased">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SmoothScroll />
        {children}
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            classNames: {
              toast: "!rounded-2xl !border !border-[rgba(245,166,35,0.2)] !bg-[#13151f]/95 !text-white !backdrop-blur-xl",
              description: "!text-[#a0aec0]",
            },
          }}
        />
      </body>
    </html>
  );
}
