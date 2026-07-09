"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeInfo,
  CheckCircle2,
  ClipboardList,
  PackageCheck,
  Search,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { CategoryData, ProductData } from "@/lib/queries";

type ProductBrowserProps = {
  products: ProductData[];
  categories: CategoryData[];
};

const temporaryProducts: ProductData[] = [
  {
    id: "argivio-sachet",
    name: "ARGIVIO Sachet",
    slug: "argivio-sachet",
    image: "/product-placeholder.png",
    category: "Pregnancy Care",
    categorySlug: "pregnancy-care",
    packSize: "Sachet",
    composition: "L-Arginine, Zinc, and Folic Acid",
    effects:
      "In pregnancy, L-Arginine is sometimes recommended by doctors to help optimize placental blood flow and support healthy fetal growth. Zinc and Folic Acid further assist cell growth and immunity.",
    uses: "Dissolve the sachet in a glass of water and consume only as directed by a qualified healthcare professional.",
    sideEffects:
      "Store below 25°C, away from direct sunlight and moisture. Keep out of reach of children.",
    highlights: ["Sugar-free", "Cranberry flavour", "Pregnancy support"],
    dosageForm: "Sachet",
    featured: true,
    order: 1,
  },
  {
    id: "e2val-2-tablets",
    name: "E2VAL 2 Tablets",
    slug: "e2val-2-tablets",
    image: "/product-placeholder.png",
    category: "Hormonal Health",
    categorySlug: "hormonal-health",
    packSize: "10 x 10 Tablets",
    composition: "Estradiol Valerate Tablets USP (2 mg)",
    effects:
      "Estradiol is a form of estrogen. In fertility care, it is commonly used to help thicken the lining of the uterus before an embryo transfer or to support early hormonal balance in assisted reproductive technologies (ART).",
    uses: "Use strictly as prescribed by a registered medical practitioner. Do not start, stop, or alter treatment without professional advice.",
    sideEffects:
      "Schedule H Prescription Drug: Must only be taken under strict medical supervision and cannot be purchased without a valid doctor's prescription. Store protected from light and moisture at a temperature not exceeding 30°C.",
    highlights: ["Prescription only", "Estradiol 2mg", "Hormonal balance"],
    dosageForm: "Tablet",
    featured: true,
    order: 2,
  },
  {
    id: "et-gest-vaginal-gel",
    name: "ET-Gest Vaginal Gel (8% w/w)",
    slug: "et-gest-vaginal-gel",
    image: "/product-placeholder.png",
    category: "Hormonal Health",
    categorySlug: "hormonal-health",
    packSize: "Prefilled Applicator (90 mg)",
    composition: "Progesterone IP 8.0% w/w (Natural Micronised) in a gel base",
    effects:
      "A hormonal gel vital for regulating the uterine lining and supporting early pregnancy or menstrual cycles. Intended for vaginal use only.",
    uses: "Administer using the provided prefilled applicators exactly as directed by your physician. Refer to the package insert for step-by-step instructions.",
    sideEffects: "Store in a cool place. Do not freeze.",
    highlights: ["Vaginal use only", "Natural Micronised", "Prefilled applicators"],
    dosageForm: "Gel",
    featured: true,
    order: 3,
  },
  {
    id: "et-gest-sr-tablets",
    name: "ET-Gest SR Tablets (200 mg / 300 mg)",
    slug: "et-gest-sr-tablets",
    image: "/product-placeholder.png",
    category: "Hormonal Health",
    categorySlug: "hormonal-health",
    packSize: "Tablets",
    composition: "Progesterone Sustained Release (Available in 200 mg and 300 mg strengths)",
    effects:
      "A slow-release form of natural progesterone used to treat hormonal imbalances causing irregular menstrual cycles or a short luteal phase, supporting the early uterine environment required to achieve and maintain pregnancy.",
    uses: "Use strictly as prescribed by a registered medical practitioner.",
    sideEffects: "Store away from light and moisture, and strictly out of reach of children.",
    highlights: ["Sustained release", "Hormonal support", "Multiple strengths"],
    dosageForm: "Tablet",
    featured: true,
    order: 4,
  },
  {
    id: "hicium-tablets",
    name: "HICIUM Tablets",
    slug: "hicium-tablets",
    image: "/product-placeholder.png",
    category: "Women's Wellness",
    categorySlug: "womens-wellness",
    packSize: "Tablets",
    composition: "Calcium Citrate Malate (Elemental Calcium 500 mg) and Vitamin D3 (2000 IU)",
    effects:
      "Ensures adequate calcium delivery to protect maternal bone density while supporting fetal bone and skeletal development during pregnancy.",
    uses: "Take only in the dose and duration advised by your physician or obstetrician.",
    sideEffects: "Store in a cool, dry place protected from light and moisture.",
    highlights: ["Calcium support", "Vitamin D3", "Wellness care"],
    dosageForm: "Tablet",
    featured: false,
    order: 5,
  },
  {
    id: "l-metio-tablets",
    name: "L-METIO Tablets",
    slug: "l-metio-tablets",
    image: "/product-placeholder.png",
    category: "Pregnancy Care",
    categorySlug: "pregnancy-care",
    packSize: "Tablets",
    composition: "Methylcobalamin, L-Methylfolate Calcium, and Pyridoxal-5-Phosphate",
    effects:
      "Provides active forms of vitamins B12, B9 (folate), and B6 to support healthy blood formation, nerve function, and cellular division. Often preferred for individuals with absorption difficulties.",
    uses: "Take only as directed by your physician.",
    sideEffects: "Store in a cool, dry place protected from light and moisture.",
    highlights: ["Active B-vitamins", "Methylfolate", "Cellular support"],
    dosageForm: "Tablet",
    featured: false,
    order: 6,
  },
  {
    id: "l-metio-d-capsules",
    name: "L-METIO D Capsules",
    slug: "l-metio-d-capsules",
    image: "/product-placeholder.png",
    category: "Pregnancy Care",
    categorySlug: "pregnancy-care",
    packSize: "Capsules",
    composition:
      "L-Methylfolate Calcium (1 mg), Methylcobalamin (1500 mcg), Pyridoxal-5-Phosphate (0.5 mg), DHA 40% (200 mg), and Vitamin D3 (2000 IU)",
    effects:
      "An advanced, all-in-one prenatal supplement providing bioactive folate to prevent neural tube defects, along with DHA essential for healthy development of the baby's brain, nervous system, and eyes.",
    uses: "Use as advised by a qualified healthcare professional, especially during pregnancy or fertility treatment.",
    sideEffects: "Store protected from light and moisture at a temperature not exceeding 25°C.",
    highlights: ["Prenatal support", "DHA", "Bioactive folate"],
    dosageForm: "Capsule",
    featured: true,
    order: 7,
  },
  {
    id: "l-metio-gm-tablets",
    name: "L-METIO GM Tablets",
    slug: "l-metio-gm-tablets",
    image: "/product-placeholder.png",
    category: "Pregnancy Care",
    categorySlug: "pregnancy-care",
    packSize: "Tablets",
    composition:
      "Doxylamine Succinate, L-Methylfolate Calcium, Pyridoxal-5-Phosphate, and Mecobalamin",
    effects:
      "A combination first-line medication designed to treat and manage nausea and vomiting during pregnancy (morning sickness) while delivering active B-vitamins.",
    uses: "Take exactly as directed by your obstetrician.",
    sideEffects: "Store protected from light and moisture, out of reach of children.",
    highlights: ["Morning sickness relief", "Active B-vitamins", "Pregnancy care"],
    dosageForm: "Tablet",
    featured: false,
    order: 8,
  },
  {
    id: "pregiron-tablets",
    name: "Pregiron Tablets",
    slug: "pregiron-tablets",
    image: "/product-placeholder.png",
    category: "Pregnancy Care",
    categorySlug: "pregnancy-care",
    packSize: "Tablets",
    composition:
      "Ferrous Asparto Glycinate (Elemental Iron 100 mg), Calcium L-5 Methyltetrahydrofolate (300 mcg), and Mecobalamin (500 mcg)",
    effects:
      "A specialized iron and vitamin supplement designed to treat or prevent iron-deficiency anemia during pregnancy, featuring highly absorbable iron and active folate/B12.",
    uses: "Take only in the dose and duration advised by your physician.",
    sideEffects: "Store in a cool, dry, and dark place. Protect from direct sunlight.",
    highlights: ["Highly absorbable iron", "Anemia support", "Bioactive folate"],
    dosageForm: "Tablet",
    featured: false,
    order: 9,
  },
  {
    id: "senofert-f-tablets",
    name: "Senofert-F Tablets",
    slug: "senofert-f-tablets",
    image: "/product-placeholder.png",
    category: "Infertility Management",
    categorySlug: "infertility-management",
    packSize: "Tablets",
    composition:
      "Myo-Inositol, Para-Aminobenzoic Acid (PABA), L-Arginine, Co-Enzyme Q10, Multivitamins, and Multiminerals",
    effects:
      "A female fertility supplement designed to support ovarian function, egg quality, and metabolic factors in conditions like PCOS.",
    uses: "One or two tablets daily after meals, or as recommended by a healthcare professional.",
    sideEffects:
      "Not for medicinal use; it is a dietary supplement. Store as directed on the pack.",
    highlights: ["Female fertility", "PCOS support", "CoQ10 & Inositol"],
    dosageForm: "Tablet",
    featured: true,
    order: 10,
  },
  {
    id: "senofert-m-tablets",
    name: "Senofert-M Tablets",
    slug: "senofert-m-tablets",
    image: "/product-placeholder.png",
    category: "Infertility Management",
    categorySlug: "infertility-management",
    packSize: "Tablets",
    composition:
      "L-Carnitine L-Tartarate (300 mg), Co-Enzyme Q10 (100 mg), Zinc (12.5 mg), Astaxanthin, Piperine, Lycopene, and Selenium",
    effects:
      "A specialized male fertility supplement featuring antioxidants and nutrients to support sperm count, motility, and morphology while protecting against oxidative stress.",
    uses: "One or two tablets daily after meals, or as recommended by a healthcare professional.",
    sideEffects:
      "Not for medicinal use; it is a dietary supplement. Store as directed on the pack.",
    highlights: ["Male fertility", "Antioxidant support", "L-Carnitine & CoQ10"],
    dosageForm: "Tablet",
    featured: true,
    order: 11,
  },
  {
    id: "senovit-tablets",
    name: "Senovit Tablets",
    slug: "senovit-tablets",
    image: "/product-placeholder.png",
    category: "Women's Wellness",
    categorySlug: "womens-wellness",
    packSize: "Tablets",
    composition:
      "Methylcobalamin, Alpha Lipoic Acid, Thiamine Mononitrate, Pyridoxine Hydrochloride, and Folic Acid",
    effects:
      "Provides neuroprotective antioxidants and B-vitamins to support neurological health and cellular wellness.",
    uses: "Evaluate individually with your specialist before starting, especially during pregnancy or fertility treatments.",
    sideEffects: "Store in a cool, dry place protected from light and moisture.",
    highlights: ["Alpha Lipoic Acid", "B-complex vitamins", "Neuro support"],
    dosageForm: "Tablet",
    featured: false,
    order: 12,
  },
  {
    id: "sildovio-tablets",
    name: "Sildovio Tablets",
    slug: "sildovio-tablets",
    image: "/product-placeholder.png",
    category: "Infertility Management",
    categorySlug: "infertility-management",
    packSize: "Tablets",
    composition: "Sildenafil Citrate Tablets IP",
    effects:
      "Used under specialist guidance (sometimes off-label as a vaginal suppository) to help optimize blood flow to the uterus, supporting patients with a thin uterine lining.",
    uses: "Take strictly as prescribed and supervised by a registered medical practitioner.",
    sideEffects:
      "Warning: Must be taken strictly under medical guidance. Can interact significantly with nitrates.",
    highlights: ["Thin lining support", "Uterine blood flow", "Doctor supervised"],
    dosageForm: "Tablet",
    featured: false,
    order: 13,
  },
  {
    id: "vvc-vaginal-suppository",
    name: "VVC Vaginal Suppository",
    slug: "vvc-vaginal-suppository",
    image: "/product-placeholder.png",
    category: "Women's Wellness",
    categorySlug: "womens-wellness",
    packSize: "Suppositories",
    composition: "Sodi Biboras (Suhaga/Boric Acid) 600 mg in a mineral/gel cap base",
    effects:
      "A vaginal suppository designed to replenish normal vaginal acidity, balance healthy vaginal flora, and prevent vaginal infections.",
    uses: "Administer vaginally exactly as directed. Refer to package insert for instructions.",
    sideEffects: "For vaginal use only. Do not swallow. Store in a cool, dry place.",
    highlights: ["Vaginal acidity", "Infection prevention", "Flora balance"],
    dosageForm: "Suppository",
    featured: false,
    order: 14,
  },
];

