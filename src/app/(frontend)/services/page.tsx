import type { Metadata } from "next";
import {
  BadgeCheck,
  BriefcaseMedical,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
  Stethoscope,
  Truck,
  UsersRound,
} from "lucide-react";
import {
  ButtonLink,
  FeatureCard,
  PageHero,
  SenovioSiteLayout,
  Section,
  SectionHeader,
} from "@/components/SenovioSiteLayout";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore Senovio Healthcare services for women's healthcare, fertility management, scientific support, quality assurance, distribution, and partnerships.",
  openGraph: {
    title: "Our Services - Senovio Healthcare",
    description:
      "Pharmaceutical services for healthcare professionals, hospitals, fertility clinics, distributors, and business partners.",
  },
  twitter: {
    card: "summary",
    title: "Our Services - Senovio Healthcare",
    description:
      "Pharmaceutical services for healthcare professionals, hospitals, fertility clinics, distributors, and business partners.",
  },
};

const heroImage = "/services-hero.png";

const services = [
  {
    title: "Women's Healthcare Solutions",
    description:
      "Comprehensive pharmaceutical solutions supporting women from adolescence through reproductive years, pregnancy, and beyond.",
    icon: HeartPulse,
    points: [
      "Menstrual Health",
      "Hormonal Disorders",
      "PCOS",
      "Pregnancy Care",
      "Lactation Support",
      "Menopause Management",
      "Nutritional Supplementation",
    ],
  },
  {
    title: "Fertility & Infertility Management",
    description:
      "Therapeutic solutions that support fertility specialists and gynaecologists in improving reproductive outcomes.",
    icon: Stethoscope,
    points: [
      "Ovulation Induction",
      "Follicular Development",
      "Hormonal Regulation",
      "Luteal Phase Support",
      "IVF & IUI Support",
      "Male Fertility Support",
      "Pregnancy Maintenance",
    ],
  },
  {
    title: "Scientific & Medical Support",
    description:
      "Scientific collaboration that helps healthcare professionals deliver better patient outcomes.",
    icon: FlaskConical,
    points: [
      "Scientific Literature",
      "Product Training",
      "Clinical Updates",
      "Evidence-Based Product Information",
      "Medical Education Programs",
      "CME Support",
    ],
  },
  {
    title: "Quality Assurance",
    description:
      "A quality-first system built around manufacturing standards, consistency, and patient confidence.",
    icon: ShieldCheck,
    points: [
      "Carefully Selected Manufacturing Partners",
      "GMP-Compliant Manufacturing",
      "Robust Quality Control Systems",
      "Batch-to-Batch Consistency",
      "Pharmacovigilance Support",
      "Regulatory Compliance",
    ],
  },
  {
    title: "Ethical Pharmaceutical Marketing",
    description:
      "Responsible engagement built on credibility, scientific product promotion, and long-term trust.",
    icon: BadgeCheck,
    points: [
      "Ethical Doctor Engagement",
      "Scientific Product Promotion",
      "Transparent Communication",
      "Responsible Business Conduct",
      "Regulatory Compliance",
      "Long-Term Relationship Building",
    ],
  },
  {
    title: "Distribution & Supply Chain Excellence",
    description:
      "Reliable availability through a growing distribution network and strengthened logistics infrastructure.",
    icon: Truck,
    points: [
      "Super Stockists",
      "Distributors",
      "Retail Pharmacies",
      "Hospitals",
      "Fertility Centres",
      "Institutional Supply Partners",
    ],
  },
  {
    title: "Business Partnerships",
    description:
      "Strategic collaborations with organizations that share our commitment to improving healthcare.",
    icon: BriefcaseMedical,
    points: [
      "Super Stockist Appointments",
      "Distribution Partnerships",
      "Institutional Business",
      "Hospital Supply",
      "Fertility Centre Collaborations",
      "Contract Manufacturing",
      "Marketing Alliances",
      "Export Opportunities",
    ],
  },
];

const reasons = [
  {
    title: "Specialized Women's Healthcare Focus",
    description:
      "Unlike general pharmaceutical companies, Senovio Healthcare dedicates significant resources to women's health and reproductive medicine.",
    icon: <HeartPulse className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Experienced Leadership",
    description:
      "Led by professionals with decades of pharmaceutical experience, our organization combines industry knowledge with entrepreneurial agility.",
    icon: <UsersRound className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Quality You Can Trust",
    description:
      "Every product reflects rigorous quality standards designed to inspire confidence among doctors and patients alike.",
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Ethical Practices",
    description: "Integrity remains the foundation of every business decision we make.",
    icon: <BadgeCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Scientific Excellence",
    description:
      "Our products are supported by current medical evidence and ongoing scientific engagement.",
    icon: <FlaskConical className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Long-Term Relationships",
    description:
      "We believe enduring partnerships are built through trust and consistent performance.",
    icon: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
  },
];

export default function ServicesPage() {
  return (
    <SenovioSiteLayout activePath="/services">
      <PageHero
        title="Our Services"
        eyebrow="Partnering Healthcare. Transforming Lives."
        image={heroImage}
      >
        <p>
          Reliable pharmaceutical solutions for healthcare professionals, hospitals, fertility
          clinics, distributors, and business partners.
        </p>
      </PageHero>

      <Section tone="dark">
        <div className="mx-auto max-w-5xl text-center">
          <SectionHeader
            centered
            inverse
            eyebrow="WE CARE"
            title="Exceptional healthcare extends beyond quality medicines"
          />
          <div className="space-y-5 text-lg leading-8 text-white/85">
            <p>
              At Senovio Healthcare Private Limited, we believe that exceptional healthcare extends
              beyond developing quality medicines. It encompasses scientific collaboration, reliable
              partnerships, ethical business practices, and a steadfast commitment to improving
              patient outcomes.
            </p>
            <p>
              Our services are designed to support healthcare professionals, hospitals, fertility
              clinics, distributors, and business partners with dependable pharmaceutical solutions
              that reflect our guiding philosophy.
            </p>
            <p className="font-serif text-3xl font-semibold text-white">WE CARE</p>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader
          centered
          eyebrow="Our Services"
          title="Partnering healthcare. Transforming lives."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-ambient transition hover:-translate-y-1 hover:shadow-interactive"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#ffdad4]/30 text-[#610000]">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-medium text-[#141d23]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[#5a403c]">{service.description}</p>
                  </div>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm leading-6 text-[#5a403c]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#610000]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader
          centered
          eyebrow="Choose Senovio Healthcare"
          title="Because We Care"
          description="Our work is shaped by specialized focus, quality standards, ethical practice, and lasting partnerships."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <FeatureCard key={reason.title} {...reason} />
          ))}
        </div>
      </Section>

      <Section tone="primary" className="text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb4a8]">
            Our Promise
          </p>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-white">WE CARE</h2>
          <p className="mt-5 text-lg leading-8 text-white/85">
            Whether serving a doctor, a distributor, a fertility clinic, or a patient, our
            commitment remains unchanged. Because We Care.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/contact" variant="outline">
              Partner With Us
            </ButtonLink>
          </div>
        </div>
      </Section>
    </SenovioSiteLayout>
  );
}
