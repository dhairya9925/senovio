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

type GalleryItem = {
  image?: unknown;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === "object";

const getString = (value: unknown, fallback = "") => (typeof value === "string" ? value : fallback);

const getNumber = (value: unknown, fallback = 0) => (typeof value === "number" ? value : fallback);

const getBoolean = (value: unknown, fallback = false) =>
  typeof value === "boolean" ? value : fallback;

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

const getGalleryImageUrls = (gallery: unknown) =>
  (Array.isArray(gallery) ? (gallery as GalleryItem[]) : [])
    .map((galleryItem) => (isRecord(galleryItem.image) ? getMediaUrl(galleryItem.image) : null))
    .filter((galleryImage): galleryImage is string => Boolean(galleryImage));

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

    return result.docs.map((product): ProductData => {
      const productRecord: Record<string, unknown> = isRecord(product) ? product : {};
      const image = isRecord(productRecord.image) ? productRecord.image : null;
      const savedProductImages = getSavedProductImageUrls(product);
      const cmsGallery = getGalleryImageUrls(productRecord.gallery);
      const gallery = savedProductImages.length > 0 ? savedProductImages.slice(1) : cmsGallery;

      return {
        id: String(productRecord.id),
        name: getString(productRecord.name),
        slug: getString(productRecord.slug),
        image: savedProductImages[0] ?? getMediaUrl(image),
        gallery,
        packSize: getString(productRecord.packSize),
        composition: getString(productRecord.composition),
        effects: getString(productRecord.effects),
        uses: getString(productRecord.uses),
        sideEffects: getString(productRecord.sideEffects),
        highlights: (Array.isArray(productRecord.highlights) ? productRecord.highlights : []).map(
          (highlight: { label: string; id?: string | null }) => highlight.label,
        ),
        dosageForm: typeof productRecord.dosageForm === "string" ? productRecord.dosageForm : null,
        featured: getBoolean(productRecord.featured),
        order: getNumber(productRecord.order),
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

    return result.docs.map((opening): JobOpeningData => {
      const openingRecord: Record<string, unknown> = isRecord(opening) ? opening : {};

      return {
        id: String(openingRecord.id),
        title: getString(openingRecord.title),
        department: getString(openingRecord.department),
        location: getString(openingRecord.location),
        employmentType: getString(openingRecord.employmentType),
        summary: getString(openingRecord.summary),
        responsibilities: (Array.isArray(openingRecord.responsibilities)
          ? openingRecord.responsibilities
          : []
        ).map((responsibility: { item: string; id?: string | null }) => responsibility.item),
        applicationEmail: getString(openingRecord.applicationEmail, "office@senovio.in"),
        externalApplicationUrl:
          typeof openingRecord.externalApplicationUrl === "string"
            ? openingRecord.externalApplicationUrl
            : null,
      };
    });
  } catch (error) {
    console.error("Failed to fetch job openings from CMS.", error);
    return [];
  }
}
