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

  const scrollToCatalog = () => {
    document.getElementById("catalog-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[#fbf7f4]">
        <div className="absolute inset-x-0 top-0 h-px bg-[#610000]/20" aria-hidden="true" />
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 items-stretch lg:min-h-[calc(100svh-80px)] lg:grid-cols-[minmax(0,0.92fr)_minmax(420px,0.78fr)]">
          <div className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-14 lg:py-12 lg:pr-12">
            <div className="mb-5 inline-flex items-center gap-3">
              <span className="h-px w-10 bg-[#610000]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#610000]">
                Product Catalog
              </span>
            </div>
            <h1 className="max-w-3xl font-serif text-4xl font-bold leading-[1.08] text-[#141d23] sm:text-5xl lg:text-[52px]">
              Innovative Healthcare Solutions for Women&apos;s Wellness
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#516169] lg:text-[17px]">
              At Senovio Healthcare, every product is developed with one purpose — to improve health
              outcomes while maintaining the highest standards of safety, quality, and clinical
              effectiveness.
            </p>

            <div className="mt-6 border-l-2 border-[#610000] pl-5">
              <p className="text-base font-semibold text-[#141d23]">
                Our portfolio focuses primarily on:
              </p>
              <ul className="mt-4 flex max-w-2xl flex-wrap gap-2 sm:gap-2.5">
                {[
                  "Infertility Management",
                  "Gynaecology",
                  "Women\u2019s Wellness",
                  "Pregnancy Care",
                  "Hormonal Health",
                  "Nutraceuticals",
                ].map((area) => (
                  <li
                    key={area}
                    className="inline-flex min-h-9 items-center gap-1.5 rounded border border-[#e3beb8] bg-white px-2.5 py-2 text-xs font-medium text-[#5a403c] shadow-sm sm:min-h-10 sm:gap-2 sm:px-3.5 sm:text-sm"
                  >
                    <CheckCircle2
                      className="h-3.5 w-3.5 shrink-0 text-[#610000] sm:h-4 sm:w-4"
                      aria-hidden="true"
                    />
                    {area}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 max-w-2xl text-base italic leading-7 text-[#5a403c]">
              Each formulation reflects our commitment to scientific excellence and compassionate
              care.
            </p>
            <div className="mt-7 flex">
              <button
                type="button"
                onClick={scrollToCatalog}
                className="inline-flex min-h-11 items-center gap-2 rounded bg-[#610000] px-7 py-2.5 text-sm font-semibold text-white shadow-interactive transition hover:-translate-y-0.5 hover:bg-[#920703] active:translate-y-0"
              >
                Explore Catalog
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden bg-[#141d23] lg:min-h-full">
            <Image
              src="/hero-4.png"
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#141d23]/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#fbf7f4] lg:via-transparent lg:to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-y-10 left-0 hidden w-px bg-[#610000]/40 lg:block" />
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-[#610000]" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* Main product listings and grid */}
      <section
        id="catalog-section"
        className="max-w-[1280px] mx-auto bg-white px-4 py-16 md:px-8 lg:py-18"
      >
        <div className="mb-10 flex flex-col gap-5 border-b border-neutral-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mb-2 font-serif text-3xl font-medium text-[#141d23]">Our Products</h2>
            <p className="text-sm font-medium text-neutral-500">
              Showing {filteredProducts.length} of {catalogProducts.length} clinical formulations
            </p>
          </div>

          <div className="relative w-full md:max-w-sm">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8e706b]"
              aria-hidden="true"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-12 w-full rounded border border-[#e3beb8] bg-white pl-11 pr-4 text-sm text-[#141d23] shadow-sm transition placeholder:text-[#8e706b]/75 focus:border-[#610000] focus:outline-none focus:ring-2 focus:ring-[#610000]/10"
              placeholder="Search products..."
            />
          </div>
        </div>

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
                The information below is general, educational, and intended for patient awareness.
                It must not be considered a substitute for professional medical advice, diagnosis,
                or treatment from a qualified medical practitioner. Always consult your doctor
                before starting, stopping, or altering any medication.
              </p>
            </div>
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
