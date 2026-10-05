import { create } from "zustand";

// Font size as named presets rather than a continuous slider —
// the source implementation used @react-native-community/slider,
// a dependency this app doesn't otherwise need just for this.
// Same effect (adjustable reading size), simpler control.
export type BibleFontSize =
  | "small"
  | "medium"
  | "large"
  | "xlarge";

export const FONT_SIZE_VALUES: Record<
  BibleFontSize,
  { fontSize: number; lineHeight: number }
> = {
  small: { fontSize: 14, lineHeight: 22 },
  medium: { fontSize: 17, lineHeight: 26 },
  large: { fontSize: 20, lineHeight: 30 },
  xlarge: { fontSize: 24, lineHeight: 36 },
};

interface BibleSettingsState {
  version: string;
  fontSize: BibleFontSize;

  setVersion: (
    version: string
  ) => void;

  setFontSize: (
    size: BibleFontSize
  ) => void;
}

export const useBibleSettingsStore =
  create<BibleSettingsState>(
    set => ({
      version: "web",
      fontSize: "medium",

      setVersion: version =>
        set({ version }),

      setFontSize: fontSize =>
        set({ fontSize }),
    })
  );
