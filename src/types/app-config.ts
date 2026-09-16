export type LayoutType =
  | "modern"
  | "classic";

export type ThemeType =
  | "light"
  | "dark";

export type SectionType =
  | "devotion"
  | "media"
  | "donation"
  | "community";

export type HeroVariant =
  | "carousel"
  | "fullscreen"
  | "compact";

export interface SectionConfig {
  id: string;

  type: SectionType;

  enabled: boolean;

  variant?: HeroVariant;

  // Static/override copy for sections that need editorial text not
  // covered by live data (e.g. the donation CTA's heading/body).
  // Data-backed sections (devotion, media, community) ignore this
  // and pull straight from useHome() instead — this is only for
  // content that has nowhere else to live yet.
  data?: any;

  order: number;
}

export interface AppConfig {
  layout: LayoutType;

  theme?: ThemeType;

  // Only meaningful when layout === "modern". Classic's home is a
  // fixed structure and doesn't read this.
  sections?: SectionConfig[];

  // Real fields from GET /BrandingConfiguration/AppConfig — kept
  // for future use (custom colors/logo per church), though only
  // `layout` above is actively used for routing right now. Note
  // the backend's own "theme" field means classic/modern (mapped
  // into `layout` above, not this type's `theme`, which already
  // means something different — light/dark mode) — don't confuse
  // the two.
  appName?: string;

  logoUrl?: string | null;

  primaryColor?: string | null;

  secondaryColor?: string | null;

  accentColor?: string | null;

  backgroundColor?: string | null;

  backgroundImageUrl?: string | null;

  fontFamily?: string | null;

  darkModeEnabled?: boolean;
}