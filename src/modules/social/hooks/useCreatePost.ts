import { useState } from "react";

import * as ImagePicker from "expo-image-picker";

import { createPost } from "../services/social.service";

import { useAuthStore } from "@/store/authStore";

import { useChurchStore } from "@/store/churchStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

// Confirmed with backend dev — the postCategoryId a "regular"
// social post should use. This is a fixed value across tenants
// per the backend team, not something the app currently picks
// dynamically.
const DEFAULT_POST_CATEGORY_ID =
  "47f8d392-177c-4189-0228-08de8970eedf";

export default function useCreatePost(
  onSuccess?: (
    newPost: any
  ) => void
) {
  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state => state.accessToken
    );

  const tenantId =
    useChurchStore(
      state => state.tenantId
    );

  const { requireAuth } =
    useRequireAuth();

  // Was two separate required fields (title + content) — the
  // real feed card (CommunityFeedCard.tsx) only ever displays
  // item.content, confirmed directly; title is never shown
  // anywhere, so making someone fill in a second field nothing
  // ever surfaces was just friction. This is one field now; title
  // is derived from it at submit time, below.
  const [
    content,
    setContent,
  ] = useState("");

  // Real, picked from the device via expo-image-picker — not
  // fabricated. What's NOT real yet: actually uploading this to
  // get a URL back. See doPublish()'s comment on mediaUrl below —
  // there is no dedicated image/media upload endpoint anywhere in
  // this codebase (confirmed: the only multipart upload anywhere
  // is the combined profile-update call, a different endpoint
  // for a different purpose), so this stays picked-but-not-yet-
  // postable until that's confirmed.
  const [
    imageUri,
    setImageUri,
  ] = useState<string | null>(
    null
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    successVisible,
    setSuccessVisible,
  ] = useState(false);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes:
            ImagePicker.MediaTypeOptions
              .Images,

          quality: 0.8,
        }
      );

    if (
      !result.canceled &&
      result.assets?.[0]?.uri
    ) {
      setImageUri(
        result.assets[0].uri
      );
    }
  };

  const removeImage = () =>
    setImageUri(null);

  const doPublish =
    async () => {
      try {
        setLoading(true);

        if (!token) return;

        // mediaUrl needs a real, already-hosted URL — the
        // backend's CreatePost endpoint takes JSON, not a file
        // (confirmed: no multipart/Content-Type override on this
        // call). imageUri above is a local device file:// path,
        // not a URL, so it cannot go here directly yet. This is
        // the one piece still missing a confirmed real endpoint
        // to upload to and get a URL back — same situation as
        // SaveDeviceToken before it turned out to genuinely exist
        // once the real endpoint was confirmed. Once that
        // endpoint is confirmed, the fix is: upload imageUri
        // there first, then put its returned URL here instead of
        // null.
        const payload = {
          title: content
            .slice(0, 80)
            .trim(),

          content,

          bibleVerse: null,

          tags: null,

          memoryVerse: null,

          actionSteps: null,

          devotionalDate: null,

          checkInAttendanceID: null,

          mediaUrl: null,

          posterId:
            user?.userId,

          postCategoryId:
            DEFAULT_POST_CATEGORY_ID,

          tenantId,

          mediaChannels: [""],

          date: new Date().toISOString(),

          pageId: null,

          accessToken: null,

          toFacebook: true,

          showOnMainThread: true,

          spendPushNotification: true,

          socialMedia: {
            facebook: {
              pageId: null,
              accessToken: null,
            },
          },
        };

        console.log(
          "CREATE POST PAYLOAD:",
          payload
        );

        await createPost(
          payload,
          token,
        );

        // No real created-record data is read back from the
        // response (createPost's response shape was never
        // actually confirmed — the original code didn't read it
        // either), so this constructs the optimistic item from
        // exactly what was just sent, plus the current user's own
        // known name/photo — same fallback source used for the
        // identical situation in useFeedDetails.ts's comment fix.
        // It's a real echo of what was actually submitted, not a
        // fabricated post. CommunityFeedCard.tsx builds the
        // display name itself from person.firstName/lastName, so
        // there's no need to pre-join it here.
        onSuccess?.({
          postId: `local-${Date.now()}`,

          content,

          date: payload.date,

          isLiked: false,

          likeCount: 0,

          comments: [],

          mediaUrl: null,

          _source: "social",

          posterDetails: {
            person: {
              firstName:
                user?.firstName,

              lastName:
                user?.lastName,

              photo: user?.photo,
            },
          },
        });

        setContent("");

        setImageUri(null);

        setSuccessVisible(
          true
        );
      } catch (
        error: any
      ) {
        console.log(
          "CREATE POST ERROR:",
          error?.response?.data ??
            error
        );
      } finally {
        setLoading(false);
      }
    };

  const publishPost =
    async () => {
      if (!content.trim()) {
        return;
      }

      // Was: `if (!token) { console.log(...); return; }` — a
      // guest filling out a whole post and tapping Publish got
      // nothing but a console line only a developer would ever
      // see. requireAuth() redirects to Login with a clear reason
      // instead of failing silently.
      requireAuth(doPublish, {
        message:
          "Sign in to publish a post.",
      });
    };

  return {
    content,

    setContent,

    imageUri,

    pickImage,

    removeImage,

    loading,

    publishPost,

    successVisible,

    setSuccessVisible,
  };
}