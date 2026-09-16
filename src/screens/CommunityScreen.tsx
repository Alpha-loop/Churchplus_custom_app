import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Users, ChevronRight } from "lucide-react-native";

import useCommunityFeed from "@/modules/home/hooks/useCommunityFeed";

import { useChurchStore } from "@/store/churchStore";

import ModernScreenWithHeader from "../components/ModernScreenWithHeader";

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
  } = useCommunityFeed();

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
    <ModernScreenWithHeader>
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
          styles.title,
          { color: colors.textPrimary },
        ]}
      >
        Community
      </Text>

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

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() =>
          navigation.navigate(
            "CreatePost"
          )
        }
        style={[
          styles.composer,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <Text
          style={[
            styles.composerText,
            { color: colors.textMuted },
          ]}
        >
          Share a prayer request
          or thought...
        </Text>
      </TouchableOpacity>

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
    </ModernScreenWithHeader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 16,
  },

  title: {
    fontSize: 26,

    fontWeight: "800",
  },

  subtitle: {
    fontSize: 14,

    marginTop: 8,

    marginBottom: 18,

    lineHeight: 20,
  },

  composer: {
    borderRadius: 14,

    paddingHorizontal: 16,

    paddingVertical: 14,

    marginBottom: 20,

    borderWidth: 1,
  },

  composerText: {
    fontSize: 14,
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