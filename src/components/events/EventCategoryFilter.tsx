import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  categories: string[];

  active: string;

  onChange: (
    category: string
  ) => void;
}

export const ALL_EVENTS =
  "All Events";

export default function EventCategoryFilter({
  categories,
  active,
  onChange,
}: Props) {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={
        false
      }
      contentContainerStyle={
        styles.row
      }
    >
      {[
        ALL_EVENTS,
        ...categories,
      ].map(category => {
        const isActive =
          category === active;

        return (
          <TouchableOpacity
            key={category}
            activeOpacity={0.85}
            onPress={() =>
              onChange(category)
            }
            style={[
              styles.pill,
              {
                backgroundColor: isActive
                  ? colors.primary
                  : colors.surfaceAlt,
              },
            ]}
          >
            <Text
              style={[
                styles.label,
                {
                  color: isActive
                    ? "#FFFFFF"
                    : colors.textSecondary,
                },
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    gap: 8,

    paddingRight: 16,
  },

  pill: {
    paddingHorizontal: 16,

    paddingVertical: 9,

    borderRadius: 20,
  },

  label: {
    fontSize: 13,

    fontWeight: "600",
  },
});