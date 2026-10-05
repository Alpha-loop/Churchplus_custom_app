import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  chapters: number;

  onSelect: (
    chapter: number
  ) => void;
}

export default function ChapterGrid({
  chapters,
  onSelect,
}: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {Array.from(
        { length: chapters },
        (_, i) => i + 1
      ).map(chapter => (
        <TouchableOpacity
          key={chapter}
          activeOpacity={0.8}
          onPress={() =>
            onSelect(chapter)
          }
          style={[
            styles.item,
            {
              backgroundColor: colors.background,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.text,
              { color: colors.textSecondary },
            ]}
          >
            {chapter}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 8,

    marginTop: 12,

    marginBottom: 8,
  },

  item: {
    width: 42,

    height: 42,

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 10,

    borderWidth: 1,
  },

  text: {
    fontSize: 13,

    fontWeight: "600",
  },
});
