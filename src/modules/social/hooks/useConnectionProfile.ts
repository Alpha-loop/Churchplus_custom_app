import {
  useEffect,
  useState,
} from "react";

import {
  getUserProfile,
  getUserPost,
  requestFriendship,
} from "../services/social.service";

import {
  useAuthStore,
} from "@/store/authStore";

export default function useConnectionProfile(
  profileUserId: string
) {

  console.log(profileUserId, "profile User Id")
  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state =>
        state.accessToken
    );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    profile,
    setProfile,
  ] = useState<any>(
    null
  );

  const [
    posts,
    setPosts,
  ] = useState<any[]>(
    []
  );

  const [
    connectionState,
    setConnectionState,
  ] = useState(
    "not_connected"
  );

  const loadData =
    async () => {
      try {
        setLoading(true);

        const [
          profileRes,
          postsRes,
        ] =
          await Promise.all([
            getUserProfile(
              profileUserId,
              token!
            ),

            getUserPost(
              profileUserId,
              token!
            ),
          ]);

        setProfile(
          profileRes
        );

        setPosts(
          postsRes || []
        );

        const status =
          profileRes
            ?.friendshipRequest
            ?.toLowerCase();

        if (
          status ===
          "approved"
        ) {
          setConnectionState(
            "connected"
          );
        } else if (
          status ===
          "pending"
        ) {
          setConnectionState(
            "requested"
          );
        } else {
          setConnectionState(
            "not_connected"
          );
        }
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    if (
      profileUserId &&
      token
    ) {
      loadData();
    }
  }, [
    profileUserId,
    token,
  ]);

  const connect =
    async () => {
      try {
        await requestFriendship(
          {
            FriendRequesterID:
              user?.userId,

            FriendApproverID:
              profileUserId,
          },
          token!
        );

        setConnectionState(
          "requested"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  return {
    loading,

    profile,

    posts,

    connectionState,

    connect,
  };
}