import type { Metadata } from "next";
import {
  BadgeCheck,
  BriefcaseMedical,
  CheckCircle2,
  FlaskConical,
  HeartPulse,
  Lightbulb,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import {
  FeatureCard,
  PageHero,
  SenovioSiteLayout,
  Section,
  SectionHeader,
} from "@/components/SenovioSiteLayout";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Senovio Healthcare - our philosophy, leadership, values, and commitment to women's healthcare and fertility management.",
  openGraph: {
    title: "About Us - Senovio Healthcare",
    description:
      "Learn about Senovio Healthcare, an emerging pharmaceutical company focused on Gynaecology and Infertility.",
  },
  twitter: {
    card: "summary",
    title: "About Us - Senovio Healthcare",
    description:
      "Learn about Senovio Healthcare, an emerging pharmaceutical company focused on Gynaecology and Infertility.",
  },
};

const heroImage = "/about-hero.png";

const philosophyCards = [
  "We Care about women who trust our medicines.",
  "We Care about doctors who trust our science.",
  "We Care about quality that improves lives.",
  "We Care about ethical practices that build confidence.",
  "We Care about employees who drive our vision.",
  "We Care about every life touched by Senovio Healthcare.",
];

const missionItems = [
  "Deliver superior quality pharmaceutical products.",
  "Support healthcare professionals through scientific excellence.",
  "Improve fertility care outcomes.",
  "Advance women's health through innovation.",
  "Maintain the highest ethical standards.",
  "Build lasting relationships with healthcare partners.",
  "Expand access to specialized healthcare across India.",
  "Create sustainable value for society through responsible healthcare.",
];

const coreValues = [
  {
    title: "Compassion",
    description: "Every patient deserves empathy and dignity.",
    icon: <HeartPulse className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Integrity",
    description: "We conduct business with honesty and transparency.",
    icon: <Scale className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Excellence",
    description: "Quality remains our highest priority.",
    icon: <ShieldCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Innovation",
    description: "Continuous improvement drives better healthcare.",
    icon: <Lightbulb className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Commitment",
    description: "Our dedication extends beyond products to people.",
    icon: <BadgeCheck className="h-6 w-6" aria-hidden="true" />,
  },
  {
    title: "Responsibility",
    description: "We contribute responsibly towards healthier communities.",
    icon: <UsersRound className="h-6 w-6" aria-hidden="true" />,
  },
];

const sankarAchievements = [
  "Successfully launching new pharmaceutical businesses and brands.",
  "Building and mentoring high-performing sales and leadership teams.",
  "Driving sustainable business growth across multiple regions.",
  "Developing strong customer-centric marketing strategies.",
  "Promoting a culture of ethics, accountability, and continuous learning.",
  "Championing quality-focused pharmaceutical practices with zero compromise.",
];

const sankarPrinciples = [
  {
    title: "Leadership Through Service",
    description:
      "True leadership begins by serving patients, healthcare professionals, employees, and society with sincerity and respect.",
  },
  {
    title: "Quality Without Compromise",
    description:
      "Every medicine carrying the Senovio name must meet stringent quality standards, ensuring safety, efficacy, and consistency.",
  },
  {
    title: "Ethical Growth",
    description:
      "Long-term success is founded on transparency, compliance, and responsible business practices rather than short-term gains.",
  },
  {
    title: "People First",
    description:
      "Employees, healthcare professionals, distributors, and patients form the foundation of Senovio's success.",
  },
];

const associateExpertise = [
  "Women's Healthcare",
  "Gynaecology",
  "Infertility & ART",
  "Clinical Research",
  "Pharmaceutical Marketing",
  "Medical Affairs",
  "Regulatory Affairs",
  "Quality Assurance",
  "Supply Chain",
  "Business Strategy",
];

