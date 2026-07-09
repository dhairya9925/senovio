"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, HelpCircle, Mail, Minus, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { PageHero, SenovioSiteLayout } from "@/components/SenovioSiteLayout";

const heroImage = "/services-hero.png";

const faqs = [
  {
    id: "specialization",
    question: "What does Senovio Healthcare specialize in?",
    answer:
      "Senovio Healthcare specializes in Women's Healthcare, Gynaecology, Infertility Management, Pregnancy Care, Hormonal Health, and Nutraceuticals.",
  },
  {
    id: "quality-certified-facilities",
    question: "Are your medicines manufactured under quality-certified facilities?",
    answer:
      "Yes. Our products are manufactured at facilities that comply with stringent GMP and applicable regulatory standards, ensuring safety, quality, and consistency.",
  },
  {
    id: "manufacturing",
    question: "Do you manufacture your own products?",
    answer:
      "We collaborate with trusted manufacturing partners who maintain the highest quality standards while ensuring regulatory compliance.",
  },
  {
    id: "direct-purchase",
    question: "Can patients purchase medicines directly from Senovio Healthcare?",
    answer:
      "No. Our products are available through authorized distributors, stockists, hospitals, and retail pharmacies as per applicable regulations.",
  },
  {
    id: "prescription",
    question: "Do your medicines require a doctor's prescription?",
    answer:
      "Many of our pharmaceutical products are prescription medicines and should only be used under the supervision of a qualified medical practitioner.",
  },
  {
    id: "ivf-fertility",
    question: "Do you provide medicines for IVF centres and fertility clinics?",
    answer:
      "Yes. We actively collaborate with fertility specialists, IVF centres, and reproductive medicine professionals by providing specialized therapeutic solutions.",
  },
  {
    id: "distributor-stockist",
    question: "How can I become a distributor or stockist?",
    answer:
      "Please contact our Business Development team through the Contact Us page or email us. Our representatives will guide you through the partnership process.",
  },
  {
    id: "quality-assurance",
    question: "How does Senovio ensure product quality?",
    answer:
      "Every product undergoes rigorous quality checks, supported by validated manufacturing processes and strict quality assurance systems.",
  },
  {
    id: "scientific-support",
    question: "Are your products scientifically supported?",
    answer:
      "Yes. Our portfolio is developed using evidence-based formulations and current medical knowledge to support clinical practice.",
  },
  {
    id: "doctor-information",
    question: "How can doctors receive product information?",
    answer:
      "Healthcare professionals may contact our field representatives for detailed scientific information.",
  },
  {
    id: "cme-education",
    question: "Does Senovio conduct CME or educational activities?",
    answer:
      "Yes. We actively support scientific education, continuing medical education programs, and knowledge-sharing initiatives.",
  },
  {
    id: "careers",
    question: "Can I apply for a job online?",
    answer:
      "Absolutely. Please email your updated resume to our HR department through the Careers page.",
  },
  {
    id: "we-care",
    question: 'What does "WE CARE" represent?',
    answer:
      "It represents our commitment to quality medicines, ethical business practices, compassionate healthcare, scientific excellence, employee development, and long-term partnerships.",
  },
];

export default function FaqsPage() {
  const [openItems, setOpenItems] = useState<string[]>([faqs[0].id]);

  function toggleFaq(id: string) {
    setOpenItems((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  return (
    <SenovioSiteLayout activePath="/faqs">
      <PageHero title="FAQs" eyebrow="Questions & Answers" image={heroImage}>
        <p>
          Clear answers about Senovio Healthcare products, quality systems, partnerships, careers,
          and our WE CARE philosophy.
        </p>
      </PageHero>

      <main className="relative overflow-hidden bg-[#2a2d2e]">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ffb4a8' stroke-width='1'%3E%3Cpath d='M12 36h48M36 12v48'/%3E%3Ccircle cx='36' cy='36' r='18'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <section className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#ffb4a8]">
              <FlaskConical className="h-5 w-5" aria-hidden="true" />
              <span>FAQs</span>
            </div>
            <h2 className="max-w-xl font-serif text-3xl font-medium text-white sm:text-4xl">
              Frequently asked questions and answers
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/80">
              We keep essential information clear and accessible. For product-specific,
              prescription, distribution, or partnership details, our team can guide you directly.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                <ShieldCheck className="mb-4 h-7 w-7 text-[#ffb4a8]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-medium">Quality First</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Validated manufacturing processes, strict quality checks, and responsible
                  documentation support every product.
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 text-white backdrop-blur-sm">
                <HelpCircle className="mb-4 h-7 w-7 text-[#ffb4a8]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-medium">Need Details?</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Our team can help healthcare professionals, distributors, stockists, and partners
                  reach the right department.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openItems.includes(faq.id);
              const panelId = `${faq.id}-panel`;

              return (
                <article
                  key={faq.id}
                  className="overflow-hidden rounded-lg border border-white/20 bg-white/10 text-white shadow-sm backdrop-blur-sm"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(faq.id)}
                    className="flex w-full items-center justify-between gap-5 p-5 text-left transition hover:bg-white/5 sm:p-6"
                  >
                    <span className="font-serif text-lg font-medium text-[#ffb4a8] sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#610000]">
                      {isOpen ? (
                        <Minus className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <Plus className="h-5 w-5" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  <div
                    id={panelId}
                    className={
                      isOpen
                        ? "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300"
                        : "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300"
                    }
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 text-base leading-7 text-white/90 sm:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <section className="border-t border-[#e3beb8] bg-[#f6faff] px-4 py-14 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#610000]">
              <Mail className="h-5 w-5 text-[#610000]" aria-hidden="true" />
              <span>Still have a question?</span>
            </div>
            <h2 className="font-serif text-2xl font-medium text-[#141d23]">
              Talk to the Senovio Healthcare team
            </h2>
            <p className="mt-2 max-w-2xl text-base leading-7 text-[#5a403c]">
              Send us your query and we will guide you to the right product, department, or
              partnership contact.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded bg-[#610000] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#920703]"
          >
            Contact Us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SenovioSiteLayout>
  );
}
