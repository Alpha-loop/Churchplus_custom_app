import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";

import {
  Users,
  ChevronRight,
  ChevronLeft,
  ImagePlus,
  X,
} from "lucide-react-native";

import useCommunityFeed from "@/modules/home/hooks/useCommunityFeed";

import useCreatePost from "@/modules/social/hooks/useCreatePost";

import useModeration from "@/modules/moderation/hooks/useModeration";

import { useChurchStore } from "@/store/churchStore";

import CommunityFeedCard from "../components/CommunityFeedCard";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernCommunityScreen({
  navigation,
}: any) {
  const { colors } = useTheme();

  const {
    loading,
    refreshing,
    feeds,
    handleLike,
    onRefresh,
    prependFeed,
  } = useCommunityFeed();

  // Adds the new post straight to the top of the local list —
  // see useCommunityFeed.ts's prependFeed for why this is a
  // direct prepend rather than a refetch.
  const {
    content,
    setContent,
    imageUri,
    pickImage,
    removeImage,
    loading: publishing,
    publishPost,
  } = useCreatePost(prependFeed);

  const {
    canModeratePost,
    showPostMenu,
  } = useModeration();

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const joinGroupForm =
    fullProfile?.forms?.find(
      form =>
        form.name
          ?.toLowerCase()
          ?.includes(
            "join a group"
          )
    );

  return (
    <View
      style={{
        flex: 1,

        backgroundColor:
          colors.background,
      }}
    >
      {/* Same header as the other drawer screens (Messages,
          Notifications, Settings, My Notes, About, Bible): back
          arrow + centered title. This screen used the tab-style
          header (menu button, church name, avatar), which belongs
          to the bottom-tab screens — Community is opened from the
          drawer, so it should look like its siblings. */}
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
          Community
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <RefreshControl
          refreshing={
            refreshing
          }
          onRefresh={onRefresh}
        />
      }
    >
      <Text
        style={[
          styles.subtitle,
          { color: colors.textSecondary },
        ]}
      >
        Connect, share, and grow
        together in faith. Discover
        announcements and join
        conversations.
      </Text>

      <View
        style={[
          styles.composer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <TextInput
          value={content}
          onChangeText={
            setContent
          }
          placeholder="Share a prayer request or thought..."
          placeholderTextColor={colors.textMuted}
          multiline
          style={[
            styles.composerInput,
            { color: colors.textPrimary },
          ]}
        />

        {imageUri ? (
          <View
            style={
              styles.imagePreviewWrap
            }
          >
            <Image
              cachePolicy="memory-disk"
              source={{
                uri: imageUri,
              }}
              style={
                styles.imagePreview
              }
            />

            <TouchableOpacity
              onPress={
                removeImage
              }
              style={[
                styles.removeImageButton,
                { backgroundColor: colors.overlay },
              ]}
            >
              <X
                size={14}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ) : null}

        <View
          style={
            styles.composerFooter
          }
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={pickImage}
            style={
              styles.addImageButton
            }
          >
            <ImagePlus
              size={18}
              color={colors.primary}
            />

            <Text
              style={[
                styles.addImageText,
                { color: colors.primary },
              ]}
            >
              Photo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={
              publishing ||
              !content.trim()
            }
            onPress={
              publishPost
            }
            style={[
              styles.postButton,
              {
                backgroundColor: colors.primary,
                opacity:
                  publishing ||
                  !content.trim()
                    ? 0.5
                    : 1,
              },
            ]}
          >
            <Text
              style={
                styles.postButtonText
              }
            >
              {publishing
                ? "Posting..."
                : "Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text
        style={[
          styles.sectionTitle,
          { color: colors.textPrimary },
        ]}
      >
        Announcements & Feed
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary}
          style={{
            marginTop: 20,
          }}
        />
      ) : feeds.length > 0 ? (
        feeds.map(
          (item: any, index: number) => (
            <CommunityFeedCard
              key={item.postId}
              item={item}
              churchName={
                fullProfile?.churchName
              }
              onLike={() =>
                handleLike(
                  item,
                  index
                )
              }
              onPress={() =>
                navigation.navigate(
                  "FeedsDetail",
                  {
                    feed: item,
                  }
                )
              }
              onMore={
                canModeratePost(
                  item
                )
                  ? () =>
                      showPostMenu(
                        item
                      )
                  : undefined
              }
            />
          )
        )
      ) : (
        <Text
          style={[
            styles.emptyText,
            { color: colors.textMuted },
          ]}
        >
          No posts yet — be the
          first to share
          something with your
          community.
        </Text>
      )}

      {joinGroupForm?.url ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate(
              "ExternalUrl",
              {
                title:
                  "Join a Group",

                uri: joinGroupForm.url,
              }
            )
          }
          style={[
            styles.groupCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View
            style={[
              styles.groupIcon,
              { backgroundColor: colors.primaryMuted },
            ]}
          >
            <Users
              size={20}
              color={colors.primary}
            />
          </View>

          <View
            style={{ flex: 1 }}
          >
            <Text
              style={[
                styles.groupTitle,
                { color: colors.textPrimary },
              ]}
            >
              Join a Group
            </Text>

            <Text
              style={[
                styles.groupSubtitle,
                { color: colors.textMuted },
              ]}
            >
              Find a ministry
              group that fits
              you
            </Text>
          </View>

          <ChevronRight
            size={18}
            color={colors.textMuted}
          />
        </TouchableOpacity>
      ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
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

  subtitle: {
    fontSize: 14,

    marginTop: 0,

    marginBottom: 18,

    lineHeight: 20,
  },

  composer: {
    borderRadius: 14,

    paddingHorizontal: 16,

    paddingTop: 14,

    paddingBottom: 10,

    marginBottom: 20,

    borderWidth: 1,
  },

  composerInput: {
    fontSize: 14,

    minHeight: 44,

    textAlignVertical: "top",
  },

  imagePreviewWrap: {
    marginTop: 10,

    position: "relative",

    alignSelf: "flex-start",
  },

  imagePreview: {
    width: 120,

    height: 120,

    borderRadius: 10,
  },

  removeImageButton: {
    position: "absolute",

    top: 6,

    right: 6,

    width: 22,

    height: 22,

    borderRadius: 11,

    alignItems: "center",

    justifyContent: "center",
  },

  composerFooter: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginTop: 10,
  },

  addImageButton: {
    flexDirection: "row",

    alignItems: "center",

    gap: 6,

    paddingVertical: 6,

    paddingHorizontal: 4,
  },

  addImageText: {
    fontSize: 13,

    fontWeight: "600",
  },

  postButton: {
    borderRadius: 18,

    paddingHorizontal: 20,

    paddingVertical: 9,
  },

  postButtonText: {
    color: "#FFFFFF",

    fontSize: 13,

    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 17,

    fontWeight: "700",

    marginBottom: 12,
  },

  emptyText: {
    fontSize: 13,

    textAlign: "center",

    paddingVertical: 24,
  },

  groupCard: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,

    borderRadius: 14,

    padding: 16,

    marginTop: 8,

    borderWidth: 1,
  },

  groupIcon: {
    width: 40,

    height: 40,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",
  },

  groupTitle: {
    fontSize: 14,

    fontWeight: "700",
  },

  groupSubtitle: {
    fontSize: 12,

    marginTop: 2,
  },
});