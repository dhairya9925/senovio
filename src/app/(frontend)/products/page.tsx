import type { Metadata } from "next";
import { SenovioSiteLayout } from "@/components/SenovioSiteLayout";
import { getActiveProducts } from "@/lib/queries";
import { ProductBrowser } from "./ProductBrowser";

export const metadata: Metadata = {
  title: "Our Products",
  description:
    "Explore Senovio Healthcare products for women's wellness, pregnancy care, hormonal health, and infertility management.",
  openGraph: {
    title: "Our Products - Senovio Healthcare",
    description:
      "Explore Senovio Healthcare products for women's wellness, pregnancy care, hormonal health, and infertility management.",
  },
  twitter: {
    card: "summary",
    title: "Our Products - Senovio Healthcare",
    description:
      "Explore Senovio Healthcare products for women's wellness, pregnancy care, hormonal health, and infertility management.",
  },
};

export const revalidate = 60;

export default async function ProductsPage() {
  const products = await getActiveProducts();

  return (
    <SenovioSiteLayout activePath="/products">
      <ProductBrowser products={products} />
    </SenovioSiteLayout>
  );
}
