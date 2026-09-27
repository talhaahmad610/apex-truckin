import { SiteDocument } from "@/components/layout/SiteDocument";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import "./globals.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument>{children}</SiteDocument>;
}