export default function AboutPage() {
  return (
    <SenovioSiteLayout activePath="/about">
      <PageHero title="About Us" eyebrow="About Senovio Healthcare" image={heroImage}>
        <p>
          Transforming women's healthcare through specialized therapeutic solutions in Gynaecology
          and Infertility.
        </p>
      </PageHero>

      <Section tone="white">
        <div className="mx-auto max-w-5xl text-center">
          <SectionHeader centered eyebrow="WE CARE" title="About Senovio Healthcare" />
          <div className="space-y-6 text-lg leading-8 text-[#5a403c]">
            <p>
              Senovio Healthcare Private Limited is an emerging pharmaceutical company dedicated to
              transforming women's healthcare through specialized therapeutic solutions in
              Gynaecology and Infertility.
            </p>
            <p>
              The name Senovio reflects progress, innovation, vitality and a forward-looking vision
              for healthcare. It represents our unwavering commitment to improving reproductive
              health while nurturing hope for millions of families aspiring to experience
              parenthood.
            </p>
            <p>
              Healthcare is more than manufacturing medicines - it is about restoring confidence,
              creating possibilities and supporting life's most precious moments.
            </p>
            <p>
              We collaborate with leading manufacturing partners who adhere to stringent quality
              systems, ensuring that every product delivered reflects our uncompromising commitment
              to safety and effectiveness.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-[#e3beb8] bg-[#f6faff] p-6">
            <p className="font-serif text-3xl font-semibold text-[#610000]">WE CARE</p>
            <p className="mt-3 text-[#5a403c]">
              We aspire to become one of India's most trusted names in women's healthcare and
              reproductive medicine.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          centered
          eyebrow="Our Philosophy"
          title="Two words define our identity"
          description="Our philosophy extends beyond pharmaceuticals. It is about compassion, responsibility and creating healthier generations."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {philosophyCards.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-[#e3beb8] bg-white p-6 text-center text-sm font-semibold leading-6 text-[#5a403c] transition hover:-translate-y-1 hover:shadow-interactive"
            >
              <CheckCircle2 className="mx-auto mb-4 h-6 w-6 text-[#610000]" aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </Section>

      <Section tone="dark" className="overflow-hidden">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-lg bg-white p-7 text-[#141d23] shadow-ambient sm:p-8">
            <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#ffdad4]/40 text-[#610000]">
              <Sparkles className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-3xl font-medium text-[#141d23]">Vision</h2>
            <p className="mt-5 text-base leading-7 text-[#5a403c]">
              To become India's most trusted pharmaceutical company in Women's Healthcare and
              Fertility Management by delivering innovative, affordable and evidence-based
              therapeutic solutions that improve lives and create healthier families.
            </p>
          </article>

          <div>
            <SectionHeader inverse eyebrow="Mission" title="Our mission is to" />
            <ul className="grid gap-4 md:grid-cols-2">
              {missionItems.map((item) => (
                <li key={item} className="flex gap-3 rounded-lg bg-white/10 p-4 text-white/85">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ffb4a8]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader
          centered
          eyebrow="Our Core Values"
          title="The standards that guide every decision"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader centered eyebrow="Board of Directors" title="Leadership with purpose" />
        <div className="grid gap-8">
          <article className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-ambient sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#610000]">
                  Founder & Managing Director
                </p>
                <h2 className="mt-2 font-serif text-3xl font-medium text-[#141d23]">
                  Mr. Sankar Sen
                </h2>
              </div>
              <BriefcaseMedical className="h-10 w-10 text-[#610000]" aria-hidden="true" />
            </div>
            <p className="mt-6 text-base leading-7 text-[#5a403c]">
              Mr. Sankar Sen is the Founder and Managing Director of Senovio Healthcare Private
              Limited and a distinguished pharmaceutical professional with over 26 years of
              extensive experience in pharmaceutical sales, business development, strategic
              leadership, market expansion, and organizational development.
            </p>
            <p className="mt-4 text-base leading-7 text-[#5a403c]">
              Throughout his career, Mr. Sen has successfully built and led high-performing teams,
              launched new business divisions, expanded market presence across multiple regions, and
              developed long-lasting relationships with healthcare professionals.
            </p>
            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <div>
                <h3 className="font-serif text-xl font-medium text-[#141d23]">Achievements</h3>
                <ul className="mt-4 grid gap-3">
                  {sankarAchievements.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[#5a403c]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#610000]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#141d23]">
                  Leadership Principles
                </h3>
                <div className="mt-4 grid gap-3">
                  {sankarPrinciples.map((principle) => (
                    <div key={principle.title} className="rounded-lg bg-[#f6faff] p-4">
                      <p className="font-semibold text-[#610000]">{principle.title}</p>
                      <p className="mt-2 text-sm leading-6 text-[#5a403c]">
                        {principle.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <blockquote className="mt-7 rounded-lg border-l-4 border-[#610000] bg-[#ffdad4]/25 p-5 font-serif text-xl leading-8 text-[#141d23]">
              "Healthcare is not merely about medicines - it is about restoring hope, building
              trust, and improving lives. At Senovio Healthcare, every decision we make is guided by
              one simple philosophy: WE CARE."
            </blockquote>
          </article>

          <article className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-ambient sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#610000]">
                  Director, Finance & Administration
                </p>
                <h2 className="mt-2 font-serif text-3xl font-medium text-[#141d23]">
                  Mrs. Shipra Datta Sen
                </h2>
              </div>
              <ShieldCheck className="h-10 w-10 text-[#610000]" aria-hidden="true" />
            </div>
            <div className="mt-6 space-y-4 text-base leading-7 text-[#5a403c]">
              <p>
                Mrs. Shipra Datta Sen serves as the Director of Finance & Administration at Senovio
                Healthcare Private Limited, where she plays a pivotal role in establishing and
                strengthening the organization's financial systems, administrative operations, and
                governance framework.
              </p>
              <p>
                As one of the founding members of the company, Mrs. Sen has been instrumental in
                building a robust operational foundation that supports Senovio's vision of
                delivering high-quality healthcare solutions with integrity, efficiency, and
                accountability.
              </p>
              <p>
                Her leadership reflects the core values of Senovio Healthcare - integrity,
                responsibility, compassion, and excellence.
              </p>
            </div>
            <blockquote className="mt-7 rounded-lg border-l-4 border-[#610000] bg-[#ffdad4]/25 p-5 font-serif text-xl leading-8 text-[#141d23]">
              "Strong organizations are built through responsible stewardship, disciplined
              execution, and a genuine commitment to people. At Senovio Healthcare, every process,
              every decision, and every resource is managed with one purpose - to support better
              healthcare outcomes. Because We Care."
            </blockquote>
          </article>
        </div>
      </Section>

      <Section tone="dark">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            inverse
            eyebrow="Key Associates"
            title="A collaborative ecosystem for meaningful healthcare innovation"
            description="Our network of experienced professionals, scientific advisors, healthcare experts, and business associates contributes significantly to our pursuit of excellence."
          />
          <p className="text-base leading-7 text-white/80">
            Working together, we strive to strengthen clinical outcomes, support healthcare
            professionals, and improve the quality of life for women across every stage of their
            reproductive journey.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {associateExpertise.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
              >
                {item}
              </span>
            ))}
          </div>
          <blockquote className="mt-8 rounded-lg border border-white/15 bg-white/10 p-6 font-serif text-2xl leading-9 text-white">
            "Behind every successful therapy is a team united by knowledge, integrity, and
            compassion."
          </blockquote>
        </div>
      </Section>

      <Section tone="white">
        <SectionHeader
          centered
          eyebrow="Our Commitment"
          title="Delivering comprehensive pharmaceutical solutions with compassion and excellence"
          description="At Senovio Healthcare, our commitment extends far beyond delivering medicines."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <FeatureCard
            icon={<Stethoscope className="h-6 w-6" aria-hidden="true" />}
            title="Women's Healthcare Solutions"
            description="We specialize in developing and marketing pharmaceutical products that address the diverse healthcare needs of women throughout different stages of life - from reproductive health and fertility support to pregnancy care and hormonal wellness."
          />
          <FeatureCard
            icon={<FlaskConical className="h-6 w-6" aria-hidden="true" />}
            title="Infertility Management Portfolio"
            description="Our infertility portfolio is developed with scientific rigor, quality assurance, and patient-centric care to support fertility specialists, gynaecologists, and reproductive medicine experts."
          />
        </div>
      </Section>
    </SenovioSiteLayout>
  );
}
