import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { JobOpenings } from "./src/collections/JobOpenings";
import { Media } from "./src/collections/Media";
import { ProductCategories } from "./src/collections/ProductCategories";
import { Products } from "./src/collections/Products";
import { Users } from "./src/collections/Users";
import { SiteSettings } from "./src/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const r2Config = {
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  bucket: process.env.S3_BUCKET,
  endpoint: process.env.S3_ENDPOINT,
  publicUrl: process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
  region: process.env.S3_REGION ?? "auto",
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
};

const isR2Configured = Boolean(
  r2Config.accessKeyId &&
  r2Config.bucket &&
  r2Config.endpoint &&
  r2Config.publicUrl &&
  r2Config.secretAccessKey,
);

const getR2FileUrl = ({ filename, prefix }: { filename: string; prefix?: string }) => {
  if (!r2Config.publicUrl) {
    return `/media/${filename}`;
  }

  const key = [prefix, filename]
    .filter(Boolean)
    .join("/")
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${r2Config.publicUrl.replace(/\/$/, "")}/${key}`;
};

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " - Senovio Healthcare Admin",
    },
  },
  collections: [Users, Media, ProductCategories, Products, JobOpenings],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
      max: Number(process.env.DATABASE_POOL_MAX ?? 5),
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings],
  plugins: [
    s3Storage({
      bucket: r2Config.bucket ?? "",
      collections: {
        media: {
          generateFileURL: getR2FileUrl,
        },
      },
      config: {
        credentials: {
          accessKeyId: r2Config.accessKeyId ?? "",
          secretAccessKey: r2Config.secretAccessKey ?? "",
        },
        endpoint: r2Config.endpoint,
        forcePathStyle: true,
        region: r2Config.region,
      },
      enabled: isR2Configured,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "development-payload-secret-change-before-production",
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
