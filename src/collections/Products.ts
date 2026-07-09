import type { CollectionConfig } from "payload";
import { admins, anyone, authenticated } from "@/access/content";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: authenticated,
    delete: admins,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "name",
    description: "Pharmaceutical product catalog. Manage product details, images, and visibility.",
    defaultColumns: ["name", "category", "dosageForm", "status", "updatedAt"],
    group: "Products",
    listSearchableFields: ["name", "composition", "slug"],
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
        description: "URL-friendly identifier. Used for product detail page URL.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "product-categories",
      required: true,
      admin: {
        description: "Primary product category.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Product packaging image (shown on card and detail popup).",
      },
    },
    {
      name: "composition",
      type: "text",
      required: true,
      admin: {
        description:
          'Full composition text, e.g., "Montelukast Sodium and Levocetirizine Hydrochloride Tablets IP"',
      },
    },
    {
      name: "packSize",
      type: "text",
      required: true,
      admin: {
        description: 'e.g., "10 x 10 Tablets", "30 ml dry syrup"',
      },
    },
    {
      name: "dosageForm",
      type: "select",
      options: [
        { label: "Tablet", value: "tablet" },
        { label: "Capsule", value: "capsule" },
        { label: "Syrup", value: "syrup" },
        { label: "Dry Syrup", value: "dry-syrup" },
        { label: "Injection", value: "injection" },
        { label: "Cream", value: "cream" },
        { label: "Sachet", value: "sachet" },
        { label: "Gel", value: "gel" },
        { label: "Suppository", value: "suppository" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "effects",
      type: "textarea",
      required: true,
      admin: {
        description: 'How the medicine works. Shown in product detail popup under "Effects".',
      },
    },
    {
      name: "uses",
      type: "textarea",
      required: true,
      admin: {
        description: 'What the medicine is used for. Shown under "Uses".',
      },
    },
    {
      name: "sideEffects",
      type: "textarea",
      required: true,
      admin: {
        description: 'Potential side effects. Shown under "Side Effects".',
      },
    },
    {
      name: "highlights",
      type: "array",
      admin: {
        description:
          'Short tags shown as chips in the detail popup, e.g., "Allergy support", "Tablet format".',
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "shortDescription",
      type: "textarea",
      admin: {
        description: "Optional card-level summary (not currently used on frontend).",
      },
    },
    {
      name: "description",
      type: "richText",
      admin: {
        description: "Extended product detail content - for future product detail pages.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show this product on the homepage featured section.",
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Active", value: "active" },
        { label: "Discontinued", value: "discontinued" },
      ],
      defaultValue: "active",
      required: true,
      admin: {
        position: "sidebar",
        description: 'Only "Active" products appear on the public website.',
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Display order on the products page. Lower = first.",
      },
    },
    {
      name: "seo",
      type: "group",
      admin: {
        description: "Optional SEO overrides for product detail page.",
      },
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};
