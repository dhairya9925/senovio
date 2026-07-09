import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import { fileURLToPath } from "url";

import config from "../payload.config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const rootDir = path.resolve(dirname, "..");
const productsDir = path.join(rootDir, "public", "products");

const requiredEnv = [
  "S3_ENDPOINT",
  "S3_ACCESS_KEY_ID",
  "S3_SECRET_ACCESS_KEY",
  "S3_BUCKET",
  "NEXT_PUBLIC_R2_PUBLIC_URL",
] as const;

const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"]);

const contentTypes: Record<string, string> = {
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function requireR2Env() {
  const missing = requiredEnv.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing R2 environment variables: ${missing.join(", ")}`);
  }

  const endpoint = new URL(process.env.S3_ENDPOINT!);

  if (!endpoint.hostname.endsWith(".r2.cloudflarestorage.com")) {
    throw new Error(
      "S3_ENDPOINT must be the Cloudflare R2 S3 API endpoint, not the public r2.dev/custom domain.",
    );
  }
}

function getImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return getImageFiles(entryPath);
      }

      return imageExtensions.has(path.extname(entry.name).toLowerCase()) ? [entryPath] : [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function getAltText(fileName: string) {
  return `${path
    .basename(fileName, path.extname(fileName))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()} packaging`;
}

async function uploadProductImages() {
  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
    },
    endpoint: process.env.S3_ENDPOINT!,
    forcePathStyle: true,
    region: process.env.S3_REGION || "auto",
  });

  const files = getImageFiles(productsDir);

  console.log(`Uploading ${files.length} product images to R2...`);

  for (const filePath of files) {
    const key = path.basename(filePath);
    const extension = path.extname(filePath).toLowerCase();

    try {
      await client.send(
        new PutObjectCommand({
          Body: fs.readFileSync(filePath),
          Bucket: process.env.S3_BUCKET!,
          ContentType: contentTypes[extension] ?? "application/octet-stream",
          Key: key,
        }),
      );
    } catch (error) {
      if (error && typeof error === "object" && "Code" in error && error.Code === "AccessDenied") {
        throw new Error(
          [
            `R2 denied write access while uploading ${key}.`,
            `Bucket: ${process.env.S3_BUCKET}`,
            `Endpoint: ${process.env.S3_ENDPOINT}`,
            "Create or update the R2 API token in Cloudflare R2 > Manage R2 API Tokens with Object Read & Write permission for this bucket.",
          ].join("\n"),
          { cause: error },
        );
      }

      throw error;
    }

    console.log(`  ✓ ${key}`);
  }
}

async function syncPayloadProductMedia() {
  const payload = await getPayload({ config });
  const productImages = getImageFiles(productsDir);
  const mediaBySlug = new Map<string, number>();

  console.log(`\nSyncing ${productImages.length} product media documents through Payload...`);

  for (const filePath of productImages) {
    const mediaFilename = path.basename(filePath);
    const productSlug = path.basename(filePath, path.extname(filePath));
    const alt = getAltText(mediaFilename);

    const existing = await payload.find({
      collection: "media",
      limit: 1,
      where: {
        filename: {
          equals: mediaFilename,
        },
      },
    });

    const media = existing.docs[0]
      ? await payload.update({
          collection: "media",
          data: { alt },
          filePath,
          id: existing.docs[0].id,
          overwriteExistingFiles: true,
        })
      : await payload.create({
          collection: "media",
          data: { alt },
          filePath,
        });

    mediaBySlug.set(productSlug, Number(media.id));
    console.log(`  ✓ ${mediaFilename}`);
  }

  console.log(`\nLinking product records to their matching media...`);

  for (const [slug, mediaId] of mediaBySlug) {
    const product = await payload.find({
      collection: "products",
      limit: 1,
      where: {
        slug: {
          equals: slug,
        },
      },
    });

    if (!product.docs[0]) {
      console.log(`  - skipped ${slug}: no matching product`);
      continue;
    }

    await payload.update({
      collection: "products",
      data: {
        image: mediaId,
      },
      id: product.docs[0].id,
    });

    console.log(`  ✓ ${slug} -> ${mediaId}`);
  }
}

async function main() {
  requireR2Env();

  await uploadProductImages();
  await syncPayloadProductMedia();

  console.log("\nR2 asset sync complete.");
  console.log(`Public base URL: ${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
