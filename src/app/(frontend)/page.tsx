import type { Metadata } from "next";
import {
  BadgeCheck,
  BriefcaseMedical,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import {
  ButtonLink,
  FeatureCard,
  SenovioSiteLayout,
  Section,
  SectionHeader,
  SplitFeature,
} from "@/components/SenovioSiteLayout";
import HeroSlider from "@/components/HeroSlider";
import type { HeroSlide } from "@/components/HeroSlider";

export const metadata: Metadata = {
  title: {
    absolute: "Senovio Healthcare - WE CARE",
  },
  description:
    "Senovio Healthcare - delivering quality pharmaceutical solutions in Gynaecology and Infertility.",
  openGraph: {
    title: "Senovio Healthcare - WE CARE",
    description:
      "Delivering quality pharmaceutical solutions in Gynaecology and Infertility with compassion and science.",
  },
  twitter: {
    card: "summary",
    title: "Senovio Healthcare - WE CARE",
    description:
      "Delivering quality pharmaceutical solutions in Gynaecology and Infertility with compassion and science.",
  },
};

const heroSlides: HeroSlide[] = [
  {
    title: "WE CARE",
    highlight: "Because Every Dream of Parenthood Deserves a Chance",
    description:
      "At Senovio Healthcare, we believe every family begins with hope. Through innovative fertility and women's healthcare solutions, we are committed to helping millions embrace healthier tomorrows.",
    image: "/hero-1.png",
    primaryCta: { label: "Explore Products", to: "/products" },
    secondaryCta: { label: "Partner With Us", to: "/contact" },
  },
  {
    title: "Advancing Women's Healthcare",
    highlight: "with Compassion & Science",
    description:
      "Delivering quality pharmaceutical solutions in Gynaecology and Infertility, empowering healthcare professionals to transform lives.",
    image: "/hero-2.png",
    primaryCta: { label: "About Us", to: "/about" },
    secondaryCta: { label: "Our Services", to: "/services" },
  },
  {
    title: "Supporting Every Step",
    highlight: "of the Fertility Journey",
    description:
      "From ovulation induction to pregnancy support, Senovio Healthcare stands beside doctors and patients with trusted therapeutic solutions.",
    image: "/hero-3.png",
    primaryCta: { label: "Product Range", to: "/products" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
  },
  {
    title: "Quality You Can Trust",
    highlight: "Care You Can Feel",
    description:
      "Every product reflects our commitment to stringent quality standards, ethical practices, and patient-centric innovation.",
    image: "/hero-4.png",
    primaryCta: { label: "Explore Products", to: "/products" },
    secondaryCta: { label: "Partner With Us", to: "/contact" },
  },
  {
    title: "Building Healthier Families",
    highlight: "Through Better Healthcare",
    description:
      "We work closely with healthcare professionals to deliver effective, evidence-based solutions for women's health and reproductive wellness.",
    image: "/hero-5.png",
    primaryCta: { label: "About Us", to: "/about" },
    secondaryCta: { label: "Contact Us", to: "/contact" },
  },
];

const aboutImage = "/about-hero.png";

const highlights = [
  {
    title: "Specialized Expertise",
    description: "Focused exclusively on Women's Healthcare and Infertility Management.",
    icon: <BriefcaseMedical className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Quality Without Compromise",
    description:
      "Manufactured under internationally accepted quality standards ensuring safety, efficacy and consistency.",
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Ethical Business Practices",
    description:
      "Transparency, integrity and long-term partnerships define every relationship we build.",
    icon: <BadgeCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Scientific Excellence",
    description:
      "Evidence-based products supported by continuous medical education and scientific engagement.",
    icon: <FlaskConical className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Customer-Centric Approach",
    description:
      "Supporting doctors, distributors, healthcare institutions and patients through responsive service.",
    icon: <UsersRound className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Nationwide Growth",
    description:
      "Aims at building a strong distribution network to make specialized women's healthcare accessible across India.",
    icon: <TrendingUp className="h-6 w-6" aria-hidden="true" />,
  },
];

const promises = [
  {
    title: "We Care for Patients",
    description: "Every patient deserves dignity, safety and hope.",
    icon: <HeartPulse className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "We Care for Doctors",
    description: "Every prescription deserves dependable science.",
    icon: <Stethoscope className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "We Care for Healthcare Professionals",
    description: "Every partner deserves responsive support.",
    icon: <UsersRound className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "We Care for Quality",
    description: "Every product deserves uncompromising standards.",
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "We Care for Innovation",
    description: "Every solution should move healthcare forward.",
    icon: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "We Care for Every Life We Touch",
    description: "Every life touched by Senovio matters.",
    icon: <Sparkles className="h-6 w-6" aria-hidden="true" />,
  },
];

export default function Index() {
  return (
    <SenovioSiteLayout activePath="/">
      <HeroSlider slides={heroSlides} interval={5000} />

      <Section tone="dark" className="relative overflow-hidden pt-16 sm:pt-20">
        <div
          className="absolute right-0 top-0 h-64 w-64 translate-x-1/4 -translate-y-1/2 rounded-full bg-[#610000]/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <SectionHeader
            centered
            inverse
            eyebrow="Welcome to Senovio Healthcare"
            title="WE CARE"
            description="At Senovio Healthcare Private Limited, care is not merely our motto - it is the foundation of everything we do."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              "Every woman deserves quality healthcare.",
              "Every couple deserves the hope of parenthood.",
              "Every healthcare professional deserves dependable pharmaceutical partners.",
            ].map((statement) => (
              <div
                key={statement}
                className="rounded-lg border border-white/15 bg-white/10 p-5 text-sm font-semibold leading-6 text-white backdrop-blur-sm"
              >
                <CheckCircle2 className="mx-auto mb-3 h-5 w-5 text-[#ffb4a8]" aria-hidden="true" />
                {statement}
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-4xl space-y-6 text-lg leading-8 text-white/85">
            <p>
              With these beliefs at our core, Senovio Healthcare is dedicated to delivering
              high-quality pharmaceutical solutions focused primarily on Gynaecology, Fertility,
              Reproductive Health and Women's Wellness.
            </p>
            <p>
              Our products are developed with one objective - to improve clinical outcomes while
              enriching the quality of life for women across every stage of their reproductive
              journey.
            </p>
            <p>
              Whether supporting fertility treatments, hormonal balance, pregnancy care, or overall
              women's wellness, our mission remains unwavering.
            </p>
            <p className="font-serif text-2xl font-semibold text-white">WE CARE</p>
            <p className="font-semibold text-[#ffb4a8]">
              Because behind every prescription lies a dream. Behind every treatment lies a family.
              Behind every patient lies a story waiting to become a happy beginning.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink to="/about">Join Our Mission</ButtonLink>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SplitFeature
          image={aboutImage}
          eyebrow="About Us"
          title="The Meaning and Significance of Senovio"
          cta={{ label: "Read More", to: "/about" }}
        >
          <p>
            The name Senovio reflects progress, innovation, vitality and a forward-looking vision
            for healthcare. It represents our unwavering commitment to improving reproductive health
            while nurturing hope for millions of families aspiring to experience parenthood.
          </p>
          <p>
            Healthcare is more than manufacturing medicines - it is about restoring confidence,
            creating possibilities and supporting life's most precious moments.
          </p>
          <p>
            Every formulation developed by Senovio Healthcare is inspired by our belief that quality
            healthcare should be compassionate, accessible and scientifically advanced.
          </p>
        </SplitFeature>
      </Section>

      <Section>
        <SectionHeader
          centered
          eyebrow="Senovio Healthcare"
          title="Focused healthcare solutions built around women, families and trust"
          description="Our approach combines specialized therapeutic focus, quality-first manufacturing, ethical business practices and responsive healthcare partnerships."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/services" variant="secondary">
            Explore Services
          </ButtonLink>
        </div>
      </Section>

      <Section tone="dark" className="relative overflow-hidden">
        <div
          className="absolute left-0 top-1/2 h-72 w-72 -translate-x-1/3 -translate-y-1/2 rounded-full bg-[#610000]/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <SectionHeader centered inverse eyebrow="Our Promise" title="WE CARE" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {promises.map((item) => (
              <FeatureCard key={item.title} {...item} inverse />
            ))}
          </div>
        </div>
      </Section>
    </SenovioSiteLayout>
  );
}