const fallbackCategories: CategoryData[] = [
  {
    id: "infertility-management",
    name: "Infertility Management",
    slug: "infertility-management",
    productCount: 3,
    order: 1,
  },
  {
    id: "pregnancy-care",
    name: "Pregnancy Care",
    slug: "pregnancy-care",
    productCount: 5,
    order: 2,
  },
  {
    id: "hormonal-health",
    name: "Hormonal Health",
    slug: "hormonal-health",
    productCount: 3,
    order: 3,
  },
  {
    id: "womens-wellness",
    name: "Women's Wellness",
    slug: "womens-wellness",
    productCount: 3,
    order: 4,
  },
];

export function ProductBrowser({ products, categories }: ProductBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const catalogProducts = products.length > 0 ? products : temporaryProducts;
  const catalogCategories = categories.length > 0 ? categories : fallbackCategories;

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return catalogProducts.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categorySlug === activeCategory;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.composition, product.category, product.effects]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, catalogProducts, searchTerm]);

  const featuredProduct = catalogProducts.find((p) => p.featured) || catalogProducts[0];

  const scrollToCatalog = () => {
    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const cx = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

  return (
    <div className="w-full bg-white">
      {/* Hero Section: Split Asymmetrical */}
      <section className="relative w-full min-h-[560px] flex items-center bg-[#ecf5fe] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center opacity-35"
            style={{ backgroundImage: "url('/hero-4.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#ecf5fe] via-[#ecf5fe]/95 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 md:px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-6 py-20">
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-[#610000]" />
              <span className="text-xs font-semibold text-[#610000] uppercase tracking-widest">
                Product Catalog
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-[#141d23] mb-6 max-w-2xl">
              Advanced Therapeutics for Modern Healthcare
            </h1>
            <p className="text-lg leading-8 text-neutral-600 mb-10 max-w-xl">
              Discover our comprehensive range of clinically proven formulations, designed with
              precision to support medical professionals and improve patient outcomes globally.
            </p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="bg-[#610000] text-white text-sm font-semibold px-8 py-3.5 rounded hover:bg-[#920703] transition-all custom-shadow-soft active:scale-[0.98] inline-flex items-center gap-2"
              >
                Explore Catalog
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-5 relative justify-end items-center">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden custom-shadow-soft border border-neutral-200/60 relative group text-left cursor-pointer"
                >
                  <div className="absolute inset-0 bg-[#f6faff] p-12 flex items-center justify-center">
                    <Image
                      src={featuredProduct.image}
                      alt={featuredProduct.name}
                      width={320}
                      height={300}
                      className="object-contain max-h-[280px] w-auto transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent flex items-end p-6">
                    <div>
                      <span className="bg-white text-[#610000] text-xs font-semibold px-3 py-1 rounded-full mb-2 inline-block shadow-sm">
                        Featured
                      </span>
                      <h3 className="font-serif text-2xl font-semibold text-white">
                        {featuredProduct.name}
                      </h3>
                    </div>
                  </div>
                </button>
              </DialogTrigger>
              <ProductDialog product={featuredProduct} />
            </Dialog>
          </div>
        </div>
      </section>

      {/* Sticky Categories / Filter Chips */}
      <section
        id="catalog-section"
        className="border-b border-neutral-200/50 bg-white sticky top-20 z-40 shadow-sm"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 flex items-center justify-between overflow-x-auto no-scrollbar gap-4">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="text-sm font-semibold text-neutral-800 mr-2 hidden md:inline-block">
              Categories:
            </span>
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={cx(
                "text-xs font-semibold px-5 py-2 rounded-full border transition-all duration-200",
                activeCategory === "all"
                  ? "bg-[#610000] text-white border-[#610000]"
                  : "bg-[#f6faff] text-neutral-600 border-neutral-200 hover:border-[#610000] hover:text-[#610000]",
              )}
            >
              All Products
            </button>
            {catalogCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.slug)}
                className={cx(
                  "text-xs font-semibold px-5 py-2 rounded-full border transition-all duration-200",
                  activeCategory === category.slug
                    ? "bg-[#610000] text-white border-[#610000]"
                    : "bg-[#f6faff] text-neutral-600 border-neutral-200 hover:border-[#610000] hover:text-[#610000]",
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center relative">
            <Search className="absolute left-3 text-neutral-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-full bg-[#f6faff] text-sm focus:outline-none focus:border-[#610000] focus:ring-1 focus:ring-[#610000] w-64 transition-all"
              placeholder="Search products..."
            />
          </div>
        </div>
      </section>

      {/* Main product listings and grid */}
      <section className="py-20 max-w-[1280px] mx-auto px-4 md:px-8 bg-white">
        {/* Important Safety Disclaimer */}
        <div className="mb-12 rounded-lg border border-neutral-200 bg-[#ffdad4]/30 p-5 shadow-sm sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#610000] text-white">
              <TriangleAlert className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-medium text-[#141d23]">
                Important Safety Disclaimer
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#5a403c]">
                The information provided is intended solely for educational purposes. It should not
                replace professional medical advice, diagnosis, or treatment. All medicines should
                be prescribed and used only under the supervision of a qualified registered medical
                practitioner.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h2 className="font-serif text-3xl font-medium text-[#141d23] mb-2">Our Products</h2>
            <p className="text-sm text-neutral-500 font-medium">
              Showing {filteredProducts.length} of {catalogProducts.length} clinical formulations
            </p>
          </div>
          {/* Search bar for mobile view since desktop search is hidden on mobile */}
          <div className="lg:hidden relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 h-4 w-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 rounded-full bg-[#f6faff] text-sm focus:outline-none focus:border-[#610000] focus:ring-1 focus:ring-[#610000] transition-all"
              placeholder="Search products..."
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductDialogCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded-lg border border-dashed border-neutral-200 bg-white p-12 text-center">
            <div>
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ffdad4]/50 text-[#610000] shadow-sm">
                <PackageCheck className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-medium text-[#610000]">
                No matching products
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                Try a different category or search term, or contact us for product information.
              </p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded bg-[#610000] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#920703]"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Call to Action / Info Section */}
      <section className="py-20 bg-[#2a2d2e] text-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-medium mb-4 text-white">
            Require Specific Formulations?
          </h2>
          <p className="text-lg leading-8 text-neutral-300 max-w-2xl mx-auto mb-8">
            Our dedicated team is ready to discuss custom requirements, bulk orders, and
            distribution partnerships. Let's elevate healthcare standards together.
          </p>
          <a
            href="/contact"
            className="inline-flex justify-center items-center bg-white text-[#141d23] font-semibold text-sm px-8 py-3 rounded hover:bg-neutral-100 transition-colors shadow-sm active:scale-[0.98]"
          >
            Contact Sales Team
          </a>
        </div>
      </section>
    </div>
  );
}

function ProductDialogCard({ product }: { product: ProductData }) {
  return (
    <Dialog>
      <article className="group bg-white border border-neutral-200/70 rounded-xl overflow-hidden custom-shadow-soft hover:custom-shadow-hover transition-all duration-300 flex flex-col h-full cursor-pointer">
        <DialogTrigger asChild>
          <button type="button" className="flex h-full flex-col text-left w-full">
            <div className="relative w-full pt-[80%] bg-[#f6faff] flex items-center justify-center p-8 overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.name} packaging`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-neutral-500 hover:text-[#610000]">
                  <BadgeInfo className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wide">
                {product.category}
              </span>
              <h3 className="font-serif text-xl font-semibold text-[#141d23] mb-2 leading-tight">
                {product.name}
              </h3>
              <p className="text-sm leading-6 text-neutral-500 line-clamp-2 mb-6">
                {product.composition}
              </p>
              <div className="mt-auto w-full">
                <span className="w-full bg-[#f6faff] text-neutral-700 border border-neutral-200/80 group-hover:border-[#610000] group-hover:text-white group-hover:bg-[#610000] font-semibold text-sm py-3 rounded-md transition-colors flex justify-center items-center gap-2">
                  Read More
                </span>
              </div>
            </div>
          </button>
        </DialogTrigger>
      </article>
      <ProductDialog product={product} />
    </Dialog>
  );
}

function ProductDialog({ product }: { product: ProductData }) {
  return (
    <DialogContent className="max-h-[88vh] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:rounded-lg">
      <div className="grid lg:grid-cols-[340px_1fr]">
        <div className="flex min-h-[260px] items-center justify-center bg-[#f6faff] p-5 lg:min-h-full">
          <Image
            src={product.image}
            alt={`${product.name} packaging`}
            width={340}
            height={300}
            className="max-h-[300px] w-full object-contain p-5"
          />
        </div>
        <div className="p-5 sm:p-6">
          <div className="pr-8">
            <div className="flex flex-wrap gap-2">
              <DetailChip icon={<PackageCheck className="h-4 w-4" />} label={product.packSize} />
              <DetailChip icon={<ShieldCheck className="h-4 w-4" />} label="Medical guidance" />
              <DetailChip icon={<BadgeInfo className="h-4 w-4" />} label={product.category} />
            </div>
            <DialogTitle className="mt-4 font-serif text-2xl font-medium leading-tight text-[#141d23] sm:text-3xl">
              {product.name}
            </DialogTitle>
            <DialogDescription className="mt-2 text-sm font-semibold leading-6 text-[#5a403c]">
              {product.composition}
            </DialogDescription>
          </div>

          <div className="mt-5 rounded-lg border border-[#e3beb8]">
            <DetailRow
              icon={<Stethoscope className="h-4 w-4" aria-hidden="true" />}
              label="What it is"
              value={product.effects}
            />
            <DetailRow
              icon={<ClipboardList className="h-4 w-4" aria-hidden="true" />}
              label="Usage"
              value={product.uses}
            />
            <DetailRow
              icon={<TriangleAlert className="h-4 w-4" aria-hidden="true" />}
              label="Storage / Safety"
              value={product.sideEffects}
              last
            />
          </div>

          <div className="mt-5 flex flex-col gap-4 rounded-lg bg-[#ffdad4]/35 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {product.highlights.map((highlight) => (
                <span
                  key={highlight}
                  className="inline-flex items-center gap-1.5 rounded bg-white px-2.5 py-1.5 text-xs font-semibold text-[#5a403c]"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#610000]" aria-hidden="true" />
                  {highlight}
                </span>
              ))}
            </div>
            <a
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-[#610000] px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#920703]"
            >
              Enquire Now
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

function DetailChip({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded bg-[#ffdad4]/55 px-3 py-2 text-xs font-semibold text-[#610000]">
      {icon}
      {label}
    </span>
  );
}

function DetailRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`grid gap-3 bg-white p-4 sm:grid-cols-[28px_1fr] ${
        last ? "" : "border-b border-[#e3beb8]"
      }`}
    >
      <div className="flex h-7 w-7 items-center justify-center rounded bg-[#ffdad4]/55 text-[#610000]">
        {icon}
      </div>
      <p className="text-sm leading-6 text-[#5a403c]">
        <span className="font-semibold text-[#141d23]">{label}: </span>
        {value}
      </p>
    </div>
  );
}
