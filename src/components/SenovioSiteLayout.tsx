"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Globe2,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Share2,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { PageImageLoadGate } from "@/components/PageImageLoadGate";
import { companyAddressLines, companyEmail, companyPhone } from "@/lib/company";

import { useSettings } from "./providers";

export type RoutePath =
  | "/"
  | "/about"
  | "/services"
  | "/products"
  | "/careers"
  | "/faqs"
  | "/contact";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Our Services", to: "/services" },
  { label: "Product Range", to: "/products" },
  { label: "Careers", to: "/careers" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact Us", to: "/contact" },
] as const satisfies ReadonlyArray<{ label: string; to: RoutePath }>;

const legalLinks = ["Privacy Policy", "Terms", "Product Catalog", "Certifications"];

const medicalDisclaimer =
  "The content on this website is intended for informational purposes only and should not be considered a substitute for professional medical advice. Please consult a qualified healthcare professional and refer to the approved prescribing information before using any product.";

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function SenovioSiteLayout({
  activePath,
  children,
}: {
  activePath: RoutePath;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6faff] text-[#141d23] font-sans">
      <PageImageLoadGate>
        <SiteHeader activePath={activePath} />
        {children}
        <SiteFooter activePath={activePath} />
        <WhatsAppButton />
      </PageImageLoadGate>
    </div>
  );
}

