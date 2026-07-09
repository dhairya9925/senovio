import { getPayload } from "payload";

import config from "../payload.config";
import {
  getActiveProducts,
  getProductCategories,
  getPublishedJobOpenings,
} from "../src/lib/queries";

async function verifyCMS() {
  const payload = await getPayload({ config });

  const [activeProducts, categories, media, publishedOpenings] = await Promise.all([
    payload.count({
      collection: "products",
      where: {
        status: { equals: "active" },
      },
    }),
    payload.count({
      collection: "product-categories",
    }),
    payload.count({
      collection: "media",
    }),
    payload.count({
      collection: "job-openings",
      where: {
        status: { equals: "published" },
      },
    }),
  ]);

  const checks = [
    ["active products", activeProducts.totalDocs, 6],
    ["product categories", categories.totalDocs, 5],
    ["media documents", media.totalDocs, 6],
    ["published job openings", publishedOpenings.totalDocs, 2],
  ] as const;

  for (const [label, actual, minimum] of checks) {
    if (actual < minimum) {
      throw new Error(`Expected at least ${minimum} ${label}, found ${actual}.`);
    }

    console.log(`${label}: ${actual}`);
  }

  const [frontendProducts, frontendCategories, frontendOpenings] = await Promise.all([
    getActiveProducts(),
    getProductCategories(),
    getPublishedJobOpenings(),
  ]);

  if (frontendProducts.length < 6) {
    throw new Error(`Expected frontend queries to return at least 6 products.`);
  }

  if (frontendCategories.length < 5) {
    throw new Error(`Expected frontend queries to return at least 5 categories.`);
  }

  if (frontendOpenings.length < 2) {
    throw new Error(`Expected frontend queries to return at least 2 job openings.`);
  }

  const r2PublicUrl = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, "");
  const unexpectedMediaUrl = frontendProducts.find((product) => {
    if (r2PublicUrl) {
      return !product.image.startsWith(`${r2PublicUrl}/`);
    }

    return product.image.startsWith("http://localhost");
  });

  if (unexpectedMediaUrl) {
    throw new Error(
      r2PublicUrl
        ? `Expected product media URLs to use ${r2PublicUrl}. Found ${unexpectedMediaUrl.image}.`
        : `Expected product media URLs to be same-origin paths. Found ${unexpectedMediaUrl.image}.`,
    );
  }

  console.log(`frontend products: ${frontendProducts.length}`);
  console.log(`frontend categories: ${frontendCategories.length}`);
  console.log(`frontend job openings: ${frontendOpenings.length}`);
  console.log("CMS verification passed.");
}

verifyCMS()
  .then(() => process.exit(0))
  .catch((error: unknown) => {
    console.error("CMS verification failed:", error);
    process.exit(1);
  });
