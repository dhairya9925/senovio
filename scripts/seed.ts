import { getPayload } from "payload";

import config from "../payload.config";

type JobOpeningSeed = {
  title: string;
  department: "Sales" | "Quality";
  location: string;
  employmentType: "Full-time";
  status: "published";
  summary: string;
  responsibilities: { item: string }[];
  applicationEmail: string;
  order: number;
};

const jobOpenings: JobOpeningSeed[] = [
  {
    title: "Medical Representative",
    department: "Sales",
    location: "Guwahati, Assam",
    employmentType: "Full-time",
    status: "published",
    summary:
      "Represent Senovio Healthcare in the field by building strong relationships with doctors, pharmacies, and healthcare partners.",
    responsibilities: [
      { item: "Promote assigned product portfolio with accurate product knowledge." },
      { item: "Plan regular doctor and retailer visits across the assigned territory." },
      { item: "Track market feedback, competitor activity, and monthly sales performance." },
    ],
    applicationEmail: "office@senovio.in",
    order: 1,
  },
  {
    title: "Quality Assurance Executive",
    department: "Quality",
    location: "Guwahati, Assam",
    employmentType: "Full-time",
    status: "published",
    summary:
      "Support quality documentation, vendor coordination, and process follow-ups to help maintain dependable pharmaceutical standards.",
    responsibilities: [
      { item: "Maintain quality records, product documentation, and compliance checklists." },
      { item: "Coordinate with manufacturing and distribution partners for quality updates." },
      { item: "Assist internal reviews and follow up on corrective actions when required." },
    ],
    applicationEmail: "office@senovio.in",
    order: 2,
  },
];

async function seed() {
  const payload = await getPayload({ config });

  console.log("Seeding job openings...");

  for (const opening of jobOpenings) {
    const existing = await payload.find({
      collection: "job-openings",
      limit: 1,
      where: { title: { equals: opening.title } },
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "job-openings",
        id: existing.docs[0].id,
        data: opening,
      });
    } else {
      await payload.create({
        collection: "job-openings",
        data: opening,
      });
    }

    console.log(`  - ${opening.title}`);
  }

  console.log(`\nSeed complete - ${jobOpenings.length} job openings.`);
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
