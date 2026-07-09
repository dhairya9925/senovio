import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  fields: [
    {
      name: "enableOrderNow",
      type: "checkbox",
      label: "Enable 'Order Now' Button",
      defaultValue: true,
      required: true,
    },
  ],
};
