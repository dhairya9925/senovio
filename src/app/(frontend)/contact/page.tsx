import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import LeafletMap from "@/components/LeafletMapDynamic";
import {
  ContactInfoCard,
  PageHero,
  SenovioSiteLayout,
  Section,
  SectionHeader,
} from "@/components/SenovioSiteLayout";
import { companyAddress, companyAddressInline, companyEmail, companyPhone } from "@/lib/company";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Senovio Healthcare for product inquiries, distribution, partnerships, and careers.",
  openGraph: {
    title: "Contact Us - Senovio Healthcare",
    description:
      "Contact Senovio Healthcare for product inquiries, distribution, partnerships, and careers.",
  },
  twitter: {
    card: "summary",
    title: "Contact Us - Senovio Healthcare",
    description:
      "Contact Senovio Healthcare for product inquiries, distribution, partnerships, and careers.",
  },
};

const heroImage = "/hero-4.png";

const labImage = "/man-contact.png";
const guwahatiLat = 26.1516125;
const guwahatiLng = 91.742828125;
const mapsLink = "https://maps.app.goo.gl/8ALxSbh9yqGmdqxv6";

export default function ContactPage() {
  return (
    <SenovioSiteLayout activePath="/contact">
      <PageHero title="Contact" eyebrow="Get In Touch" image={heroImage}>
        <p>
          Reach our team for product inquiries, distribution, partnerships, and career
          opportunities.
        </p>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-5">
            <ContactInfoCard
              icon={<Phone className="h-5 w-5" aria-hidden="true" />}
              label="Phone"
              value={companyPhone}
              href="tel:+916900992126"
            />
            <ContactInfoCard
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
              label="Email"
              value={companyEmail}
              href={`mailto:${companyEmail}`}
            />
            <ContactInfoCard
              icon={<MapPin className="h-5 w-5" aria-hidden="true" />}
              label="Location"
              value={companyAddress}
              href={mapsLink}
            />
            <Image
              src={labImage}
              width={600}
              height={288}
              alt=""
              className="h-72 w-full rounded-lg object-cover shadow-sm"
            />
          </div>

          <div className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-ambient">
            <SectionHeader eyebrow="Contact Us" title="We'd love to hear from you" />
            <ContactForm />
          </div>
        </div>
      </Section>

      <section className="relative h-[400px] overflow-hidden">
        <LeafletMap
          lat={guwahatiLat}
          lng={guwahatiLng}
          zoom={17}
          popupText={companyAddressInline}
        />
      </section>
    </SenovioSiteLayout>
  );
}
