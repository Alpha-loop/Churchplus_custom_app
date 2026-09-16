// Color tokens for both themes. Every screen should read colors
// from useTheme() (see ThemeContext.tsx) instead of hardcoding
// hex strings directly — that's what actually makes dark mode
// work per-screen. These two palettes are deliberately close in
// structure (same keys) so a screen retrofitted once works
// correctly in both themes without further changes.

export type ColorTokens =
  typeof lightColors;

export const lightColors = {
  // Base surfaces
  background: "#F4F3FA",
  surface: "#FFFFFF",
  surfaceAlt: "#F1F2F5",

  // Text
  textPrimary: "rgba(17, 17, 17, 0.92)",
  textSecondary: "rgba(17, 17, 17, 0.7)",
  textMuted: "rgba(0, 0, 0, 0.5)",
  textOnPrimary: "#FFFFFF",

  // Brand / accent
  primary: "#1D3AA8",
  primaryMuted: "#E9EDFB",

  // Borders / dividers
  border: "rgba(0, 0, 0, 0.08)",
  divider: "rgba(0, 0, 0, 0.06)",

  // Status
  danger: "#B4413C",
  dangerMuted: "#FBE1E1",

  // Misc
  overlay: "rgba(0, 0, 0, 0.3)",
  placeholder: "#1F2937",

  statusBarStyle: "dark" as
    | "dark"
    | "light",
};

export const darkColors: ColorTokens = {
  background: "#0F1115",
  surface: "#1A1D24",
  surfaceAlt: "#242832",

  textPrimary: "rgba(255, 255, 255, 0.92)",
  textSecondary: "rgba(255, 255, 255, 0.68)",
  textMuted: "rgba(255, 255, 255, 0.45)",
  textOnPrimary: "#FFFFFF",

  primary: "#5B7FE0",
  primaryMuted: "#232C4A",

  border: "rgba(255, 255, 255, 0.1)",
  divider: "rgba(255, 255, 255, 0.08)",

  danger: "#E37872",
  dangerMuted: "#3A2323",

  overlay: "rgba(0, 0, 0, 0.55)",
  placeholder: "#2A2E38",

  statusBarStyle: "light",
};