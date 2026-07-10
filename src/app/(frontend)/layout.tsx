import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { Providers } from "@/components/providers";
import "leaflet/dist/leaflet.css";
import "@/styles.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-newsreader",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Senovio Healthcare",
    template: "%s - Senovio Healthcare",
  },
  description:
    "Senovio Healthcare - delivering quality pharmaceutical solutions in Gynaecology and Infertility.",
  authors: [{ name: "Senovio Healthcare" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Senovio Healthcare",
    description: "Explore Senovio Healthcare services, products, careers, and contact information.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Senovio Healthcare",
    description: "Explore Senovio Healthcare services, products, careers, and contact information.",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${newsreader.variable} ${inter.variable} font-sans`}>
      <Providers>{children}</Providers>
    </div>
  );
}
