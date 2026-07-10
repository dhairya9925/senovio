import type { Metadata } from "next";
import { PageHero, SenovioSiteLayout, Section } from "@/components/SenovioSiteLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use for Senovio Healthcare Private Limited, including medical information disclaimer, intellectual property, user conduct, and jurisdiction.",
};

const termsSections = [
  {
    title: "1. Medical Information Disclaimer",
    body: [
      "The information provided on this website regarding pharmaceutical products is intended solely for educational and informational purposes and should not replace professional medical advice, diagnosis, or treatment. All medicines should be prescribed and used only under the supervision of a qualified registered medical practitioner, and patients should never self-medicate or alter their prescribed treatment without consulting their healthcare provider. Accordingly, Senovio Healthcare Private Limited does not assume responsibility for any consequences arising from the misuse of products or reliance on the information presented on this website. You should always consult your physician before beginning, stopping or changing any medical treatment.",
      "No Medical Advice: This Website does not provide medical diagnoses, treatment advice, or professional healthcare recommendations.",
      "Prescription Supervision: Senovio's products focus on specialized Gynecology, Fertility, and Women's Wellness. These are prescription medicines and must always be administered under the strict supervision of a qualified medical professional.",
    ],
  },
  {
    title: "2. Intellectual Property",
    body: [
      'All website content, including the "Senovio Healthcare" name, the "WE CARE" motto, logos, text, and layout, is the exclusive intellectual property of Senovio Healthcare Private Limited. You may view and download material for personal, non-commercial, or professional inquiry purposes only. Any unauthorized duplication or commercial exploitation is strictly prohibited.',
    ],
  },
  {
    title: "3. User Conduct and Form Submissions",
    body: ['When using our "Contact Us" page or communication channels, you agree not to:'],
    list: [
      "Submit fraudulent, false, or misleading identity or contact details.",
      "Transmit any malicious software, spam, or unlawful content through our forms or email links.",
      "Attempt to disrupt or compromise the hosting infrastructure of the Website.",
    ],
  },
  {
    title: "4. Third-Party Services",
    body: [
      "Our platform provides a direct communication feature via WhatsApp. Senovio does not own or operate WhatsApp. Your use of such external tools is entirely at your own discretion and subject to those platforms' independent terms of service.",
    ],
  },
  {
    title: "5. Limitation of Liability",
    body: [
      'This Website is provided as an informational portal on an "as-is" basis. Senovio Healthcare Private Limited makes no warranties regarding the absolute completeness of the text or uninterrupted availability of the platform. We shall not be held liable for any damages resulting from your use of, or reliance on, the information presented on this Website.',
    ],
  },
  {
    title: "6. Governing Law and Jurisdiction",
    body: [
      "These Terms are governed by the laws of India. Any legal disputes or claims arising out of your use of this Website shall fall under the exclusive jurisdiction of the courts in Guwahati, Assam, India.",
    ],
  },
  {
    title: "7. Contact Us",
    body: [
      "If you have any questions about these Terms, please contact us directly at office@senovio.in.",
    ],
  },
];

export default function TermsPage() {
  return (
    <SenovioSiteLayout activePath="/terms">
      <PageHero title="Terms of Use" eyebrow="Terms of Use" image="/page-header-bg-1-1.jpg">
        <p>Effective Date: July 9th, 2026</p>
      </PageHero>

      <Section tone="white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-[#e3beb8] bg-[#f6faff] p-6 text-base leading-7 text-[#5a403c] sm:p-8">
            <p>
              Welcome to the website of Senovio Healthcare Private Limited (&quot;Senovio&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). These Terms of Use
              (&quot;Terms&quot;) govern your access to and use of our informational website located
              at https://senovio.in (the &quot;Website&quot;). By browsing or interacting with this
              Website, you agree to these Terms.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {termsSections.map((section) => (
              <article
                key={section.title}
                className="rounded-lg border border-[#e3beb8] bg-white p-6 shadow-sm"
              >
                <h2 className="font-serif text-2xl font-medium text-[#141d23]">{section.title}</h2>
                <div className="mt-4 space-y-4 text-base leading-7 text-[#5a403c]">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.list && (
                    <ul className="grid gap-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </SenovioSiteLayout>
  );
}
