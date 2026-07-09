import { getPayload } from "./payload";

export type ProductData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  gallery: string[];
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

type MediaLike = {
  filename?: unknown;
  url?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object";

const getMediaUrl = (image: MediaLike | null | undefined) => {
  const url = typeof image?.url === "string" ? image.url : null;
  const filename = typeof image?.filename === "string" ? image.filename : null;

  if (url && isConfiguredRemoteMediaUrl(url)) {
    return url;
  }

  if (url && !isAbsoluteUrl(url)) {
    return url;
  }

  if (filename) {
    return `/media/${filename}`;
  }

  return "/senovio-logo.webp";
};

type ProductImageRow = {
  image?: unknown;
  isCover?: boolean | null;
  fromLegacy?: boolean | null;
};

const getSavedProductImageUrls = (product: unknown) => {
  const productImages =
    isRecord(product) && Array.isArray(product.productImages)
      ? (product.productImages as ProductImageRow[])
      : [];
  const savedProductImages = productImages.filter((item) => item.image && !item.fromLegacy);

  if (savedProductImages.length === 0) {
    return [];
  }

  const coverIndex = savedProductImages.findIndex((item) => item.isCover);
  const orderedImages =
    coverIndex > 0
      ? [
          savedProductImages[coverIndex],
          ...savedProductImages.filter((_, index) => index !== coverIndex),
        ]
      : savedProductImages;

  return orderedImages
    .map((item) => (isRecord(item.image) ? getMediaUrl(item.image) : null))
    .filter((imageUrl): imageUrl is string => Boolean(imageUrl));
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
      const image = typeof product.image === "object" ? product.image : null;
      const savedProductImages = getSavedProductImageUrls(product);
      const cmsGallery = (product.gallery ?? [])
        .map((galleryItem) =>
          typeof galleryItem.image === "object" ? getMediaUrl(galleryItem.image) : null,
        )
        .filter((galleryImage): galleryImage is string => Boolean(galleryImage));
      const gallery = savedProductImages.length > 0 ? savedProductImages.slice(1) : cmsGallery;

      return {
        id: String(product.id),
        name: product.name,
        slug: product.slug,
        image: savedProductImages[0] ?? getMediaUrl(image),
        gallery,
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
