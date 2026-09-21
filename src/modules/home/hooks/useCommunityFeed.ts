import {
  useEffect,
  useState,
} from "react";

import {
  getFeeds,
  likePost as likeAdminPost,
} from "../services/home.service";

import {
  getSocialFeeds,
  likePost as likeSocialPost,
} from "@/modules/social/services/social.service";

import { useChurchStore } from "@/store/churchStore";

import { useAuthStore } from "@/store/authStore";

// Merges TWO genuinely different feed sources into one list, per
// what was actually asked for — users should see and interact
// with everything in one place, not just one source:
//
// 1. The church's own admin announcements/events —
//    POST /portal/{tenantId}/feeds (home.service.ts). useHome.ts
//    already consumes this correctly for Home's community card.
// 2. User-posted forum content —
//    GET /portal/Socials/GetFeeds?userId=... (social.service.ts).
//    This is what the social module's own useSocialFeeds() hits.
//
// Each item is tagged with _source so liking routes to the right
// endpoint per post's real origin — the two use different
// endpoints and payload shapes (confirmed: admin posts use
// POST /portal/{tenantId}/feeds/like with an explicit isLike
// flag; social posts use POST /portal/Socials/LikePost with no
// such flag, presumably toggling server-side).
//
// There's no reliable real timestamp on either source (both send
// pre-formatted relative strings like "10 days ago" — see
// formatDevotionalDate.ts) — so these can't be genuinely
// interleaved by recency, just concatenated. Admin posts are
// shown first since they're typically higher-priority
// announcements, but this is a display choice, not a real merge
// by time.
export default function useCommunityFeed() {
  const tenantId = useChurchStore(
    state => state.tenantId
  );

  const userId = useAuthStore(
    state => state.user?.userId
  );

  const token = useAuthStore(
    state => state.accessToken
  );

  const [
    feeds,
    setFeeds,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const loadFeeds = async () => {
    if (!tenantId) {
      return;
    }

    try {
      setLoading(true);

      const [
        adminResponse,
        socialResponse,
      ] = await Promise.all([
        getFeeds(tenantId).catch(
          error => {
            console.log(
              "ADMIN FEED ERROR:",
              error
            );

            return null;
          }
        ),

        userId
          ? getSocialFeeds(
              userId,
              token
            ).catch(error => {
              console.log(
                "SOCIAL FEED ERROR:",
                error
              );

              return null;
            })
          : Promise.resolve(
              null
            ),
      ]);

      const adminFeeds = (
        adminResponse?.object ||
        []
      ).map((item: any) => ({
        ...item,

        _source: "admin",
      }));

      const socialFeeds = (
        Array.isArray(
          socialResponse
        )
          ? socialResponse
          : []
      ).map((item: any) => ({
        ...item,

        _source: "social",
      }));

      setFeeds([
        ...adminFeeds,
        ...socialFeeds,
      ]);
    } catch (error) {
      console.log(
        "COMMUNITY FEED ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, [tenantId, userId]);

  const onRefresh = async () => {
    setRefreshing(true);

    await loadFeeds();

    setRefreshing(false);
  };

  // For a post the person just created themselves — added
  // directly to the front of the list rather than relying on
  // onRefresh(), since a full refetch just hands back whatever
  // order the backend gives within the social block (no reliable
  // timestamp to sort by, per the note above), which could still
  // land a brand new post anywhere in the middle of that block,
  // not necessarily the top.
  const prependFeed = (
    item: any
  ) => {
    setFeeds(prev => [
      item,
      ...prev,
    ]);
  };

  const handleLike = async (
    item: any,
    index: number
  ) => {
    const nextIsLiked =
      !item.isLiked;

    const copy = [...feeds];

    copy[index] = {
      ...copy[index],

      isLiked: nextIsLiked,

      likeCount:
        (copy[index]
          .likeCount || 0) +
        (nextIsLiked ? 1 : -1),
    };

    setFeeds(copy);

    try {
      if (
        item._source ===
        "social"
      ) {
        await likeSocialPost(
          {
            mobileUserID:
              userId,

            postId:
              item.postId,
          },
          token
        );
      } else {
        await likeAdminPost({
          tenantId,

          postId: item.postId,

          userId,

          isLike: nextIsLiked,
        });
      }
    } catch (error) {
      console.log(
        "LIKE ERROR:",
        error
      );

      // Revert on failure rather than leave the UI showing a like
      // that didn't actually save.
      setFeeds(feeds);
    }
  };

  return {
    feeds,
    loading,
    refreshing,
    onRefresh,
    prependFeed,
    handleLike,
  };
}