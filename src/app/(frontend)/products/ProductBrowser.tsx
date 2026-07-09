"use client";

import Image from "next/image";
import {
  ArrowRight,
  BadgeInfo,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  PackageCheck,
  Search,
  ShieldCheck,
  Stethoscope,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useState, type MouseEvent, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ProductData } from "@/lib/queries";

type ProductBrowserProps = {
  products: ProductData[];
};

export function ProductBrowser({ products }: ProductBrowserProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const catalogProducts = products;

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return catalogProducts.filter((product) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        [product.name, product.composition, product.effects, product.dosageForm]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return matchesSearch;
    });
  }, [catalogProducts, searchTerm]);

  const featuredProduct = catalogProducts.find((p) => p.featured) ?? catalogProducts[0];

  const scrollToCatalog = () => {
    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
  };

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
          {featuredProduct ? (
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
          ) : null}
        </div>
      </section>

      {/* Sticky Search */}
      <section
        id="catalog-section"
        className="border-b border-neutral-200/50 bg-white sticky top-20 z-40 shadow-sm"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-4 flex items-center justify-end gap-4">
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
                {catalogProducts.length > 0 ? "No matching products" : "No products published"}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-neutral-500">
                {catalogProducts.length > 0
                  ? "Try a different search term, or contact us for product information."
                  : "Add active products in the CMS to publish them on this page."}
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
            <div className="group/product-image relative w-full pt-[80%] bg-[#f6faff] flex items-center justify-center p-8 overflow-hidden">
              <Image
                src={product.image}
                alt={`${product.name} packaging`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-contain p-8 transition-transform duration-500 group-hover/product-image:scale-110"
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-neutral-500 hover:text-[#610000]">
                  <BadgeInfo className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isImageZoomActive, setIsImageZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const productImages = useMemo(
    () => Array.from(new Set([product.image, ...product.gallery].filter(Boolean))),
    [product.gallery, product.image],
  );
  const activeImage = productImages[activeImageIndex] ?? product.image;
  const hasMultipleImages = productImages.length > 1;

  const showPreviousImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === 0 ? productImages.length - 1 : currentIndex - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((currentIndex) =>
      currentIndex === productImages.length - 1 ? 0 : currentIndex + 1,
    );
  };

  const handleImageZoomMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({
      x: Math.min(100, Math.max(0, x)),
      y: Math.min(100, Math.max(0, y)),
    });
  };

  useEffect(() => {
    setActiveImageIndex(0);
    setIsImageZoomActive(false);
  }, [product.id]);

  return (
    <DialogContent className="max-h-[88vh] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto border-0 bg-white p-0 shadow-2xl sm:rounded-lg">
      <div className="relative grid lg:grid-cols-[340px_1fr]">
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 bg-[#f6faff] p-5 lg:min-h-full">
          <div
            className="relative flex h-[260px] w-full cursor-zoom-in items-center justify-center overflow-hidden rounded-lg"
            onMouseEnter={() => setIsImageZoomActive(true)}
            onMouseLeave={() => setIsImageZoomActive(false)}
            onMouseMove={handleImageZoomMove}
          >
            <Image
              src={activeImage}
              alt={`${product.name} packaging`}
              width={340}
              height={300}
              className="max-h-[260px] w-full object-contain p-5"
            />
            {isImageZoomActive ? (
              <span
                className="pointer-events-none absolute hidden h-24 w-24 rounded border border-[#610000]/35 bg-[#610000]/10 shadow-sm lg:block"
                style={{
                  left: `${zoomPosition.x}%`,
                  top: `${zoomPosition.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ) : null}
            {hasMultipleImages ? (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label={`Show previous ${product.name} image`}
                  className="absolute left-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-[#610000] shadow-sm transition hover:border-[#610000] hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label={`Show next ${product.name} image`}
                  className="absolute right-0 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 text-[#610000] shadow-sm transition hover:border-[#610000] hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
                <span className="absolute bottom-1 right-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-[#5a403c] shadow-sm">
                  {activeImageIndex + 1}/{productImages.length}
                </span>
              </>
            ) : null}
          </div>
          {isImageZoomActive ? (
            <div
              className="pointer-events-none absolute inset-y-5 left-[340px] right-5 z-30 hidden rounded-lg border border-neutral-200 bg-white shadow-2xl lg:block"
              style={{
                backgroundImage: `url("${activeImage}")`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "280%",
              }}
            />
          ) : null}
          {hasMultipleImages ? (
            <div className="flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
              {productImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`Show ${product.name} image ${index + 1}`}
                  aria-pressed={activeImageIndex === index}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded border bg-white transition hover:scale-105 ${
                    activeImageIndex === index
                      ? "border-[#610000] ring-2 ring-[#610000]/25"
                      : "border-neutral-200 opacity-75 hover:border-[#610000] hover:opacity-100"
                  }`}
                >
                  <Image src={image} alt="" fill sizes="56px" className="object-contain p-1.5" />
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <div className="p-5 sm:p-6">
          <div className="pr-8">
            <div className="flex flex-wrap gap-2">
              <DetailChip icon={<PackageCheck className="h-4 w-4" />} label={product.packSize} />
              <DetailChip icon={<ShieldCheck className="h-4 w-4" />} label="Medical guidance" />
              {product.dosageForm ? (
                <DetailChip icon={<BadgeInfo className="h-4 w-4" />} label={product.dosageForm} />
              ) : null}
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
