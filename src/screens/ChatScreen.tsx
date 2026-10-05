import { useRef } from "react";

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  Send,
  NotebookPen,
  MoreHorizontal,
} from "lucide-react-native";

import useChat from "@/modules/social/hooks/useChat";

import useNotes from "@/modules/notes/hooks/useNotes";

import useModeration from "@/modules/moderation/hooks/useModeration";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import NoteEditorSheet, {
  NoteEditorHandle,
} from "../components/notes/NoteEditorSheet";

import { useAuthStore } from "@/store/authStore";

import { useTheme } from "@/theme/ThemeContext";

const QUICK_REPLIES = [
  "🙏 Amen",
  "🕊 Peace",
  "❤️ Blessings",
  "🙏 In Prayer",
];

export default function ModernChatScreen({
  navigation,
  route,
}: any) {
  const { colors } = useTheme();

  const { userId, name } =
    route.params;

  const currentUserId =
    useAuthStore(
      state => state.user?.userId
    );

  const {
    loading,
    sending,
    messages,
    text,
    setText,
    sendMessage,
  } = useChat(userId);

  const { addNote } = useNotes();

  const { showUserMenu } =
    useModeration();

  const { requireAuth } =
    useRequireAuth();

  const noteEditorRef =
    useRef<NoteEditorHandle>(
      null
    );

  // A note about this specific conversation — tapping it later
  // from My Notes reopens this same chat. Gated for guests for the
  // same reason as everywhere else notes are saved: they're
  // stored against a real person on the backend.
  const handleAddNote = () =>
    requireAuth(
      () => {
        const label = name
          ? `Chat with ${name}`
          : "Chat";

        noteEditorRef.current?.open(
          {
            contextLabel: label,

            onSave: content =>
              addNote(
                content,
                "message",
                String(userId),
                label,
                {
                  name: "UserChat",

                  params: {
                    userId,

                    name,
                  },
                }
              ),
          }
        );
      },
      {
        message:
          "Sign in to save notes.",
      }
    );

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
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
          numberOfLines={1}
        >
          {name || "Chat"}
        </Text>

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            gap: 16,
          }}
        >
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

          <TouchableOpacity
            onPress={() =>
              showUserMenu(
                {
                  id: userId,

                  name,
                },
                // Nothing left to chat about once they're blocked.
                () =>
                  navigation.goBack()
              )
            }
            hitSlop={8}
            accessibilityLabel="Chat options"
          >
            <MoreHorizontal
              size={20}
              color={colors.textPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{
            marginTop: 24,
          }}
        />
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(
            item,
            index
          ) =>
            item.id ??
            index.toString()
          }
          contentContainerStyle={{
            padding: 16,
          }}
          renderItem={({
            item,
          }) => {
            const isMine =
              item.senderId ===
              currentUserId;

            return (
              <View
                style={[
                  styles.bubbleRow,
                  isMine &&
                    styles.bubbleRowMine,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    isMine
                      ? { backgroundColor: colors.primary, borderBottomRightRadius: 4 }
                      : { backgroundColor: colors.surface, borderBottomLeftRadius: 4 },
                  ]}
                >
                  <Text
                    style={[
                      styles.bubbleText,
                      isMine
                        ? { color: "#FFFFFF" }
                        : { color: colors.textPrimary },
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          }}
        />
      )}

      <View
        style={
          styles.quickReplyRow
        }
      >
        {QUICK_REPLIES.map(
          reply => (
            <TouchableOpacity
              key={reply}
              onPress={() =>
                setText(reply)
              }
              style={[
                styles.quickReplyPill,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[
                  styles.quickReplyText,
                  { color: colors.textSecondary },
                ]}
              >
                {reply}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
          },
        ]}
      >
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              color: colors.textPrimary,
            },
          ]}
          multiline
        />

        <TouchableOpacity
          onPress={sendMessage}
          disabled={
            sending ||
            !text.trim()
          }
          style={[
            styles.sendButton,
            { backgroundColor: colors.primary },
          ]}
        >
          <Send
            size={16}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>

      <NoteEditorSheet
        ref={noteEditorRef}
      />
    </KeyboardAvoidingView>
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
    flex: 1,

    fontSize: 16,

    fontWeight: "700",

    textAlign: "center",

    marginHorizontal: 10,
  },

  bubbleRow: {
    marginBottom: 10,

    alignItems: "flex-start",
  },

  bubbleRowMine: {
    alignItems: "flex-end",
  },

  bubble: {
    maxWidth: "78%",

    borderRadius: 16,

    paddingHorizontal: 14,

    paddingVertical: 10,
  },

  bubbleText: {
    fontSize: 14,

    lineHeight: 20,
  },

  quickReplyRow: {
    flexDirection: "row",

    flexWrap: "wrap",

    gap: 8,

    paddingHorizontal: 16,

    paddingBottom: 10,
  },

  quickReplyPill: {
    borderRadius: 16,

    paddingHorizontal: 12,

    paddingVertical: 7,

    borderWidth: 1,
  },

  quickReplyText: {
    fontSize: 12,

    fontWeight: "600",
  },

  inputRow: {
    flexDirection: "row",

    alignItems: "flex-end",

    gap: 10,

    padding: 12,

    borderTopWidth: 1,
  },

  input: {
    flex: 1,

    borderRadius: 20,

    paddingHorizontal: 16,

    paddingVertical: 10,

    fontSize: 14,

    maxHeight: 100,
  },

  sendButton: {
    width: 38,

    height: 38,

    borderRadius: 19,

    alignItems: "center",

    justifyContent: "center",
  },
});