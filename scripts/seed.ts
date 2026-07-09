import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import { fileURLToPath } from "url";

import config from "../payload.config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, "..");

const categories = [
  { name: "Infertility Management", slug: "infertility-management", order: 1 },
  { name: "Pregnancy Care", slug: "pregnancy-care", order: 2 },
  { name: "Hormonal Health", slug: "hormonal-health", order: 3 },
  { name: "Women's Wellness", slug: "womens-wellness", order: 4 },
] as const;

type ProductSeed = {
  name: string;
  slug: string;
  imageFilename: string;
  category: string;
  packSize: string;
  composition: string;
  effects: string;
  uses: string;
  sideEffects: string;
  highlights: string[];
  dosageForm:
    | "tablet"
    | "capsule"
    | "syrup"
    | "dry-syrup"
    | "injection"
    | "cream"
    | "sachet"
    | "gel"
    | "suppository";
  order: number;
};

const products: ProductSeed[] = [
  {
    name: "ARGIVIO Sachet",
    slug: "argivio-sachet",
    imageFilename: "product-placeholder.png",
    category: "Pregnancy Care",
    packSize: "Sachet",
    composition: "L-Arginine, Zinc, and Folic Acid",
    effects:
      "In pregnancy, L-Arginine is sometimes recommended by doctors to help optimize placental blood flow and support healthy fetal growth. Zinc and Folic Acid further assist cell growth and immunity.",
    uses: "Dissolve the sachet in a glass of water and consume only as directed by a qualified healthcare professional.",
    sideEffects:
      "Store below 25°C, away from direct sunlight and moisture. Keep out of reach of children.",
    highlights: ["Sugar-free", "Cranberry flavour", "Pregnancy support"],
    dosageForm: "sachet",
    order: 1,
  },
  {
    name: "E2VAL 2 Tablets",
    slug: "e2val-2-tablets",
    imageFilename: "product-placeholder.png",
    category: "Hormonal Health",
    packSize: "10 x 10 Tablets",
    composition: "Estradiol Valerate Tablets USP (2 mg)",
    effects:
      "Estradiol is a form of estrogen. In fertility care, it is commonly used to help thicken the lining of the uterus before an embryo transfer or to support early hormonal balance in assisted reproductive technologies (ART).",
    uses: "Use strictly as prescribed by a registered medical practitioner. Do not start, stop, or alter treatment without professional advice.",
    sideEffects:
      "Schedule H Prescription Drug: Must only be taken under strict medical supervision and cannot be purchased without a valid doctor's prescription. Store protected from light and moisture at a temperature not exceeding 30°C.",
    highlights: ["Prescription only", "Estradiol 2mg", "Hormonal balance"],
    dosageForm: "tablet",
    order: 2,
  },
  {
    name: "ET-Gest Vaginal Gel (8% w/w)",
    slug: "et-gest-vaginal-gel",
    imageFilename: "product-placeholder.png",
    category: "Hormonal Health",
    packSize: "Prefilled Applicator (90 mg)",
    composition: "Progesterone IP 8.0% w/w (Natural Micronised) in a gel base",
    effects:
      "A hormonal gel vital for regulating the uterine lining and supporting early pregnancy or menstrual cycles. Intended for vaginal use only.",
    uses: "Administer using the provided prefilled applicators exactly as directed by your physician. Refer to the package insert for step-by-step instructions.",
    sideEffects: "Store in a cool place. Do not freeze.",
    highlights: ["Vaginal use only", "Natural Micronised", "Prefilled applicators"],
    dosageForm: "gel",
    order: 3,
  },
  {
    name: "ET-Gest SR Tablets (200 mg / 300 mg)",
    slug: "et-gest-sr-tablets",
    imageFilename: "product-placeholder.png",
    category: "Hormonal Health",
    packSize: "Tablets",
    composition: "Progesterone Sustained Release (Available in 200 mg and 300 mg strengths)",
    effects:
      "A slow-release form of natural progesterone used to treat hormonal imbalances causing irregular menstrual cycles or a short luteal phase, supporting the early uterine environment required to achieve and maintain pregnancy.",
    uses: "Use strictly as prescribed by a registered medical practitioner.",
    sideEffects: "Store away from light and moisture, and strictly out of reach of children.",
    highlights: ["Sustained release", "Hormonal support", "Multiple strengths"],
    dosageForm: "tablet",
    order: 4,
  },
  {
    name: "HICIUM Tablets",
    slug: "hicium-tablets",
    imageFilename: "product-placeholder.png",
    category: "Women's Wellness",
    packSize: "Tablets",
    composition: "Calcium Citrate Malate (Elemental Calcium 500 mg) and Vitamin D3 (2000 IU)",
    effects:
      "Ensures adequate calcium delivery to protect maternal bone density while supporting fetal bone and skeletal development during pregnancy.",
    uses: "Take only in the dose and duration advised by your physician or obstetrician.",
    sideEffects: "Store in a cool, dry place protected from light and moisture.",
    highlights: ["Calcium support", "Vitamin D3", "Wellness care"],
    dosageForm: "tablet",
    order: 5,
  },
  {
    name: "L-METIO Tablets",
    slug: "l-metio-tablets",
    imageFilename: "product-placeholder.png",
    category: "Pregnancy Care",
    packSize: "Tablets",
    composition: "Methylcobalamin, L-Methylfolate Calcium, and Pyridoxal-5-Phosphate",
    effects:
      "Provides active forms of vitamins B12, B9 (folate), and B6 to support healthy blood formation, nerve function, and cellular division. Often preferred for individuals with absorption difficulties.",
    uses: "Take only as directed by your physician.",
    sideEffects: "Store in a cool, dry place protected from light and moisture.",
    highlights: ["Active B-vitamins", "Methylfolate", "Cellular support"],
    dosageForm: "tablet",
    order: 6,
  },
  {
    name: "L-METIO D Capsules",
    slug: "l-metio-d-capsules",
    imageFilename: "product-placeholder.png",
    category: "Pregnancy Care",
    packSize: "Capsules",
    composition:
      "L-Methylfolate Calcium (1 mg), Methylcobalamin (1500 mcg), Pyridoxal-5-Phosphate (0.5 mg), DHA 40% (200 mg), and Vitamin D3 (2000 IU)",
    effects:
      "An advanced, all-in-one prenatal supplement providing bioactive folate to prevent neural tube defects, along with DHA essential for healthy development of the baby's brain, nervous system, and eyes.",
    uses: "Use as advised by a qualified healthcare professional, especially during pregnancy or fertility treatment.",
    sideEffects: "Store protected from light and moisture at a temperature not exceeding 25°C.",
    highlights: ["Prenatal support", "DHA", "Bioactive folate"],
    dosageForm: "capsule",
    order: 7,
  },
  {
    name: "L-METIO GM Tablets",
    slug: "l-metio-gm-tablets",
    imageFilename: "product-placeholder.png",
    category: "Pregnancy Care",
    packSize: "Tablets",
    composition:
      "Doxylamine Succinate, L-Methylfolate Calcium, Pyridoxal-5-Phosphate, and Mecobalamin",
    effects:
      "A combination first-line medication designed to treat and manage nausea and vomiting during pregnancy (morning sickness) while delivering active B-vitamins.",
    uses: "Take exactly as directed by your obstetrician.",
    sideEffects: "Store protected from light and moisture, out of reach of children.",
    highlights: ["Morning sickness relief", "Active B-vitamins", "Pregnancy care"],
    dosageForm: "tablet",
    order: 8,
  },
  {
    name: "Pregiron Tablets",
    slug: "pregiron-tablets",
    imageFilename: "product-placeholder.png",
    category: "Pregnancy Care",
    packSize: "Tablets",
    composition:
      "Ferrous Asparto Glycinate (Elemental Iron 100 mg), Calcium L-5 Methyltetrahydrofolate (300 mcg), and Mecobalamin (500 mcg)",
    effects:
      "A specialized iron and vitamin supplement designed to treat or prevent iron-deficiency anemia during pregnancy, featuring highly absorbable iron and active folate/B12.",
    uses: "Take only in the dose and duration advised by your physician.",
    sideEffects: "Store in a cool, dry, and dark place. Protect from direct sunlight.",
    highlights: ["Highly absorbable iron", "Anemia support", "Bioactive folate"],
    dosageForm: "tablet",
    order: 9,
  },
  {
    name: "Senofert-F Tablets",
    slug: "senofert-f-tablets",
    imageFilename: "product-placeholder.png",
    category: "Infertility Management",
    packSize: "Tablets",
    composition:
      "Myo-Inositol, Para-Aminobenzoic Acid (PABA), L-Arginine, Co-Enzyme Q10, Multivitamins, and Multiminerals",
    effects:
      "A female fertility supplement designed to support ovarian function, egg quality, and metabolic factors in conditions like PCOS.",
    uses: "One or two tablets daily after meals, or as recommended by a healthcare professional.",
    sideEffects:
      "Not for medicinal use; it is a dietary supplement. Store as directed on the pack.",
    highlights: ["Female fertility", "PCOS support", "CoQ10 & Inositol"],
    dosageForm: "tablet",
    order: 10,
  },
  {
    name: "Senofert-M Tablets",
    slug: "senofert-m-tablets",
    imageFilename: "product-placeholder.png",
    category: "Infertility Management",
    packSize: "Tablets",
    composition:
      "L-Carnitine L-Tartarate (300 mg), Co-Enzyme Q10 (100 mg), Zinc (12.5 mg), Astaxanthin, Piperine, Lycopene, and Selenium",
    effects:
      "A specialized male fertility supplement featuring antioxidants and nutrients to support sperm count, motility, and morphology while protecting against oxidative stress.",
    uses: "One or two tablets daily after meals, or as recommended by a healthcare professional.",
    sideEffects:
      "Not for medicinal use; it is a dietary supplement. Store as directed on the pack.",
    highlights: ["Male fertility", "Antioxidant support", "L-Carnitine & CoQ10"],
    dosageForm: "tablet",
    order: 11,
  },
  {
    name: "Senovit Tablets",
    slug: "senovit-tablets",
    imageFilename: "product-placeholder.png",
    category: "Women's Wellness",
    packSize: "Tablets",
    composition:
      "Methylcobalamin, Alpha Lipoic Acid, Thiamine Mononitrate, Pyridoxine Hydrochloride, and Folic Acid",
    effects:
      "Provides neuroprotective antioxidants and B-vitamins to support neurological health and cellular wellness.",
    uses: "Evaluate individually with your specialist before starting, especially during pregnancy or fertility treatments.",
    sideEffects: "Store in a cool, dry place protected from light and moisture.",
    highlights: ["Alpha Lipoic Acid", "B-complex vitamins", "Neuro support"],
    dosageForm: "tablet",
    order: 12,
  },
  {
    name: "Sildovio Tablets",
    slug: "sildovio-tablets",
    imageFilename: "product-placeholder.png",
    category: "Infertility Management",
    packSize: "Tablets",
    composition: "Sildenafil Citrate Tablets IP",
    effects:
      "Used under specialist guidance (sometimes off-label as a vaginal suppository) to help optimize blood flow to the uterus, supporting patients with a thin uterine lining.",
    uses: "Take strictly as prescribed and supervised by a registered medical practitioner.",
    sideEffects:
      "Warning: Must be taken strictly under medical guidance. Can interact significantly with nitrates.",
    highlights: ["Thin lining support", "Uterine blood flow", "Doctor supervised"],
    dosageForm: "tablet",
    order: 13,
  },
  {
    name: "VVC Vaginal Suppository",
    slug: "vvc-vaginal-suppository",
    imageFilename: "product-placeholder.png",
    category: "Women's Wellness",
    packSize: "Suppositories",
    composition: "Sodi Biboras (Suhaga/Boric Acid) 600 mg in a mineral/gel cap base",
    effects:
      "A vaginal suppository designed to replenish normal vaginal acidity, balance healthy vaginal flora, and prevent vaginal infections.",
    uses: "Administer vaginally exactly as directed. Refer to package insert for instructions.",
    sideEffects: "For vaginal use only. Do not swallow. Store in a cool, dry place.",
    highlights: ["Vaginal acidity", "Infection prevention", "Flora balance"],
    dosageForm: "suppository",
    order: 14,
  },
];

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

  // ── Categories ─────────────────────────────────────
  console.log("Seeding product categories...");
  const categoryMap = new Map<string, number>();

  for (const category of categories) {
    const existing = await payload.find({
      collection: "product-categories",
      limit: 1,
      where: { slug: { equals: category.slug } },
    });

    const doc =
      existing.docs[0] ??
      (await payload.create({
        collection: "product-categories",
        data: category,
      }));

    if (existing.docs[0]) {
      await payload.update({
        collection: "product-categories",
        id: doc.id,
        data: category,
      });
    }

    categoryMap.set(category.name, Number(doc.id));
    console.log(`  ✓ ${category.name}`);
  }

  // ── Media ──────────────────────────────────────────
  console.log("\nSeeding media...");
  const mediaMap = new Map<string, number>();

  for (const product of products) {
    const filePath = path.join(rootDir, "public", "products", product.imageFilename);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing product image: ${filePath}`);
    }

    const existing = await payload.find({
      collection: "media",
      limit: 1,
      where: { filename: { equals: product.imageFilename } },
    });

    const media =
      existing.docs[0] ??
      (await payload.create({
        collection: "media",
        data: {
          alt: `${product.name} packaging`,
        },
        filePath,
      }));

    if (existing.docs[0]) {
      await payload.update({
        collection: "media",
        id: media.id,
        data: {
          alt: `${product.name} packaging`,
        },
      });
    }

    mediaMap.set(product.imageFilename, Number(media.id));
    console.log(`  ✓ ${product.imageFilename}`);
  }

  // ── Products ───────────────────────────────────────
  console.log("\nSeeding products...");

  for (const product of products) {
    const categoryId = categoryMap.get(product.category);
    const mediaId = mediaMap.get(product.imageFilename);

    if (!categoryId || !mediaId) {
      throw new Error(`Missing relation for product: ${product.name}`);
    }

    const data = {
      name: product.name,
      slug: product.slug,
      category: categoryId,
      image: mediaId,
      packSize: product.packSize,
      composition: product.composition,
      effects: product.effects,
      uses: product.uses,
      sideEffects: product.sideEffects,
      highlights: product.highlights.map((label) => ({ label })),
      dosageForm: product.dosageForm,
      featured: false,
      status: "active" as const,
      order: product.order,
    };

    const existing = await payload.find({
      collection: "products",
      limit: 1,
      where: { slug: { equals: product.slug } },
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "products",
        id: existing.docs[0].id,
        data,
      });
    } else {
      await payload.create({
        collection: "products",
        data,
      });
    }

    console.log(`  ✓ ${product.name}`);
  }

  // ── Job Openings ───────────────────────────────────
  console.log("\nSeeding job openings...");

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

    console.log(`  ✓ ${opening.title}`);
  }

  console.log("\n✅ Seed complete — 10 products, 5 categories, 2 job openings.");
}

seed()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
