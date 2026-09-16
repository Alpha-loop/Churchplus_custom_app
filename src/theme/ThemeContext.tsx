import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useColorScheme } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ColorTokens,
  darkColors,
  lightColors,
} from "./colors";

export type ThemePreference =
  | "system"
  | "light"
  | "dark";

interface ThemeContextValue {
  // What the user actually picked — "system" means "follow the
  // device", not a resolved value.
  preference: ThemePreference;

  // The theme actually in effect right now, after resolving
  // "system" against the device's current setting.
  resolvedTheme: "light" | "dark";

  colors: ColorTokens;

  setPreference: (
    pref: ThemePreference
  ) => void;
}

const ThemeContext =
  createContext<
    ThemeContextValue | null
  >(null);

const STORAGE_KEY =
  "theme-preference";

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemScheme =
    useColorScheme();

  const [
    preference,
    setPreferenceState,
  ] = useState<ThemePreference>(
    "system"
  );

  const [
    hydrated,
    setHydrated,
  ] = useState(false);

  // Load the saved preference once at startup. Until this
  // finishes, "system" is used as a safe default rather than
  // flashing the wrong theme for a moment.
  useEffect(() => {
    AsyncStorage.getItem(
      STORAGE_KEY
    )
      .then(saved => {
        if (
          saved === "light" ||
          saved === "dark" ||
          saved === "system"
        ) {
          setPreferenceState(
            saved
          );
        }
      })
      .catch(() => {})
      .finally(() =>
        setHydrated(true)
      );
  }, []);

  const setPreference = (
    pref: ThemePreference
  ) => {
    setPreferenceState(pref);

    AsyncStorage.setItem(
      STORAGE_KEY,
      pref
    ).catch(() => {});
  };

  const resolvedTheme: 
    | "light"
    | "dark" =
    preference === "system"
      ? systemScheme === "dark"
        ? "dark"
        : "light"
      : preference;

  const colors = useMemo(
    () =>
      resolvedTheme === "dark"
        ? darkColors
        : lightColors,
    [resolvedTheme]
  );

  const value = useMemo(
    () => ({
      preference,
      resolvedTheme,
      colors,
      setPreference,
    }),
    [
      preference,
      resolvedTheme,
      colors,
    ]
  );

  // Don't render children until the saved preference has loaded
  // — otherwise a user who chose "dark" would see a flash of the
  // system/light theme for a frame on every launch.
  if (!hydrated) {
    return null;
  }

  return (
    <ThemeContext.Provider
      value={value}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(
    ThemeContext
  );

  if (!ctx) {
    throw new Error(
      "useTheme() must be used within a ThemeProvider"
    );
  }

  return ctx;
}