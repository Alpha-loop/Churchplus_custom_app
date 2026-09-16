import {
  StyleSheet,
  View,
} from "react-native";

import { useChurchStore } from "@/store/churchStore";

import { useTheme } from "@/theme/ThemeContext";

import ModernHeader from "./ModernHeader";

interface Props {
  children: React.ReactNode;
}

// Used by every bottom tab except Home (Home has its own
// Faith/Socials top tabs to sit under the header instead — see
// ModernHomeTab.tsx). Keeps the header wiring (church name,
// avatar) in one place instead of repeated in Media/Events/Giving.
// No activeRoute is passed here since none of those three tabs
// have a corresponding entry in the drawer menu anyway.
export default function ModernScreenWithHeader({
  children,
}: Props) {
  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <ModernHeader
        churchName={
          fullProfile?.churchName
        }
        avatarUrl={
          fullProfile?.logoUrl
        }
      />

      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
  },
});