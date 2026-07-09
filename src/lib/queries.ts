import { getPayload } from "./payload";

export type ProductData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  categorySlug: string;
  packSize: string;
  composition: string;
  effects: string;
  uses: string;
  sideEffects: string;
  highlights: string[];
  dosageForm: string | null;
  featured: boolean;
  order: number;
};

export type CategoryData = {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  order: number;
};

export type JobOpeningData = {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  responsibilities: string[];
  applicationEmail: string;
  externalApplicationUrl: string | null;
};

const bundledProductImageUrls: Record<string, string> = {
  "argivio-sachet": "/product-placeholder.png",
  "et-gest-sr-200mg": "/product-placeholder.png",
  "hicium-tablets": "/product-placeholder.png",
  "l-metio-d-capsules": "/product-placeholder.png",
  "senofert-f-tablets": "/product-placeholder.png",
  "senofert-m-tablets": "/product-placeholder.png",
};

const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const isConfiguredRemoteMediaUrl = (url: string) => {
  const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

  if (!r2PublicUrl || !isAbsoluteUrl(url)) {
    return false;
  }

  try {
    return new URL(url).origin === new URL(r2PublicUrl).origin;
  } catch {
    return false;
  }
};

const getMediaUrl = (
  image: { filename?: string | null; url?: string | null } | null,
  productSlug: string,
) => {
  if (image?.url && isConfiguredRemoteMediaUrl(image.url)) {
    return image.url;
  }

  const bundledImageUrl = bundledProductImageUrls[productSlug];

  if (bundledImageUrl) {
    return bundledImageUrl;
  }

  if (image?.url && !isAbsoluteUrl(image.url)) {
    return image.url;
  }

  if (image?.filename) {
    return `/media/${image.filename}`;
  }

  return "/senovio-logo.webp";
};

/**
 * Fetch all active products from Payload CMS.
 * Returns an empty array if the CMS has no products or on error.
 */
export async function getActiveProducts(): Promise<ProductData[]> {
  try {
    const payload = await getPayload();

    const result = await payload.find({
      collection: "products",
      depth: 1,
      limit: 100,
      sort: "order",
      where: {
        status: { equals: "active" },
      },
    });

    return result.docs.map((product) => {
      const category = typeof product.category === "object" ? product.category : null;
      const image = typeof product.image === "object" ? product.image : null;

      return {
        id: String(product.id),
        name: product.name,
        slug: product.slug,
        image: getMediaUrl(image, product.slug),
        category: category?.name ?? "Uncategorized",
        categorySlug: category?.slug ?? "uncategorized",
        packSize: product.packSize,
        composition: product.composition,
        effects: product.effects,
        uses: product.uses,
        sideEffects: product.sideEffects,
        highlights: (product.highlights ?? []).map(
          (highlight: { label: string; id?: string | null }) => highlight.label,
        ),
        dosageForm: product.dosageForm ?? null,
        featured: product.featured ?? false,
        order: product.order ?? 0,
      };
    });
  } catch (error) {
    console.error("Failed to fetch products from CMS.", error);
    return [];
  }
}

/**
 * Fetch all product categories from Payload CMS with product counts.
 * Returns an empty array if the CMS has no categories or on error.
 */
export async function getProductCategories(): Promise<CategoryData[]> {
  try {
    const payload = await getPayload();

    const result = await payload.find({
      collection: "product-categories",
      limit: 50,
      sort: "order",
    });

    const activeProducts = await payload.find({
      collection: "products",
      depth: 0,
      limit: 100,
      where: {
        status: { equals: "active" },
      },
    });

    const productCountByCategory = activeProducts.docs.reduce<Record<string, number>>(
      (counts, product) => {
        const categoryId = String(product.category);
        counts[categoryId] = (counts[categoryId] ?? 0) + 1;
        return counts;
      },
      {},
    );

    return result.docs.map((category) => ({
      id: String(category.id),
      name: category.name,
      slug: category.slug,
      productCount: productCountByCategory[String(category.id)] ?? 0,
      order: category.order ?? 0,
    }));
  } catch (error) {
    console.error("Failed to fetch product categories from CMS.", error);
    return [];
  }
}

/**
 * Fetch all published job openings from Payload CMS.
 * Returns an empty array if the CMS has no published openings or on error.
 */
export async function getPublishedJobOpenings(): Promise<JobOpeningData[]> {
  try {
    const payload = await getPayload();

    const result = await payload.find({
      collection: "job-openings",
      limit: 50,
      sort: "order",
      where: {
        status: { equals: "published" },
      },
    });

    return result.docs.map((opening) => ({
      id: String(opening.id),
      title: opening.title,
      department: opening.department,
      location: opening.location,
      employmentType: opening.employmentType,
      summary: opening.summary,
      responsibilities: (opening.responsibilities ?? []).map(
        (responsibility: { item: string; id?: string | null }) => responsibility.item,
      ),
      applicationEmail: opening.applicationEmail ?? "office@senovio.in",
      externalApplicationUrl: opening.externalApplicationUrl ?? null,
    }));
  } catch (error) {
    console.error("Failed to fetch job openings from CMS.", error);
    return [];
  }
}
