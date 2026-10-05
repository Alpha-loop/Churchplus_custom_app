import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  active: "old" | "new";

  onChange: (
    value: "old" | "new"
  ) => void;
}

export default function TestamentTabs({
  active,
  onChange,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        onPress={() =>
          onChange("old")
        }
        style={styles.tab}
      >
        <Text
          style={[
            styles.label,
            {
              color:
                active === "old"
                  ? colors.textPrimary
                  : colors.textMuted,

              fontWeight:
                active === "old"
                  ? "700"
                  : "600",
            },
          ]}
        >
          Old Testament
        </Text>

        {active === "old" ? (
          <View
            style={[
              styles.indicator,
              { backgroundColor: colors.primary },
            ]}
          />
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          onChange("new")
        }
        style={styles.tab}
      >
        <Text
          style={[
            styles.label,
            {
              color:
                active === "new"
                  ? colors.textPrimary
                  : colors.textMuted,

              fontWeight:
                active === "new"
                  ? "700"
                  : "600",
            },
          ]}
        >
          New Testament
        </Text>

        {active === "new" ? (
          <View
            style={[
              styles.indicator,
              { backgroundColor: colors.primary },
            ]}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    gap: 24,

    marginBottom: 16,
  },

  tab: {
    alignItems: "center",
  },

  label: {
    fontSize: 14,
  },

  indicator: {
    marginTop: 8,

    width: "100%",

    height: 2,

    borderRadius: 2,
  },
});
