import type { CollectionConfig } from "payload";
import { admins, anyone, authenticated } from "@/access/content";

export const JobOpenings: CollectionConfig = {
  slug: "job-openings",
  access: {
    create: authenticated,
    delete: admins,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
    description: "Manage career openings shown on the Careers page.",
    defaultColumns: ["title", "department", "location", "status", "updatedAt"],
    group: "Careers",
    listSearchableFields: ["title", "department", "location"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: 'Job title, e.g., "Medical Representative", "Quality Assurance Executive"',
      },
    },
    {
      name: "department",
      type: "select",
      required: true,
      options: [
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "Operations", value: "Operations" },
        { label: "Quality", value: "Quality" },
        { label: "Distribution", value: "Distribution" },
        { label: "Administration", value: "Administration" },
        { label: "Research & Development", value: "Research & Development" },
      ],
      admin: {
        description: "Department this role belongs to.",
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
      defaultValue: "Guwahati, Assam",
      admin: {
        description: 'Job location, e.g., "Guwahati, Assam"',
      },
    },
    {
      name: "employmentType",
      type: "select",
      required: true,
      defaultValue: "Full-time",
      options: [
        { label: "Full-time", value: "Full-time" },
        { label: "Part-time", value: "Part-time" },
        { label: "Contract", value: "Contract" },
        { label: "Internship", value: "Internship" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: {
        description: "Brief role summary shown on the careers page card.",
      },
    },
    {
      name: "responsibilities",
      type: "array",
      required: true,
      minRows: 1,
      admin: {
        description: "Key responsibilities shown as bullet points on the careers page.",
      },
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "qualifications",
      type: "array",
      admin: {
        description: "Optional: Required qualifications for the role.",
      },
      fields: [
        {
          name: "item",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "applicationEmail",
      type: "email",
      defaultValue: "office@senovio.in",
      admin: {
        description: 'Email address for applications. Used in "Apply Now" mailto link.',
        position: "sidebar",
      },
    },
    {
      name: "externalApplicationUrl",
      type: "text",
      admin: {
        description: "Optional: External job portal link (overrides mailto if set).",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Closed", value: "closed" },
      ],
      defaultValue: "draft",
      required: true,
      admin: {
        position: "sidebar",
        description: 'Only "Published" openings appear on the Careers page.',
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Display order. Lower numbers appear first.",
      },
    },
  ],
};
