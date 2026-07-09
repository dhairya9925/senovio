import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import type { ReactNode } from "react";

import { unstable_cache } from "next/cache";
import { Providers } from "@/components/providers";
import { getPayload } from "@/lib/payload";
import "leaflet/dist/leaflet.css";
import "@/styles.css";

const getCachedSettings = unstable_cache(
  async () => {
    const payload = await getPayload();
    const settings = await payload.findGlobal({ slug: "site-settings" });
    return { enableOrderNow: settings.enableOrderNow ?? true };
  },
  ["site-settings"],
  { revalidate: 60 },
);

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
  let enableOrderNow = true;

  try {
    const cached = await getCachedSettings();
    enableOrderNow = cached.enableOrderNow;
  } catch (error) {
    console.error("Failed to fetch site settings:", error);
  }

  return (
    <div className={`${newsreader.variable} ${inter.variable} font-sans`}>
      <Providers enableOrderNow={enableOrderNow}>{children}</Providers>
    </div>
  );
}
