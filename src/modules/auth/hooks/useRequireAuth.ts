// modules/auth/hooks/useRequireAuth.ts

import { useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "@/store/authStore";

interface RequireAuthOptions {
  message?: string;
}

export default function useRequireAuth() {
  const navigation = useNavigation<any>();

  const isGuest = useAuthStore(state => state.isGuest);
  const isAuthenticated = useAuthStore(state => !!state.accessToken);
  const exitGuestMode = useAuthStore(state => state.exitGuestMode);

  const goToLogin = useCallback(
    (message?: string) => {
      // Was: navigation.navigate("Auth", { screen: "Login", ... })
      // — that nested "Auth" wrapper only exists in the main
      // faithConnect app's navigator. This app's AppNavigator.tsx
      // registers "Login" directly, flat, with no "Auth" sub-
      // navigator around it at all — "Auth" was never a valid
      // screen name here, which is exactly what the RESET error
      // was reporting.
      if (isGuest) {
        exitGuestMode();
      }

      setTimeout(() => {
        navigation.navigate(
          "Login",
          { promptMessage: message }
        );
      }, 0);
    },
    [isGuest, navigation, exitGuestMode]
  );

  const requireAuth = useCallback(
    (action: () => void, options?: RequireAuthOptions) => {
      if (isAuthenticated && !isGuest) {
        action();
        return;
      }

      // Was: navigate straight to Login the instant a guest tried
      // a real action — no warning, just yanked away from
      // whatever they were doing. A confirm step first is much
      // less jarring: they can back out and keep browsing as a
      // guest instead of losing their place.
      Alert.alert(
        "Sign in required",
        options?.message ??
          "You need to sign in to do that.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () =>
              goToLogin(options?.message),
          },
        ]
      );
    },
    [isAuthenticated, isGuest, goToLogin]
  );

  return { requireAuth, isGuest, isAuthenticated };
}