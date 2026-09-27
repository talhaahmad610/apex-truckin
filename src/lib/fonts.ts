import { Barlow_Condensed, Geist } from "next/font/google";

export const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

export const barlow = Barlow_Condensed({
  subsets: ["latin"],
  // 800 is loaded but never actually rendered anywhere on the site (verified exhaustively,
  // including inherited weight/font-family through JSX ancestors) — 500/600/700 all are.
  weight: ["500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});
