import { useRef } from "react";

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  BookOpen,
  MessageCircle,
  Users,
  StickyNote,
  Trash2,
} from "lucide-react-native";

import moment from "moment";

import { useTheme } from "@/theme/ThemeContext";

import useNotes from "@/modules/notes/hooks/useNotes";

import NoteEditorSheet, {
  NoteEditorHandle,
} from "../components/notes/NoteEditorSheet";

export default function MyNotesScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    notes,
    updateNote,
    deleteNote,
  } = useNotes();

  const editorRef =
    useRef<NoteEditorHandle>(
      null
    );

  const openNote = (
    note: (typeof notes)[number]
  ) => {
    editorRef.current?.open({
      contextLabel:
        note.contextLabel,

      existingContent:
        note.content,

      onSave: content =>
        updateNote(
          note.id,
          content
        ),
    });
  };

  const confirmDelete = (
    id: string
  ) => {
    Alert.alert(
      "Delete Note",
      "This can't be undone.",
      [
        {
          text: "Cancel",

          style: "cancel",
        },

        {
          text: "Delete",

          style: "destructive",

          onPress: () =>
            deleteNote(id),
        },
      ]
    );
  };

  // Which icon the context pill shows for each kind of note.
  const contextIcon = (
    type: (typeof notes)[number]["contextType"]
  ) =>
    type === "message"
      ? MessageCircle
      : type === "community"
      ? Users
      : BookOpen;

  const goToNoteContext = (
    note: (typeof notes)[number]
  ) => {
    // Preferred path: the note remembers the exact route + params
    // it was written from (devotional, chat, community post, and
    // any Bible note saved after this was added), so this needs
    // no per-module logic at all.
    if (note.contextRoute) {
      navigation.navigate(
        note.contextRoute.name,
        note.contextRoute.params
      );

      return;
    }

    // Fallback for Bible notes saved before contextRoute existed:
    // their contextId is "book|chapter".
    if (
      note.contextType ===
        "bible" &&
      note.contextId
    ) {
      const [
        book,
        chapter,
      ] =
        note.contextId.split(
          "|"
        );

      navigation.navigate(
        "BibleReader",
        {
          book,

          chapter,
        }
      );
    }
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
          My Notes
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        {notes.length === 0 ? (
          <Text
            style={[
              styles.emptyText,
              { color: colors.textMuted },
            ]}
          >
            No notes yet — you
            can save one while
            reading a Bible
            chapter or devotional,
            or from a community
            post or a chat.
          </Text>
        ) : (
          notes.map(note => (
            <View
              key={note.id}
              style={[
                styles.card,
                { backgroundColor: colors.surface },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() =>
                  openNote(note)
                }
              >
                {note.contextLabel ? (
                  <TouchableOpacity
                    onPress={() =>
                      goToNoteContext(
                        note
                      )
                    }
                    style={[
                      styles.contextPill,
                      { backgroundColor: colors.primaryMuted },
                    ]}
                  >
                    {(() => {
                      const Icon =
                        contextIcon(
                          note.contextType
                        );

                      return (
                        <Icon
                          size={12}
                          color={colors.primary}
                        />
                      );
                    })()}

                    <Text
                      numberOfLines={1}
                      style={[
                        styles.contextText,
                        {
                          color: colors.primary,

                          flexShrink: 1,
                        },
                      ]}
                    >
                      {
                        note.contextLabel
                      }
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={[
                      styles.contextPill,
                      { backgroundColor: colors.surfaceAlt },
                    ]}
                  >
                    <StickyNote
                      size={12}
                      color={colors.textMuted}
                    />

                    <Text
                      style={[
                        styles.contextText,
                        { color: colors.textMuted },
                      ]}
                    >
                      General
                    </Text>
                  </View>
                )}

                <Text
                  style={[
                    styles.noteContent,
                    { color: colors.textPrimary },
                  ]}
                  numberOfLines={4}
                >
                  {note.content}
                </Text>

                <View
                  style={
                    styles.footerRow
                  }
                >
                  <Text
                    style={[
                      styles.dateText,
                      { color: colors.textMuted },
                    ]}
                  >
                    {moment(
                      note.updatedAt
                    ).format(
                      "MMM D, YYYY · h:mm A"
                    )}
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      confirmDelete(
                        note.id
                      )
                    }
                    hitSlop={8}
                  >
                    <Trash2
                      size={16}
                      color={colors.danger}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <NoteEditorSheet
        ref={editorRef}
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

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 30,
  },

  card: {
    borderRadius: 14,

    padding: 14,

    marginBottom: 12,
  },

  contextPill: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,

    alignSelf: "flex-start",

    maxWidth: "100%",

    borderRadius: 10,

    paddingHorizontal: 8,

    paddingVertical: 4,

    marginBottom: 8,
  },

  contextText: {
    fontSize: 11,

    fontWeight: "700",
  },

  noteContent: {
    fontSize: 14,

    lineHeight: 20,
  },

  footerRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",

    marginTop: 10,
  },

  dateText: {
    fontSize: 11,
  },
});
