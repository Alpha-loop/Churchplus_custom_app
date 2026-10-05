import { useRef } from "react";

import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  BookOpen,
  Play,
  StopCircle,
  NotebookPen,
} from "lucide-react-native";

import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useTheme } from "@/theme/ThemeContext";

import useChapter from "@/modules/bible/hooks/useChapter";

import useBibleSpeech from "@/modules/bible/hooks/useBibleSpeech";

import useNotes from "@/modules/notes/hooks/useNotes";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import {
  FONT_SIZE_VALUES,
  useBibleSettingsStore,
} from "@/modules/bible/store/bibleSettingsStore";

import { BIBLE_VERSIONS } from "@/modules/bible/data/versions";

import { getAdjacentChapter } from "@/modules/bible/utils/bibleNavigation";

import BibleVerseItem from "../components/bible/BibleVerseItem";

import ChapterNavigationBar from "../components/bible/ChapterNavigationBar";

import BibleVersionSheet from "../components/bible/BibleVersionSheet";

import FontSizeSheet from "../components/bible/FontSizeSheet";

import NoteEditorSheet, {
  NoteEditorHandle,
} from "../components/notes/NoteEditorSheet";

export default function BibleReaderScreen({
  navigation,
  route,
}: any) {
  const { colors } = useTheme();

  const { book, chapter } =
    route.params;

  const versionSheetRef =
    useRef<BottomSheetModal>(
      null
    );

  const fontSheetRef =
    useRef<BottomSheetModal>(
      null
    );

  const noteEditorRef =
    useRef<NoteEditorHandle>(
      null
    );

  const version = useBibleSettingsStore(
    state => state.version
  );

  const fontSizeKey = useBibleSettingsStore(
    state => state.fontSize
  );

  const { fontSize, lineHeight } =
    FONT_SIZE_VALUES[fontSizeKey];

  const {
    data,
    loading,
    error,
  } = useChapter(
    book,
    Number(chapter),
    version
  );

  const speech = useBibleSpeech();

  const { addNote } = useNotes();

  const { requireAuth } =
    useRequireAuth();

  // Notes are saved to the backend against a real person, so a
  // guest has nowhere to save one — was opening the editor for
  // them anyway and silently saving nothing. Now gated like every
  // other write action in the app.
  const handleAddNote = () =>
    requireAuth(
      () =>
        noteEditorRef.current?.open(
          {
            contextLabel: `${book} ${chapter}`,

            // contextId keeps the "book|chapter" shape too, so
            // older code paths reading it still work; the
            // route is what MyNotesScreen actually navigates
            // with now.
            onSave: content =>
              addNote(
                content,
                "bible",
                `${book}|${chapter}`,
                `${book} ${chapter}`,
                {
                  name: "BibleReader",

                  params: {
                    book,

                    chapter,
                  },
                }
              ),
          }
        ),
      {
        message:
          "Sign in to save notes.",
      }
    );

  const previousChapter =
    getAdjacentChapter(
      book,
      Number(chapter),
      "previous"
    );

  const nextChapter =
    getAdjacentChapter(
      book,
      Number(chapter),
      "next"
    );

  const currentVersion =
    BIBLE_VERSIONS.find(
      v => v.id === version
    );

  const goToChapter = (
    target: {
      book: string;
      chapter: number;
    } | null
  ) => {
    if (!target) {
      return;
    }

    speech.stop();

    navigation.setParams({
      book: target.book,

      chapter:
        target.chapter.toString(),
    });
  };

  const handleSpeech = () => {
    if (speech.isSpeaking) {
      speech.stop();

      return;
    }

    if (!data?.verses) {
      return;
    }

    const speechText = data.verses
      .map(
        (verse: any) =>
          `Verse ${verse.verse}. ${verse.text}`
      )
      .join(" ");

    speech.play(speechText);
  };

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
          onPress={() => {
            speech.stop();

            navigation.goBack();
          }}
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color={colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            versionSheetRef.current?.present()
          }
          style={[
            styles.versionBadge,
            { backgroundColor: colors.primaryMuted },
          ]}
        >
          <Text
            style={[
              styles.versionText,
              { color: colors.primary },
            ]}
          >
            {currentVersion?.abbreviation ??
              "WEB"}
          </Text>

          <BookOpen
            size={13}
            color={colors.primary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            fontSheetRef.current?.present()
          }
          hitSlop={8}
        >
          <Text
            style={[
              styles.fontButton,
              { color: colors.textPrimary },
            ]}
          >
            Aa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={
            handleAddNote
          }
          hitSlop={8}
        >
          <NotebookPen
            size={20}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View
          style={
            styles.centerWrap
          }
        >
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
        </View>
      ) : error || !data ? (
        <View
          style={
            styles.centerWrap
          }
        >
          <Text
            style={{
              color: colors.textMuted,
            }}
          >
            Couldn't load this
            chapter — check your
            connection and try
            again.
          </Text>
        </View>
      ) : (
        <ScrollView
          style={
            styles.reader
          }
          contentContainerStyle={{
            padding: 20,
          }}
          showsVerticalScrollIndicator={
            false
          }
        >
          <View
            style={
              styles.readerHeaderRow
            }
          >
            <View
              style={{ width: 28 }}
            />

            <Text
              style={[
                styles.reference,
                { color: colors.textPrimary },
              ]}
            >
              {data.reference}
            </Text>

            <TouchableOpacity
              onPress={
                handleSpeech
              }
              hitSlop={8}
            >
              {speech.isSpeaking ? (
                <StopCircle
                  size={26}
                  color={colors.primary}
                />
              ) : (
                <Play
                  size={26}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>
          </View>

          {(data.verses || []).map(
            (verse: any) => (
              <BibleVerseItem
                key={verse.verse}
                number={
                  verse.verse
                }
                text={verse.text}
                fontSize={
                  fontSize
                }
                lineHeight={
                  lineHeight
                }
              />
            )
          )}
        </ScrollView>
      )}

      <ChapterNavigationBar
        title={
          data?.reference ??
          `${book} ${chapter}`
        }
        hasPrevious={
          !!previousChapter
        }
        hasNext={!!nextChapter}
        onPrevious={() =>
          goToChapter(
            previousChapter
          )
        }
        onNext={() =>
          goToChapter(
            nextChapter
          )
        }
      />

      <FontSizeSheet
        ref={fontSheetRef}
      />

      <BibleVersionSheet
        ref={versionSheetRef}
      />

      <NoteEditorSheet
        ref={noteEditorRef}
      />
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

  versionBadge: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 6,
  },

  versionText: {
    fontSize: 12,

    fontWeight: "700",
  },

  fontButton: {
    fontSize: 15,

    fontWeight: "600",
  },

  centerWrap: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    padding: 24,
  },

  reader: {
    flex: 1,
  },

  readerHeaderRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginBottom: 22,
  },

  reference: {
    fontSize: 17,

    fontWeight: "700",

    flex: 1,

    textAlign: "center",
  },
});
