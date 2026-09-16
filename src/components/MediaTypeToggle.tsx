import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Play,
  Headphones,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

export type MediaTab =
  | "videos"
  | "audios";

interface Props {
  active: MediaTab;

  onChange: (
    tab: MediaTab
  ) => void;
}

export default function MediaTypeToggle({
  active,
  onChange,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          onChange("videos")
        }
        style={[
          styles.pill,
          {
            backgroundColor:
              active === "videos"
                ? colors.primary
                : colors.surface,
            borderColor:
              active === "videos"
                ? colors.primary
                : colors.border,
          },
        ]}
      >
        <Play
          size={16}

          color={
            active === "videos"
              ? "#FFFFFF"
              : colors.textSecondary
          }

          fill={
            active === "videos"
              ? "#FFFFFF"
              : "transparent"
          }
        />

        <Text
          style={[
            styles.label,
            {
              color:
                active === "videos"
                  ? "#FFFFFF"
                  : colors.textSecondary,
            },
          ]}
        >
          Videos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          onChange("audios")
        }
        style={[
          styles.pill,
          {
            backgroundColor:
              active === "audios"
                ? colors.primary
                : colors.surface,
            borderColor:
              active === "audios"
                ? colors.primary
                : colors.border,
          },
        ]}
      >
        <Headphones
          size={16}

          color={
            active === "audios"
              ? "#FFFFFF"
              : colors.textSecondary
          }
        />

        <Text
          style={[
            styles.label,
            {
              color:
                active === "audios"
                  ? "#FFFFFF"
                  : colors.textSecondary,
            },
          ]}
        >
          Audios
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",

    gap: 10,
  },

  pill: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    gap: 8,

    borderRadius: 14,

    paddingVertical: 12,

    borderWidth: 1,
  },

  label: {
    fontSize: 14,

    fontWeight: "600",
  },
});