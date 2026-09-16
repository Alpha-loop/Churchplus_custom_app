import { StyleSheet, View } from "react-native";

import { CalendarDays } from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  height?: number;

  style?: any;
}

// Shared fallback for any event with no primaryImageUrl — used by
// both ModernEventCard.tsx (the events list) and
// EventDetailsScreen.tsx (Modern), so a missing image looks the
// same, deliberate way everywhere instead of an empty box in one
// place and something else elsewhere.
export default function EventImagePlaceholder({
  height = 180,

  style,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,

        { height, backgroundColor: colors.primary },

        style,
      ]}
    >
      <CalendarDays
        size={40}
        color="rgba(255,255,255,0.85)"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",

    alignItems: "center",

    justifyContent: "center",
  },
});