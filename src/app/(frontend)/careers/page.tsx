import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import {
  PageHero,
  SenovioSiteLayout,
  Section,
  SectionHeader,
} from "@/components/SenovioSiteLayout";
import type { JobOpeningData } from "@/lib/queries";
import { getPublishedJobOpenings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Build your career with Senovio Healthcare and contribute to specialised women's healthcare.",
  openGraph: {
    title: "Careers - Senovio Healthcare",
    description:
      "Build your career with Senovio Healthcare and contribute to specialised women's healthcare.",
  },
  twitter: {
    card: "summary",
    title: "Careers - Senovio Healthcare",
    description:
      "Build your career with Senovio Healthcare and contribute to specialised women's healthcare.",
  },
};

const heroImage = "/about-hero.png";
const applicationEmail = "office@senovio.in";

const careerCareStatements = [
  "We care about your career.",
  "We care about your professional growth.",
  "We care about your ideas.",
  "We care about your future.",
];

const joinReasons = [
  {
    title: "Purpose-Driven Work",
    description:
      "Every role contributes towards improving women's health and helping families realize their dream of parenthood.",
    icon: HeartHandshake,
  },
  {
    title: "Continuous Learning",
    description:
      "Grow through product training, scientific updates, leadership development, and skill enhancement programs.",
    icon: GraduationCap,
  },
  {
    title: "Career Growth",
    description:
      "A merit-based culture creates opportunities across sales, marketing, medical affairs, operations, and leadership.",
    icon: TrendingUp,
  },
  {
    title: "Collaborative Culture",
    description:
      "Work in an environment built on mutual respect, teamwork, innovation, and open communication.",
    icon: UsersRound,
  },
  {
    title: "Ethical Workplace",
    description:
      "Integrity remains the foundation of how we work, grow, and build long-term healthcare relationships.",
    icon: ShieldCheck,
  },
];

const fallbackOpenings: JobOpeningData[] = [
  {
    id: "medical-representatives",
    title: "Medical Representatives",
    department: "Sales",
    location: "Multiple Territories",
    employmentType: "Full-time",
    summary:
      "Represent Senovio Healthcare with doctors, clinics, hospitals, and channel partners while building ethical field relationships.",
    responsibilities: [
      "Engage healthcare professionals with accurate product information.",
      "Build territory coverage with disciplined reporting and follow-up.",
      "Support distributor coordination and availability in assigned markets.",
    ],
    applicationEmail,
    externalApplicationUrl: null,
  },
  {
    id: "area-business-managers",
    title: "Area Business Managers",
    department: "Business Development",
    location: "Regional Markets",
    employmentType: "Full-time",
    summary:
      "Lead area-level sales execution, coach field teams, and strengthen Senovio's presence across specialised healthcare channels.",
    responsibilities: [
      "Drive area plans across gynaecology, fertility, and women's wellness segments.",
      "Mentor representatives through fieldwork, training, and performance reviews.",
      "Develop relationships with doctors, stockists, hospitals, and fertility centres.",
    ],
    applicationEmail,
    externalApplicationUrl: null,
  },
  {
    id: "regional-business-managers",
    title: "Regional Business Managers",
    department: "Leadership",
    location: "Assigned Region",
    employmentType: "Full-time",
    summary:
      "Shape regional growth with ethical business practices, strong team leadership, and market-focused execution.",
    responsibilities: [
      "Translate business strategy into regional priorities and measurable outcomes.",
      "Build high-performing teams through coaching, accountability, and scientific discipline.",
      "Strengthen long-term partnerships with key institutions and channel stakeholders.",
    ],
    applicationEmail,
    externalApplicationUrl: null,
  },
];

const applicantTraits = [
  "Believe in ethical healthcare.",
  "Possess strong communication skills.",
  "Demonstrate leadership potential.",
  "Have a passion for learning.",
  "Are committed to delivering excellence.",
  "Aspire to build a meaningful career in the pharmaceutical industry.",
];

const lifeValues = [
  "Respect",
  "Transparency",
  "Accountability",
  "Innovation",
  "Diversity",
  "Excellence",
];

export const revalidate = 60;