function SiteHeader({ activePath }: { activePath: RoutePath }) {
  const { enableOrderNow } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const getHeaderNavLabel = (item: (typeof navItems)[number]) =>
    item.to === "/products" ? "Our Products" : item.label;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/50 bg-white/95 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 transition-opacity hover:opacity-90"
        >
          <Image
            src="/senovio-logo.webp"
            width={240}
            height={80}
            alt="Senovio Healthcare Private Limited"
            className="h-12 w-auto max-w-[13rem] object-contain"
            priority
          />
          <span className="sr-only">Senovio Healthcare</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={cx(
                "relative group py-2 text-[15px] font-semibold transition-colors duration-200",
                item.to === activePath ? "text-[#610000]" : "text-neutral-600 hover:text-[#610000]",
              )}
            >
              <span>{getHeaderNavLabel(item)}</span>
              <span
                className={cx(
                  "absolute -bottom-1.5 left-0 h-[2.5px] bg-[#610000] transition-all duration-300 rounded-full",
                  item.to === activePath
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden items-center justify-center h-10 rounded-md border border-neutral-300 hover:border-[#610000] px-5 text-sm font-semibold text-neutral-700 bg-transparent hover:bg-[#610000]/5 transition-colors duration-200 lg:inline-flex"
          >
            Partner With Us
          </Link>
          {enableOrderNow && (
            <Link
              href="/products"
              className="hidden items-center justify-center gap-2 h-10 rounded-md bg-[#610000] hover:bg-[#920703] px-5 text-sm font-semibold text-white shadow-sm hover:shadow transition-colors duration-200 md:inline-flex"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              Order Now
            </Link>
          )}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-neutral-200 text-[#610000] transition hover:bg-[#610000]/5 xl:hidden"
          >
            {isOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <nav
          className="border-t border-neutral-100 bg-white px-4 py-4 shadow-lg xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto grid max-w-7xl gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                onClick={() => setIsOpen(false)}
                className={cx(
                  "rounded px-3 py-3 text-sm font-semibold transition-colors duration-200",
                  item.to === activePath
                    ? "bg-[#610000] text-white"
                    : "text-neutral-700 hover:bg-[#610000]/5 hover:text-[#610000]",
                )}
              >
                {getHeaderNavLabel(item)}
              </Link>
            ))}
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="rounded border border-neutral-300 px-3 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
              >
                Partner With Us
              </Link>
              {enableOrderNow && (
                <Link
                  href="/products"
                  onClick={() => setIsOpen(false)}
                  className="rounded bg-[#610000] px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#920703]"
                >
                  Order Now
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export function PageHero({
  title,
  eyebrow,
  image,
  children,
}: {
  title: string;
  eyebrow: string;
  image: string;
  children?: ReactNode;
}) {
  const displayTitle = eyebrow || title;

  return (
    <section className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-[#2a2d2e] px-4 py-20 text-center text-white sm:min-h-[340px] sm:px-6">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url("${image}")` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#2a2d2e]/90 via-[#2a2d2e]/55 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-[#610000]" />
      <div className="relative z-10 mx-auto max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ffb4a8]">
          {title}
        </p>
        <h1 className="font-serif text-4xl font-semibold text-white sm:text-5xl">{displayTitle}</h1>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-white/75">
          <Link href="/" className="transition hover:text-[#ffb4a8]">
            Senovio Healthcare
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-[#ffb4a8]">{displayTitle}</span>
        </div>
        {children && <div className="mt-5 text-base leading-7 text-white/80">{children}</div>}
      </div>
    </section>
  );
}

export function HomeHero({
  title,
  highlight,
  description,
  image,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  highlight: string;
  description: string;
  image: string;
  primaryCta: { label: string; to: RoutePath };
  secondaryCta: { label: string; to: RoutePath };
}) {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-[#2a2d2e] px-4 py-20 sm:px-6">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center opacity-45"
        style={{ backgroundImage: `url("${image}")` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#2a2d2e]/90 via-[#2a2d2e]/55 to-transparent"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="max-w-2xl rounded-lg border-l-4 border-[#610000] bg-white/95 p-7 shadow-2xl backdrop-blur-sm sm:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e3beb8] bg-[#f6faff] px-3 py-1">
            <ShieldCheck className="h-4 w-4 text-[#610000]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5a403c]">
              WHO Approved Partner
            </span>
          </div>
          <h1 className="font-serif text-4xl font-semibold leading-tight text-[#141d23] sm:text-5xl">
            {title}
            <span className="relative block text-[#610000]">
              {highlight}
              <svg
                className="absolute -bottom-1 left-0 h-3 w-full text-[#8b0000]/25"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 5 Q 50 10 100 5 T 200 5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-5 border-l-2 border-[#e3beb8] pl-4 text-xl leading-9 text-[#5a403c]">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to={primaryCta.to}>{primaryCta.label}</ButtonLink>
            <ButtonLink to={secondaryCta.to} variant="outline">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Section({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "teal" | "dark" | "white" | "primary";
  className?: string;
}) {
  return (
    <section
      className={cx(
        "px-4 py-16 sm:px-6 lg:py-20",
        (tone === "teal" || tone === "dark") && "bg-[#2a2d2e] text-white",
        tone === "light" && "bg-[#f6faff] text-[#141d23]",
        tone === "white" && "bg-white text-[#141d23]",
        tone === "primary" && "bg-[#610000] text-white",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  inverse?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={cx("mb-10 max-w-3xl", centered && "mx-auto text-center")}>
      {eyebrow && (
        <p
          className={cx(
            "mb-3 text-sm font-semibold uppercase tracking-widest",
            inverse ? "text-[#ffb4a8]" : "text-[#610000]",
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cx(
          "font-serif text-3xl font-medium sm:text-4xl",
          inverse ? "text-white" : "text-[#141d23]",
        )}
      >
        {title}
      </h2>
      <div
        className={cx(
          "mt-4 h-1 w-16 rounded-full bg-[#610000]",
          centered && "mx-auto",
          inverse && "bg-[#ffb4a8]",
        )}
      />
      {description && (
        <p className={cx("mt-4 text-base leading-7", inverse ? "text-white/80" : "text-[#5a403c]")}>
          {description}
        </p>
      )}
    </div>
  );
}

export function ButtonLink({
  to,
  children,
  variant = "primary",
}: {
  to: RoutePath;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
}) {
  return (
    <Link
      href={to}
      className={cx(
        "group inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5",
        variant === "primary" && "bg-[#610000] text-white hover:bg-[#920703] hover:shadow-lg",
        variant === "secondary" &&
          "border border-[#8e706b] bg-[#f6faff]/50 text-[#516169] hover:border-[#610000] hover:text-[#610000]",
        variant === "outline" &&
          "border border-[#8e706b] bg-[#f6faff]/50 text-[#516169] hover:border-[#610000] hover:text-[#610000]",
      )}
    >
      {children}
      <ArrowRight
        className="h-4 w-4 transition-transform group-hover:translate-x-1"
        aria-hidden="true"
      />
    </Link>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
  inverse = false,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  inverse?: boolean;
}) {
  return (
    <article
      className={cx(
        "h-full rounded-lg border p-6 transition hover:-translate-y-1 hover:shadow-interactive",
        inverse
          ? "border-white/15 bg-white/10 text-white backdrop-blur-sm"
          : "border-[#e3beb8] bg-white text-[#141d23]",
      )}
    >
      <div
        className={cx(
          "mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg",
          inverse ? "bg-white/10 text-[#ffb4a8]" : "bg-[#ffdad4]/30 text-[#610000]",
        )}
      >
        {icon}
      </div>
      <h3
        className={cx("font-serif text-xl font-medium", inverse ? "text-white" : "text-[#141d23]")}
      >
        {title}
      </h3>
      <p className={cx("mt-3 text-sm leading-6", inverse ? "text-white/80" : "text-[#5a403c]")}>
        {description}
      </p>
    </article>
  );
}

export function SplitFeature({
  image,
  eyebrow,
  title,
  children,
  cta,
}: {
  image: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  cta?: { label: string; to: RoutePath };
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <div className="group relative">
        <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-[#e3beb8] shadow-ambient">
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div
          className="absolute -bottom-6 -right-3 z-20 flex items-center gap-4 rounded-lg border border-[#e3beb8] bg-white p-4 shadow-interactive sm:-right-6"
          style={{ animationDuration: "3s" }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#610000]">
            <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8e706b]">
              Certified
            </p>
            <p className="text-sm font-bold text-[#610000]">Quality Certified</p>
          </div>
        </div>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#610000]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-medium text-[#141d23]">{title}</h2>
        <div className="mt-5 space-y-4 text-base leading-7 text-[#5a403c]">{children}</div>
        {cta && (
          <div className="mt-7">
            <ButtonLink to={cta.to} variant="secondary">
              {cta.label}
            </ButtonLink>
          </div>
        )}
      </div>
    </div>
  );
}

export function ProductCard({ name, image }: { name: string; image: string }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#e3beb8] bg-white transition hover:-translate-y-1 hover:shadow-interactive">
      <div className="relative aspect-[4/3] bg-[#f6faff] p-6">
        <Image
          src={image}
          alt={`${name} packaging`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col items-center border-t border-[#e3beb8] p-6 text-center">
        <h3 className="font-serif text-xl font-medium text-[#141d23]">{name}</h3>
        <div className="mt-5">
          <ButtonLink to="/contact" variant="primary">
            Read More
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

export function ContactInfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-lg bg-[#2a2d2e] p-6 text-white shadow-sm">
      <div className="flex items-start gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#610000] text-white">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#aeafb0]">{label}</p>
          <p className="mt-1 whitespace-pre-line break-words text-lg font-bold">{value}</p>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:-translate-y-1">
      {content}
    </a>
  ) : (
    content
  );
}

function SiteFooter({ activePath }: { activePath: RoutePath }) {
  return (
    <footer className="bg-[#2a2d2e] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/senovio-logo.webp"
              width={260}
              height={87}
              alt="Senovio Healthcare Private Limited"
              className="h-auto w-56 max-w-full rounded bg-white px-2 py-1"
            />
          </Link>
          <p className="mt-6 max-w-sm text-base leading-7 text-[#aeafb0]">
            Delivering quality pharmaceutical solutions in Gynaecology and Infertility with a
            commitment to science, ethics, and compassion.
          </p>
          <p className="mt-5 font-serif text-2xl font-bold text-white">WE CARE</p>
          <p className="mt-1 text-sm italic leading-6 text-[#ffb4a8]">
            Where Science Meets Compassion. Where Hope Begins.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#aeafb0]">Links</h2>
          <nav className="mt-6 grid gap-3" aria-label="Footer navigation">
            {navItems.map((item) => (
              <Link
                key={item.to}
                href={item.to}
                className={cx(
                  "inline-flex w-fit items-center gap-3 text-sm font-semibold transition hover:translate-x-1",
                  item.to === activePath ? "text-[#ffb4a8]" : "text-[#aeafb0] hover:text-white",
                )}
              >
                <ChevronRight className="h-4 w-4 text-[#ffb4a8]" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#aeafb0]">Legal</h2>
          <nav className="mt-6 grid gap-3" aria-label="Legal navigation">
            {legalLinks.map((label) => (
              <a
                key={label}
                href="#"
                className="inline-flex w-fit items-center gap-3 text-sm font-semibold text-[#aeafb0] transition hover:translate-x-1 hover:text-white"
              >
                <ChevronRight className="h-4 w-4 text-[#ffb4a8]" aria-hidden="true" />
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#aeafb0]">Contact</h2>
          <ul className="mt-6 space-y-5 text-sm font-semibold text-[#aeafb0]">
            <li className="flex gap-4">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4a8]" aria-hidden="true" />
              <span>
                {companyAddressLines.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < companyAddressLines.length - 1 && <br />}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="h-5 w-5 shrink-0 text-[#ffb4a8]" aria-hidden="true" />
              <a href={phoneHref(companyPhone)} className="transition hover:text-white">
                {companyPhone}
              </a>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="h-5 w-5 shrink-0 text-[#ffb4a8]" aria-hidden="true" />
              <a href={`mailto:${companyEmail}`} className="transition hover:text-white">
                {companyEmail}
              </a>
            </li>
          </ul>
          <div className="mt-7 flex gap-3">
            <a
              href="#"
              aria-label="Share Senovio Healthcare"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#404344] text-white transition hover:bg-[#610000]"
            >
              <Share2 className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-label="Visit Senovio Healthcare online"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#404344] text-white transition hover:bg-[#610000]"
            >
              <Globe2 className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[#404344] px-4 py-7 text-center text-sm text-[#aeafb0]">
        <p className="mx-auto mb-4 max-w-5xl text-xs leading-6 text-[#aeafb0] sm:text-sm">
          <strong className="font-bold text-white">Disclaimer:</strong> {medicalDisclaimer}
        </p>
        <p>© 2026 Senovio Healthcare Private Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/916900992126"
      aria-label="Chat with Senovio Healthcare on WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] hover:shadow-[#25D366]/40"
      target="_blank"
      rel="noreferrer"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="text-white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}
