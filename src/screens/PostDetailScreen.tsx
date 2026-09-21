import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  ChevronLeft,
  Heart,
  MessageCircle,
  Share2,
  Send,
} from "lucide-react-native";

import useFeedDetails from "@/modules/feedDetails/hooks/useFeedDetails";

import { useChurchStore } from "@/store/churchStore";

import { formatDevotionalDate } from "../screenUtils/formatDevotionalDate";

import { useTheme } from "@/theme/ThemeContext";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import { useSafeAreaInsets } from "react-native-safe-area-context";

const getPosterName = (
  feed: any,
  churchName?: string
) => {
  const person =
    feed?.posterDetails
      ?.person;

  const fullName = [
    person?.firstName,
    person?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    fullName ||
    churchName ||
    "Church"
  );
};

const getInitial = (
  name?: string
) =>
  name?.trim()?.[0]?.toUpperCase() ||
  "?";

export default function ModernPostDetailScreen({
  navigation,
  route,
}: any) {
  const { colors } = useTheme();

  const { requireAuth } =
    useRequireAuth();

  const insets = useSafeAreaInsets();

  const { feed } = route.params;

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const posterName =
    getPosterName(
      feed,
      fullProfile?.churchName
    );

  const posterPhoto =
    feed?.posterDetails
      ?.person?.photo;

  const {
    isLiked,
    toggleLike,
    handleShare,
    commentMessage,
    setCommentMessage,
    comments,
    loadingComment,
    createComment,
  } = useFeedDetails(feed);

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
        >
          Post Details
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        style={
          styles.scroll
        }
        contentContainerStyle={{
          padding: 16,
        }}
        showsVerticalScrollIndicator={
          false
        }
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={
              styles.header
            }
          >
            <View
              style={[
                styles.avatar,
                { backgroundColor: colors.primary },
              ]}
            >
              {posterPhoto ? (
                <Image
              cachePolicy="memory-disk"
                  source={{
                    uri: posterPhoto,
                  }}
                  style={
                    styles.avatar
                  }
                />
              ) : (
                <Text
                  style={
                    styles.avatarText
                  }
                >
                  {getInitial(
                    posterName
                  )}
                </Text>
              )}
            </View>

            <View
              style={{
                flex: 1,
              }}
            >
              <Text
                style={[
                  styles.name,
                  { color: colors.textPrimary },
                ]}
              >
                {posterName}
              </Text>

              <Text
                style={[
                  styles.date,
                  { color: colors.textMuted },
                ]}
              >
                {formatDevotionalDate(
                  feed.date
                )}
              </Text>
            </View>
          </View>

          <Text
            style={[
              styles.content,
              { color: colors.textSecondary },
            ]}
          >
            {feed.content}
          </Text>

          {feed.mediaUrl ? (
            <Image
              cachePolicy="memory-disk"
              source={{
                uri: feed.mediaUrl,
              }}
              style={
                styles.media
              }
            />
          ) : null}

          <View
            style={[
              styles.footer,
              { borderTopColor: colors.divider },
            ]}
          >
            <TouchableOpacity
              style={
                styles.stat
              }
              onPress={() =>
                requireAuth(
                  toggleLike,
                  {
                    message:
                      "Sign in to like this post.",
                  }
                )
              }
            >
              <Heart
                size={18}

                color={
                  isLiked
                    ? "#E0245E"
                    : colors.textMuted
                }

                fill={
                  isLiked
                    ? "#E0245E"
                    : "transparent"
                }
              />

              <Text
                style={[
                  styles.statText,
                  { color: colors.textSecondary },
                ]}
              >
                {feed.likeCount ??
                  0}
              </Text>
            </TouchableOpacity>

            <View
              style={
                styles.stat
              }
            >
              <MessageCircle
                size={18}
                color={colors.textMuted}
              />

              <Text
                style={[
                  styles.statText,
                  { color: colors.textSecondary },
                ]}
              >
                {comments.length}
              </Text>
            </View>

            <TouchableOpacity
              style={
                styles.stat
              }
              onPress={
                handleShare
              }
            >
              <Share2
                size={18}
                color={colors.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={
            styles.commentsHeader
          }
        >
          <Text
            style={[
              styles.commentsTitle,
              { color: colors.textPrimary },
            ]}
          >
            Comments
          </Text>

          <View
            style={[
              styles.commentsBadge,
              { backgroundColor: colors.primaryMuted },
            ]}
          >
            <Text
              style={[
                styles.commentsBadgeText,
                { color: colors.primary },
              ]}
            >
              {comments.length}
            </Text>
          </View>
        </View>

        {comments.map(
          (
            comment: any,
            index: number
          ) => (
            <View
              key={
                comment.commentId ??
                index
              }
              style={
                styles.commentRow
              }
            >
              {comment.photo ||
              comment.commenterPicture ? (
                <Image
              cachePolicy="memory-disk"
                  source={{
                    uri:
                      comment.photo ||
                      comment.commenterPicture,
                  }}
                  style={
                    styles.commentAvatar
                  }
                />
              ) : (
                <View
                  style={[
                    styles.commentAvatar,
                    styles.commentAvatarPlaceholder,
                    { backgroundColor: colors.primary },
                  ]}
                >
                  <Text
                    style={
                      styles.avatarText
                    }
                  >
                    {getInitial(
                      comment.commenterName
                    )}
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.commentBubble,
                  { backgroundColor: colors.surface },
                ]}
              >
                <View
                  style={
                    styles.commentHeaderRow
                  }
                >
                  <Text
                    style={[
                      styles.commentName,
                      { color: colors.textPrimary },
                    ]}
                  >
                    {
                      comment.commenterName
                    }
                  </Text>

                  {comment.commentDate ? (
                    <Text
                      style={[
                        styles.commentDate,
                        { color: colors.textMuted },
                      ]}
                    >
                      {
                        comment.commentDate
                      }
                    </Text>
                  ) : null}
                </View>

                <Text
                  style={[
                    styles.commentText,
                    { color: colors.textSecondary },
                  ]}
                >
                  {
                    comment.commentMessage
                  }
                </Text>
              </View>
            </View>
          )
        )}
      </ScrollView>

      <View
        style={[
          styles.commentInputRow,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,

            // Was fixed padding: 12 with no safe-area awareness —
            // same class of bug as the bottom tab bar fix
            // elsewhere in this app. On a device with a home
            // indicator instead of a physical button, this
            // squeezed the input/send button right up against
            // the gesture area.
            paddingBottom:
              12 + insets.bottom,
          },
        ]}
      >
        <TextInput
          value={
            commentMessage
          }
          onChangeText={
            setCommentMessage
          }
          placeholder="Write a comment..."
          placeholderTextColor={colors.textMuted}
          style={[
            styles.commentInput,
            {
              backgroundColor: colors.background,
              color: colors.textPrimary,
            },
          ]}
        />

        <TouchableOpacity
          onPress={() =>
            requireAuth(
              createComment,
              {
                message:
                  "Sign in to comment on this post.",
              }
            )
          }
          disabled={
            loadingComment ||
            !commentMessage.trim()
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
    fontSize: 16,

    fontWeight: "700",
  },

  scroll: {
    flex: 1,
  },

  card: {
    borderRadius: 16,

    padding: 16,

    marginBottom: 20,

    borderWidth: 1,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginBottom: 12,
  },

  avatar: {
    width: 42,

    height: 42,

    borderRadius: 21,

    alignItems: "center",

    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 15,
  },

  name: {
    fontSize: 15,

    fontWeight: "700",
  },

  date: {
    fontSize: 12,

    marginTop: 2,
  },

  content: {
    fontSize: 15,

    lineHeight: 22,
  },

  media: {
    width: "100%",

    height: 200,

    borderRadius: 12,

    marginTop: 14,
  },

  footer: {
    flexDirection: "row",

    gap: 24,

    marginTop: 16,

    paddingTop: 14,

    borderTopWidth: 1,
  },

  stat: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,
  },

  statText: {
    fontSize: 13,
  },

  commentsHeader: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginBottom: 14,
  },

  commentsTitle: {
    fontSize: 17,

    fontWeight: "700",
  },

  commentsBadge: {
    borderRadius: 10,

    paddingHorizontal: 8,

    paddingVertical: 2,
  },

  commentsBadgeText: {
    fontSize: 12,

    fontWeight: "700",
  },

  commentRow: {
    flexDirection: "row",

    gap: 10,

    marginBottom: 14,
  },

  commentAvatar: {
    width: 34,

    height: 34,

    borderRadius: 17,
  },

  commentAvatarPlaceholder: {
    alignItems: "center",

    justifyContent: "center",
  },

  commentBubble: {
    flex: 1,

    borderRadius: 12,

    padding: 12,
  },

  commentHeaderRow: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginBottom: 4,
  },

  commentName: {
    fontSize: 13,

    fontWeight: "700",
  },

  commentDate: {
    fontSize: 11,
  },

  commentText: {
    fontSize: 13,

    lineHeight: 18,
  },

  commentInputRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    padding: 12,

    borderTopWidth: 1,
  },

  commentInput: {
    flex: 1,

    borderRadius: 20,

    paddingHorizontal: 16,

    paddingVertical: 10,

    fontSize: 14,
  },

  sendButton: {
    width: 38,

    height: 38,

    borderRadius: 19,

    alignItems: "center",

    justifyContent: "center",
  },
});