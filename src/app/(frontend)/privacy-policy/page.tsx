import type { Metadata } from "next";
import { PageHero, SenovioSiteLayout, Section } from "@/components/SenovioSiteLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Senovio Healthcare Private Limited, including data collection, communication, retention, and grievance contact details.",
};

const privacySections = [
  {
    title: "1. No Automated Data Collection or Tracking",
    body: [
      "No Accounts: You do not need to create an account or log in to use our Website.",
      "No Cookies or Tracking: Our Website does not use tracking cookies, analytics pixels, or background tracking mechanisms to monitor your browsing behavior or collect your personal data automatically.",
    ],
  },
  {
    title: "2. Information Received via Direct Communication",
    body: [
      'The only information we receive is the data you voluntarily choose to provide when communicating with us through our "Contact Us" page, direct email (office@senovio.in), or by clicking our WhatsApp link. This may include:',
    ],
    list: [
      "Your Name",
      "Your Email Address or Phone Number",
      "Any professional or personal details you choose to include in your message or resume.",
    ],
    after:
      "We do not store this information in a website database. It is processed solely as an incoming email or message communication to address your specific inquiry, such as product orders, partnerships, or career opportunities.",
  },
  {
    title: "3. Use and Retention of Information",
    body: [
      "We use the information you send us strictly to respond to your inquiries or evaluate career applications. We do not use your contact details for unsolicited marketing lists. Your messages are retained within our secure business email/communication systems only for as long as necessary to fulfill your request or satisfy legal, accounting, or regulatory requirements.",
    ],
  },
  {
    title: "4. Disclosure and Sharing",
    body: [
      "We do not sell, rent, trade, or share your communication data with third parties. Your information is only accessed by authorized Senovio personnel who need it to respond to your query. We will only disclose your information outside our organization if required to do so by applicable Indian laws or government orders.",
    ],
  },
  {
    title: "5. Third-Party Links",
    body: [
      "Our Website includes a link to WhatsApp to facilitate quick communication. Once you leave our Website to use WhatsApp, your data is handled according to WhatsApp's own privacy policies. We do not control and are not responsible for third-party platforms.",
    ],
  },
  {
    title: "6. Grievance Officer",
    body: [
      "In compliance with the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, any queries or grievances regarding how we handle your communication data can be addressed to our Grievance Officer:",
    ],
    list: [
      "Name: Mr. Sankar Sen",
      "Address: Senovio Healthcare Private Limited, H.N. 19, G-1, Shanti Enclave, Maa Sarada Path, Binovanagar, Guwahati, Assam, 781018.",
      "Email: office@senovio.in",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <SenovioSiteLayout activePath="/privacy-policy">
      <PageHero title="Privacy Policy" eyebrow="Privacy Policy" image="/page-header-bg-1-1.jpg">
        <p>Effective Date: July 9th, 2026</p>
      </PageHero>

      <Section tone="white">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-[#e3beb8] bg-[#f6faff] p-6 text-base leading-7 text-[#5a403c] sm:p-8">
            <p>
              Senovio Healthcare Private Limited (&quot;Senovio&quot;, &quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) operates the website https://senovio.in (the
              &quot;Website&quot;). We believe in absolute data minimalism. This Privacy Policy
              informs you of our policies regarding the collection, use, and disclosure of personal
              data when you use our Website.
            </p>
          </div>

          <div className="mt-8 grid gap-6">
            {privacySections.map((section) => (
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
                  {section.after && <p>{section.after}</p>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Section>
    </SenovioSiteLayout>
  );
}