export default async function CareersPage() {
  const cmsOpenings = await getPublishedJobOpenings();
  const openings = cmsOpenings.length > 0 ? cmsOpenings : fallbackOpenings;

  return (
    <SenovioSiteLayout activePath="/careers">
      <PageHero
        title="Build Your Career. Build Better Healthcare."
        eyebrow="Join a Team That Truly Cares."
        image={heroImage}
      >
        <p>
          Grow with Senovio Healthcare and contribute to specialised care for women, families, and
          healthcare professionals.
        </p>
      </PageHero>

      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb4a8]">
              Careers at Senovio
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
              Exceptional healthcare begins with exceptional people.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-7 text-white/80">
              <p>
                At Senovio Healthcare Private Limited, our success is built on the passion,
                dedication, integrity, and expertise of our employees.
              </p>
              <p>
                We are creating an organization where individuals are empowered to innovate,
                collaborate, and grow while making a meaningful difference in the lives of patients
                and healthcare professionals.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 bg-white/10 p-6 backdrop-blur-sm">
            <p className="font-serif text-4xl font-medium text-white">WE CARE</p>
            <div className="mt-4 h-1 w-16 rounded-full bg-[#ffb4a8]" />
            <div className="mt-6 grid gap-3">
              {careerCareStatements.map((statement) => (
                <div key={statement} className="flex items-center gap-3 text-sm text-white/85">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ffb4a8]" aria-hidden="true" />
                  {statement}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Why Join Us"
          title="A place to learn, contribute, and grow"
          description="Senovio is building a workplace where purpose, scientific discipline, and ethical growth move together."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {joinReasons.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-ambient transition hover:-translate-y-1 hover:shadow-interactive"
            >
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded bg-[#ffdad4]/55 text-[#610000]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#141d23]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#5a403c]">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="Current Opportunities"
            title="Open roles for passionate professionals"
            description="We welcome people who want to grow through ethical healthcare work and responsible business practice."
            inverse
          />
          <a
            href={`mailto:${applicationEmail}?subject=Career application - Senovio Healthcare`}
            className="inline-flex w-fit items-center justify-center gap-2 rounded bg-[#610000] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#920703]"
          >
            Share Profile
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-5">
          {openings.map((opening) => (
            <article
              key={`${opening.title}-${opening.location}`}
              className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-ambient transition hover:-translate-y-1 hover:shadow-interactive sm:p-7"
            >
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                <div>
                  <span className="inline-flex rounded bg-[#ffdad4]/55 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#610000]">
                    {opening.department}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl font-medium text-[#141d23]">
                    {opening.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold text-[#5a403c]">
                    <span className="inline-flex items-center gap-2 rounded bg-[#f6faff] px-3 py-1.5">
                      <MapPin className="h-4 w-4 text-[#610000]" aria-hidden="true" />
                      {opening.location}
                    </span>
                    <span className="inline-flex rounded bg-[#f6faff] px-3 py-1.5">
                      {opening.employmentType}
                    </span>
                  </div>
                </div>
                <a
                  href={
                    opening.externalApplicationUrl ||
                    `mailto:${opening.applicationEmail}?subject=Application for ${encodeURIComponent(
                      opening.title,
                    )}`
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded bg-[#610000] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#920703]"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-6 max-w-4xl text-base leading-7 text-[#5a403c]">{opening.summary}</p>
              <ul className="mt-6 grid gap-3 rounded-lg border border-[#e3beb8] bg-[#f6faff] p-4 text-sm leading-6 text-[#5a403c]">
                {opening.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-[#610000]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1fr] lg:items-start">
          <div>
            <SectionHeader
              eyebrow="Who Should Apply?"
              title="People who combine ambition with ethics"
              description="We look for people who want their career to mean something in healthcare."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {applicantTraits.map((trait) => (
              <div
                key={trait}
                className="flex gap-4 rounded-lg border border-[#e3beb8] bg-[#f6faff] p-5 text-[#5a403c] shadow-sm"
              >
                <GraduationCap
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#610000]"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6">{trait}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="light">
        <SectionHeader
          eyebrow="Life at Senovio"
          title="Values that shape everyday work"
          description="Together, we create an environment where everyone can contribute, grow, and succeed."
          centered
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lifeValues.map((value, index) => {
            const icons = [UsersRound, Scale, BriefcaseBusiness, Lightbulb, Sparkles, ShieldCheck];
            const Icon = icons[index];

            return (
              <article
                key={value}
                className="flex items-center gap-4 rounded-lg border border-[#e3beb8] bg-white p-5 shadow-ambient"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-[#ffdad4]/55 text-[#610000]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#141d23]">{value}</h3>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="primary">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#ffb4a8]">
              Apply Today
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-white sm:text-4xl">
              Become part of Senovio Healthcare.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">
              Share your resume with our team and help shape the future of women's healthcare.
            </p>
          </div>
          <a
            href={`mailto:${applicationEmail}?subject=Career application - Senovio Healthcare`}
            className="inline-flex w-fit items-center justify-center gap-2 rounded bg-white px-5 py-3 text-sm font-semibold text-[#610000] shadow-md transition hover:-translate-y-0.5 hover:bg-[#ffdad4]"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {applicationEmail}
          </a>
        </div>
      </Section>
    </SenovioSiteLayout>
  );
}
