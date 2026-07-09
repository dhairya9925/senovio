import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers to common questions about Senovio Healthcare products, quality, distribution, careers, and partnerships.",
  openGraph: {
    title: "FAQs - Senovio Healthcare",
    description:
      "Answers to common questions about Senovio Healthcare medicines, quality standards, and partnerships.",
  },
  twitter: {
    card: "summary",
    title: "FAQs - Senovio Healthcare",
    description:
      "Answers to common questions about Senovio Healthcare medicines, quality standards, and partnerships.",
  },
};

export default function FaqsLayout({ children }: { children: ReactNode }) {
  return children;
}
