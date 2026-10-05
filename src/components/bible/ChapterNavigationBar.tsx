import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  title: string;

  onPrevious: () => void;

  onNext: () => void;

  hasPrevious: boolean;

  hasNext: boolean;
}

export default function ChapterNavigationBar({
  title,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: Props) {
  const { colors } = useTheme();

  // Same class of fix as the tab bar and comment input elsewhere
  // in this app — a bottom-anchored bar needs the real device
  // inset added, or it sits right against the home-indicator
  // gesture area on devices with no physical home button.
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          borderTopColor: colors.border,

          paddingBottom:
            10 + insets.bottom,
        },
      ]}
    >
      <TouchableOpacity
        disabled={!hasPrevious}
        onPress={onPrevious}
        style={{
          opacity: hasPrevious
            ? 1
            : 0.3,
        }}
      >
        <ChevronLeft
          size={22}
          color={colors.textPrimary}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          { color: colors.textSecondary },
        ]}
        numberOfLines={1}
      >
        {title}
      </Text>

      <TouchableOpacity
        disabled={!hasNext}
        onPress={onNext}
        style={{
          opacity: hasNext
            ? 1
            : 0.3,
        }}
      >
        <ChevronRight
          size={22}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    height: 56,

    paddingHorizontal: 20,

    paddingTop: 10,

    borderTopWidth: 1,
  },

  title: {
    fontSize: 13,

    fontWeight: "600",

    flex: 1,

    textAlign: "center",

    marginHorizontal: 10,
  },
});
