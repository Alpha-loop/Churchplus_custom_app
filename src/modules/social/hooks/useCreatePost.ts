import { useState } from "react";

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

export default function useCreatePost() {
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

  const [
    title,
    setTitle,
  ] = useState("");

  const [
    content,
    setContent,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    successVisible,
    setSuccessVisible,
  ] = useState(false);

  const doPublish =
    async () => {
      try {
        setLoading(true);

        if (!token) return;

        const payload = {
          title,

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

        setTitle("");

        setContent("");

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
      if (
        !title.trim() ||
        !content.trim()
      ) {
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
    title,

    setTitle,

    content,

    setContent,

    loading,

    publishPost,

    successVisible,

    setSuccessVisible,
  };
}