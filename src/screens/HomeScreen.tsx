import {
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

import useHome from "@/modules/home/hooks/useHome";

import { useAppConfigStore } from "@/store/appConfig.store";

import { useChurchStore } from "@/store/churchStore";

import { useAuthStore } from "@/store/authStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import { likePost } from "@/modules/home/services/home.service";

import { DEFAULT_MODERN_SECTIONS } from "../config/defaultSections";

import SectionRenderer from "../components/SectionRenderer";

import CommunityFeedCard from "../components/CommunityFeedCard";

import { useTheme } from "@/theme/ThemeContext";

export default function ModernHomeScreen({
  navigation,
}: any) {
  const insets = useSafeAreaInsets();

  const { colors } = useTheme();

  const {
    devotional,
    videos,
    feeds,
    setFeeds,
    onRefresh,
    refreshing,
  } = useHome();

  const configSections =
    useAppConfigStore(
      state =>
        state.config?.sections
    );

  const fullProfile =
    useChurchStore(
      state =>
        state.fullProfile
    );

  const tenantId =
    useChurchStore(
      state => state.tenantId
    );

  const user = useAuthStore(
    state => state.user
  );

  const { requireAuth } =
    useRequireAuth();

  // Falls back to a sensible default whenever the active config
  // doesn't supply sections — see DEFAULT_MODERN_SECTIONS for why.
  const sections =
    configSections &&
    configSections.length > 0
      ? configSections
      : DEFAULT_MODERN_SECTIONS;

  const orderedSections = [
    ...sections,
  ].sort(
    (a, b) =>
      a.order - b.order
  );

  // "Top ten latest feeds" — getFeeds() doesn't return a real
  // sortable date (confirmed elsewhere in this codebase: it's a
  // pre-formatted relative string like "one year ago", not an
  // ISO timestamp), so this assumes the backend already returns
  // them newest-first and just takes the first 10 as given,
  // rather than re-sorting on a field that can't support it.
  const topTenFeeds = feeds.slice(
    0,
    10
  );

  const firstTwoFeeds =
    topTenFeeds.slice(0, 2);

  const remainingFeeds =
    topTenFeeds.slice(2, 10);

  const doLikeFeed = async (
    item: any,
    index: number
  ) => {
    const nextIsLiked =
      !item.isLiked;

    const updated = [...feeds];

    const feedIndex =
      feeds.findIndex(
        (f: any) =>
          f.postId ===
          item.postId
      );

    if (feedIndex === -1) {
      return;
    }

    updated[feedIndex] = {
      ...updated[feedIndex],

      isLiked: nextIsLiked,

      likeCount:
        (updated[feedIndex]
          .likeCount || 0) +
        (nextIsLiked ? 1 : -1),
    };

    setFeeds(updated);

    if (!tenantId || !user?.userId) return;

    try {
      await likePost({
        tenantId,

        postId: item.postId,

        userId: user?.userId,

        isLike: nextIsLiked,
      });
    } catch (error) {
      console.log(
        "HOME FEED LIKE ERROR:",
        error
      );

      setFeeds(feeds);
    }
  };

  const onLikeFeed = (
    item: any,
    index: number
  ) =>
    requireAuth(
      () =>
        doLikeFeed(item, index),
      {
        message:
          "Sign in to like this post.",
      }
    );

  const onPressFeed = (
    item: any
  ) =>
    navigation.navigate(
      "FeedsDetail",
      {
        feed: item,
      }
    );

  const shareVideo = async () => {
    if (!videos[0]?.videoId) {
      return;
    }

    await Share.share({
      title: "Live Streamed Service",

      message: `Join us on YouTube and let's enjoy God's presence.\n\nhttps://www.youtube.com/watch?v=${videos[0].videoId}`,

      url: `https://www.youtube.com/watch?v=${videos[0].videoId}`,
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            colors.background,
        },
      ]}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,

          gap: 16,

          paddingBottom:
            insets.bottom + 24,
        }}
        showsVerticalScrollIndicator={
          false
        }
        refreshControl={
          <RefreshControl
            refreshing={
              refreshing
            }
            onRefresh={
              onRefresh
            }
          />
        }
      >
        {orderedSections.map(
          section => (
            <View
              key={section.id}
            >
              <SectionRenderer
                section={
                  section
                }
                data={{
                  devotional,

                  video: videos[0],

                  feed: feeds[0],
                }}
                onDevotionPress={() => {
                  // TODO: mirror Classic's navigation.navigate("TodayDevotional", { data: devotional })
                  // once a Modern devotional detail screen exists.
                  console.log(
                    "Devotion pressed",
                    devotional
                  );
                }}
                onMediaPress={() => {
                  if (
                    !videos[0]
                  ) {
                    return;
                  }

                  navigation.navigate(
                    "ViewVideoDetails",
                    {
                      data: videos[0],

                      videoDetails: videos,
                    }
                  );
                }}
                onMediaShare={
                  shareVideo
                }
                onDonationPress={() => {
                  // "Giving" is a sibling tab on this same bottom
                  // tab navigator (Home is itself one of its
                  // Tab.Screens), so a direct navigate works here —
                  // unlike Classic's equivalent bug, this isn't
                  // being called from an ancestor navigator context.
                  navigation.navigate(
                    "Giving"
                  );
                }}
                onCommunityPress={() => {
                  if (
                    !feeds[0]
                      ?.postId
                  ) {
                    return;
                  }

                  navigation.navigate(
                    "FeedsDetail",
                    {
                      feed: feeds[0],
                    }
                  );
                }}
              />

              {/* First 2 of the top-ten feeds, right after
                  Trending/Media, as asked. */}
              {section.type ===
              "media"
                ? firstTwoFeeds.map(
                    (
                      item,
                      index
                    ) => (
                      <View
                        key={
                          item.postId
                        }
                        style={{
                          marginTop: 16,
                        }}
                      >
                        <CommunityFeedCard
                          item={
                            item
                          }
                          churchName={
                            fullProfile?.churchName
                          }
                          onLike={() =>
                            onLikeFeed(
                              item,
                              index
                            )
                          }
                          onPress={() =>
                            onPressFeed(
                              item
                            )
                          }
                        />
                      </View>
                    )
                  )
                : null}

              {/* Remaining 8 of the top-ten feeds, right after
                  the Give card, as asked. */}
              {section.type ===
              "donation"
                ? remainingFeeds.map(
                    (
                      item,
                      index
                    ) => (
                      <View
                        key={
                          item.postId
                        }
                        style={{
                          marginTop: 16,
                        }}
                      >
                        <CommunityFeedCard
                          item={
                            item
                          }
                          churchName={
                            fullProfile?.churchName
                          }
                          onLike={() =>
                            onLikeFeed(
                              item,
                              index + 2
                            )
                          }
                          onPress={() =>
                            onPressFeed(
                              item
                            )
                          }
                        />
                      </View>
                    )
                  )
                : null}
            </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F3FA",
  },
});