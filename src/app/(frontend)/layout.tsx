import { SiteDocument } from "@/components/layout/SiteDocument";
import { getSiteMetadata, siteViewport } from "@/lib/site-metadata";
import "./globals.css";

export const generateMetadata = getSiteMetadata;
export const viewport = siteViewport;

export default function FrontendLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument>{children}</SiteDocument>;
}
