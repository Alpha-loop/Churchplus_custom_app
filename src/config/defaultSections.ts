import { SectionConfig } from "@/types/app-config";

// Used whenever the active config's `sections` array is missing
// or empty — e.g. layout was flipped to "modern" without also
// supplying sections, or (once wired up) a church's backend
// config genuinely has none configured yet. Without this,
// HomeScreen has nothing to render and shows a blank screen with
// no error, which is exactly the bug this fixes.
export const DEFAULT_MODERN_SECTIONS: SectionConfig[] =
  [
    {
      id: "1",

      type: "devotion",

      enabled: true,

      order: 1,
    },

    {
      id: "2",

      type: "media",

      enabled: true,

      order: 2,
    },

    {
      id: "3",

      type: "donation",

      enabled: true,

      order: 3,

      data: {
        title:
          "Harvest and Donations",

        body: "Support our community initiatives and seasonal outreach. Your generosity empowers our mission.",

        ctaLabel:
          "Give Online",
      },
    },

    {
      id: "4",

      type: "community",

      enabled: true,

      order: 4,
    },
  ];