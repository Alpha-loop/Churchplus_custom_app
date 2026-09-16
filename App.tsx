import "react-native-gesture-handler";

import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider as PaperProvider } from "react-native-paper";

import { StatusBar } from "expo-status-bar";

import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

import AppNavigator from "@/navigation/AppNavigator";

import { ThemeProvider, useTheme } from "@/theme/ThemeContext";

import { useChurchStore } from "@/store/churchStore";

import { useAppConfigStore } from "@/store/appConfig.store";

import {
  getMinistryProfile,
  getBrandingConfiguration,
} from "@/modules/onboarding/services/onboarding.service";

const TENANT_ID =
  process.env
    .EXPO_PUBLIC_TENANT_ID;

// The main faithConnect app's equivalent of this moment is
// confirmChurch() — fired when a real person taps a church on
// the Join screen, fetching that church's real profile + real
// branding, then setting churchStore/appConfigStore before
// routing into the app. This build has no Join screen for anyone
// to tap through — the tenant is fixed at build time — so that
// same fetch-and-set work just happens once here, automatically,
// before the navigator ever renders. Layout itself needs no
// fetch or detection at all: this build is always Modern, full
// stop, not something to read off this tenant's branding config
// (unlike the main app, which does — and which also supports
// forcing this the same way, for exactly the same "don't depend
// on that church's backend config staying correct" reason).
export default function App() {
  const [
    ready,
    setReady,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  const setChurchIds =
    useChurchStore(
      state => state.setChurch
    );

  const setFullProfile =
    useChurchStore(
      state =>
        state.setFullProfile
    );

  const setAppConfig =
    useAppConfigStore(
      state => state.setConfig
    );

  useEffect(() => {
    (async () => {
      if (!TENANT_ID) {
        setError(
          "This build is missing its EXPO_PUBLIC_TENANT_ID configuration."
        );

        return;
      }

      // Always Modern, always this one tenant — set immediately,
      // no need to wait on either fetch below for this part.
      setChurchIds(
        TENANT_ID,
        TENANT_ID
      );

      setAppConfig({
        layout: "modern",
      });

      try {
        const profileResponse =
          await getMinistryProfile(
            TENANT_ID
          );

        const profile =
          profileResponse?.data ??
          profileResponse?.object ??
          profileResponse;

        if (profile) {
          setFullProfile(
            profile
          );
        }
      } catch (
        profileError
      ) {
        console.log(
          "MINISTRY PROFILE ERROR:",
          profileError
        );
      }

      try {
        const brandingResponse =
          await getBrandingConfiguration(
            TENANT_ID
          );

        const branding =
          brandingResponse?.object;

        if (branding) {
          setAppConfig({
            layout: "modern",

            appName:
              branding.appName,

            logoUrl:
              branding.logoUrl,

            primaryColor:
              branding.primaryColor,

            secondaryColor:
              branding.secondaryColor,

            accentColor:
              branding.accentColor,

            backgroundColor:
              branding.backgroundColor,

            backgroundImageUrl:
              branding.backgroundImageUrl,

            fontFamily:
              branding.fontFamily,

            darkModeEnabled:
              branding.darkModeEnabled ??
              false,
          });
        }
      } catch (
        brandingError
      ) {
        // Same reasoning as the main app: a church with no
        // working branding config should never block someone
        // from getting into the app. layout stays "modern"
        // regardless (already set above).
        console.log(
          "BRANDING CONFIG ERROR:",
          brandingError
        );
      }

      setReady(true);
    })();
  }, []);

  if (error) {
    return (
      <View
        style={
          styles.centerWrap
        }
      >
        <Text
          style={
            styles.errorText
          }
        >
          {error}
        </Text>
      </View>
    );
  }

  if (!ready) {
    return (
      <View
        style={
          styles.centerWrap
        }
      >
        <ActivityIndicator
          size="large"
          color="#1D3AA8"
        />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <PaperProvider>
            <ThemedStatusBar />

            <AppNavigator />
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

// useTheme() has to be called from inside ThemeProvider, not the
// same component that renders the provider itself — this tiny
// wrapper is just so the status bar (light icons on dark
// backgrounds, dark icons on light) tracks the resolved theme.
function ThemedStatusBar() {
  const { colors } = useTheme();

  return (
    <StatusBar
      style={
        colors.statusBarStyle
      }
    />
  );
}

const styles = StyleSheet.create({
  centerWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#FFFFFF",

    padding: 24,
  },

  errorText: {
    fontSize: 14,

    color: "rgba(0,0,0,0.6)",

    textAlign: "center",
  },
});