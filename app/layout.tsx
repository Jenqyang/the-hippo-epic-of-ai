import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono, Libre_Franklin } from "next/font/google";
import {
  pageOpenGraph,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/app/_data/site";

import "./fonts/huiwen-supplement.css";
import "./globals.css";

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const huiwenMincho = localFont({
  src: "./fonts/generated/Huiwen-Mincho-critical.woff2",
  variable: "--font-huiwen-mincho",
  weight: "400",
  style: "normal",
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: siteTitle, template: `%s · ${siteName}` },
  description: siteDescription,
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: pageOpenGraph({
    title: siteTitle,
    description: siteDescription,
    path: "/",
  }),
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${libreFranklin.variable} ${ibmPlexMono.variable} ${huiwenMincho.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
