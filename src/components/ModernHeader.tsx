import {
  useState,
} from "react";

import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import { Menu } from "lucide-react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import useProfile from "@/modules/profile/hooks/useProfile";

import { useAuthStore } from "@/store/authStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import ModernMenuDrawer from "./ModernMenuDrawer";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  churchName?: string;

  avatarUrl?: string;

  // Which drawer item should render as "active" — pass the tab
  // name this header is currently shown on (e.g. "Home", "Media").
  activeRoute?: string;
}

export default function ModernHeader({
  churchName,
  avatarUrl,
  activeRoute,
}: Props) {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  const navigation = useNavigation<any>();

  // Real user profile (name/photo) for the drawer's header — the
  // church's own name/logo already show in the app header itself,
  // so the drawer shows who's logged in instead. Same hook
  // Classic's own Profile screen uses.
  const { profile } =
    useProfile();

  const logout = useAuthStore(
    state => state.logout
  );

  const isGuest = useAuthStore(
    state => state.isGuest
  );

  const exitGuestMode = useAuthStore(
    state => state.exitGuestMode
  );

  const { requireAuth } =
    useRequireAuth();

  const [
    menuVisible,
    setMenuVisible,
  ] = useState(false);

  const userName = [
    profile?.firstName,
    profile?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const handleNavigate = (
    route: string
  ) => {
    setMenuVisible(false);

    switch (route) {
      case "DevotionalLibrary":
      case "CommunityGroups":
      case "AboutChurch":
        // Content browsing — open to guests, same "read is open,
        // write is gated" rule requireAuth() enforces everywhere
        // else in this app.
        navigation.navigate(
          route === "CommunityGroups"
            ? "Community"
            : route
        );

        return;

      case "Profile":
      case "Settings":
      case "Messages":
      case "Notifications":
      case "MyNotes":
        // Account-specific — a guest has no real profile,
        // messages, or notifications to view. Was navigating
        // straight there for a guest too, landing on a confusing
        // screen showing generic/empty state instead of an actual
        // error — not a crash, but not right either. Notifications
        // now shows real friend requests + real church
        // announcements — see NotificationsScreen.tsx for what's
        // genuinely backed vs. what the original design fabricated
        // (donation receipts, prayer replies, mutual-connection
        // counts, unread state — none of which exist anywhere in
        // this codebase).
        // "MyNotes".toLowerCase() would read "your mynotes" — an
        // explicit wording per item instead of deriving it.
        requireAuth(
          () =>
            navigation.navigate(
              route
            ),
          {
            message: `Sign in to view your ${
              ({
                MyNotes: "notes",
              } as Record<
                string,
                string
              >)[route] ??
              route.toLowerCase()
            }.`,
          }
        );

        return;

      case "Logout":
        // Lives in the drawer directly now, not on Settings —
        // logout() only clears auth state, it never navigates
        // anywhere on its own, and "Main"/every screen behind
        // this drawer is only registered while canAccessMain is
        // true. The moment the token clears and AppNavigator
        // re-renders, whatever screen is currently active
        // disappears from the registered set entirely — same
        // class of bug hit repeatedly elsewhere in this project.
        // Explicit reset fixes it; the setTimeout defers just
        // long enough for that re-render to register "Login"
        // before navigating to it.
        //
        // For a guest specifically, logout() alone changes
        // nothing — isGuest deliberately isn't touched by it (see
        // authStore.ts's own comment on that), so canAccessMain
        // would stay true and "Login" would never actually be
        // registered to reset into, hitting the exact same "RESET
        // not handled" crash fixed elsewhere for other triggers.
        // exitGuestMode() first is what actually flips
        // canAccessMain to false.
        Alert.alert(
          "Log Out",
          "Are you sure you want to log out?",
          [
            {
              text: "Cancel",

              style: "cancel",
            },

            {
              text: "Log Out",

              style: "destructive",

              onPress: async () => {
                if (isGuest) {
                  exitGuestMode();
                } else {
                  await logout();
                }

                setTimeout(() => {
                  navigation.reset(
                    {
                      index: 0,

                      routes: [
                        {
                          name: "Login",
                        },
                      ],
                    }
                  );
                }, 0);
              },
            },
          ]
        );

        return;

      case "BibleStudy":
        navigation.navigate(
          "Bible"
        );

        return;

      default:
        return;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop:
            insets.top + 10,

          backgroundColor:
            colors.surface,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() =>
          setMenuVisible(true)
        }
        hitSlop={10}
      >
        <Menu
          size={22}
          color={
            colors.textPrimary
          }
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.churchName,
          {
            color:
              colors.textPrimary,
          },
        ]}
        numberOfLines={1}
      >
        {churchName || "Faith Connect"}
      </Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "AboutChurch"
          )
        }
        hitSlop={10}
      >
        {avatarUrl ? (
          <Image
              cachePolicy="memory-disk"
            source={{
              uri: avatarUrl,
            }}
            style={styles.avatar}
          />
        ) : (
          <View
            style={[
              styles.avatar,
              {
                backgroundColor:
                  colors.surfaceAlt,
              },
            ]}
          />
        )}
      </TouchableOpacity>

      <ModernMenuDrawer
        visible={menuVisible}
        onClose={() =>
          setMenuVisible(false)
        }
        userName={userName}
        userPhotoUrl={
          profile?.pictureUrl
        }
        activeRoute={
          activeRoute
        }
        onNavigate={
          handleNavigate
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 16,

    paddingBottom: 12,

    backgroundColor: "#FFFFFF",
  },

  churchName: {
    fontSize: 16,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",

    flex: 1,

    textAlign: "center",

    marginHorizontal: 12,
  },

  avatar: {
    width: 34,

    height: 34,

    borderRadius: 17,
  },

  avatarPlaceholder: {
    backgroundColor: "#E5E5EA",
  },
});