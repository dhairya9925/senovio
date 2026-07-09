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
    imageSizes: [
      { name: "thumbnail", width: 150, height: 150, position: "centre" },
      { name: "card", width: 370, height: 290, position: "centre" },
      { name: "product", width: 570, height: 570, position: "centre" },
    ],
    mimeTypes: ["image/*"],
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
