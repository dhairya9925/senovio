import type { Metadata } from "next";
import { SenovioSiteLayout } from "@/components/SenovioSiteLayout";
import { getActiveProducts, getProductCategories } from "@/lib/queries";
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

const heroImage = "/hero-4.png";
const disclaimer =
  "The information provided is intended solely for educational purposes. It should not replace professional medical advice, diagnosis, or treatment. All medicines should be prescribed and used only under the supervision of a qualified registered medical practitioner.";

export const revalidate = 60;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getActiveProducts(), getProductCategories()]);

  return (
    <SenovioSiteLayout activePath="/products">
      <ProductBrowser products={products} categories={categories} />
    </SenovioSiteLayout>
  );
}
