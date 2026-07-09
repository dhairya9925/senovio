import type { CollectionConfig } from "payload";
import { admins, anyone, authenticated } from "@/access/content";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: admins,
    read: anyone,
    update: authenticated,
  },
  upload: {
    staticDir: "media",
    formatOptions: {
      format: "webp",
      options: {
        effort: 4,
        quality: 82,
      },
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 150,
        height: 150,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: {
            effort: 4,
            quality: 82,
          },
        },
      },
      {
        name: "card",
        width: 370,
        height: 290,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: {
            effort: 4,
            quality: 82,
          },
        },
      },
      {
        name: "product",
        width: 570,
        height: 570,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: {
            effort: 4,
            quality: 82,
          },
        },
      },
    ],
    mimeTypes: ["image/jpeg", "image/png", "image/webp"],
    adminThumbnail: "thumbnail",
  },
  admin: {
    description: "Upload and manage images for products, blog posts, and other content.",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Descriptive alt text for accessibility.",
      },
    },
    {
      name: "caption",
      type: "text",
    },
  ],
};
