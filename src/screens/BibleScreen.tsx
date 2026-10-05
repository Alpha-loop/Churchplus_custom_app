import { useMemo, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Search,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";

import {
  NEW_TESTAMENT,
  OLD_TESTAMENT,
} from "@/modules/bible/data/books";

import TestamentTabs from "../components/bible/TestamentTabs";

import BibleBookAccordion from "../components/bible/BibleBookAccordion";

export default function BibleScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const [
    testament,
    setTestament,
  ] = useState<"old" | "new">(
    "old"
  );

  const [
    expanded,
    setExpanded,
  ] = useState("genesis");

  const [
    search,
    setSearch,
  ] = useState("");

  const books = useMemo(() => {
    const data =
      testament === "old"
        ? OLD_TESTAMENT
        : NEW_TESTAMENT;

    return data.filter(book =>
      book.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
  }, [testament, search]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <View
        style={[
          styles.topBar,
          { backgroundColor: colors.surface },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <Text
          style={[
            styles.topBarTitle,
            { color: colors.textPrimary },
          ]}
        >
          Bible
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <TestamentTabs
          active={testament}
          onChange={
            setTestament
          }
        />

        <View
          style={[
            styles.searchWrap,
            { backgroundColor: colors.surfaceAlt },
          ]}
        >
          <Search
            size={16}
            color={colors.textMuted}
          />

          <TextInput
            value={search}
            onChangeText={
              setSearch
            }
            placeholder="Search books..."
            placeholderTextColor={colors.textMuted}
            style={[
              styles.searchInput,
              { color: colors.textPrimary },
            ]}
          />
        </View>

        {books.map(book => (
          <BibleBookAccordion
            key={book.id}
            book={book}
            expanded={
              expanded ===
              book.id
            }
            onToggle={() =>
              setExpanded(
                expanded ===
                  book.id
                  ? ""
                  : book.id
              )
            }
            onChapterPress={chapter => {
              navigation.navigate(
                "BibleReader",
                {
                  book: book.name,

                  chapter: chapter.toString(),
                }
              );
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  content: {
    padding: 16,
  },

  searchWrap: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    borderRadius: 14,

    paddingHorizontal: 14,

    height: 46,

    marginBottom: 16,
  },

  searchInput: {
    flex: 1,

    fontSize: 14,
  },
});
