import type { CollectionConfig } from "payload";
import { admins, anyone, authenticated } from "@/access/content";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const ProductCategories: CollectionConfig = {
  slug: "product-categories",
  access: {
    create: authenticated,
    delete: admins,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
    description: "Product categories for the pharmaceutical catalog.",
    defaultColumns: ["name", "slug", "order"],
    group: "Products",
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data.slug) {
          data.slug = toSlug(data.name);
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier. Auto-generated from name if left blank.",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first in sidebar.",
        position: "sidebar",
      },
    },
  ],
};
