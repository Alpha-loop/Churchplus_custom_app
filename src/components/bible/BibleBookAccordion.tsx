import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ChevronDown, ChevronRight } from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

import { BibleBook } from "@/modules/bible/types";

import ChapterGrid from "./ChapterGrid";

interface Props {
  book: BibleBook;

  expanded: boolean;

  onToggle: () => void;

  onChapterPress: (
    chapter: number
  ) => void;
}

export default function BibleBookAccordion({
  book,
  expanded,
  onToggle,
  onChapterPress,
}: Props) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: colors.divider },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={styles.header}
      >
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
          ]}
        >
          {book.name}
        </Text>

        {expanded ? (
          <ChevronDown
            size={16}
            color={colors.textSecondary}
          />
        ) : (
          <ChevronRight
            size={16}
            color={colors.textSecondary}
          />
        )}
      </TouchableOpacity>

      {expanded ? (
        <ChapterGrid
          chapters={
            book.chapters
          }
          onSelect={
            onChapterPress
          }
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,

    paddingVertical: 14,
  },

  header: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  title: {
    fontSize: 15,

    fontWeight: "600",
  },
});
