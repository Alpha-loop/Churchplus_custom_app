import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getMeetupUsers,
  getUserConnections,
  requestFriendship,
} from "../services/social.service";

import {
  useAuthStore,
} from "@/store/authStore";

import { useChurchStore } from "@/store/churchStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

export default function useConnections() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    exploreConnections,
    setExploreConnections,
  ] = useState<any[]>([]);

  const [
    friends,
    setFriends,
  ] = useState<any[]>([]);

  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state =>
        state.accessToken
    );

  // Was user?.tenantID — confirmed (same as the original
  // Devotionals bug) that authStore.user never reliably carries
  // a tenantId at all. churchStore's tenantId is the proven
  // source everywhere else in this codebase.
  const tenantId = useChurchStore(
    state => state.tenantId
  );

  const loadData =
    async () => {
      try {
        setLoading(true);

        if (!tenantId || !user?.userId) return;

        const [
          exploreRes,
          friendsRes,
        ] =
          await Promise.all([
            getMeetupUsers(
              tenantId,
              user?.userId,
              token
            ),

            getUserConnections(
              user?.userId,
              token!
            ),
          ]);

        setExploreConnections(
          exploreRes || []
        );

        setFriends(
          (friendsRes?.data || []).map(
            (item: any) => ({
              id: item.userId,

              fullName: `${
                item.person?.firstName || ""
              } ${
                item.person?.lastName || ""
              }`.trim(),

              photo:
                item.person?.photo,

              address:
                item.person?.address,

              friendshipRequest:
                item.friendshipRequest,
            })
          )
        );
      } catch (
        error
      ) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // Was `[]` — meaning if tenantId/userId/token weren't ready the
  // instant this hook first mounted, loadData() never ran again,
  // leaving exploreConnections/friends stuck empty forever even
  // once those values became available. This is exactly why the
  // screen showed "No connections found" despite the real API
  // having ~20 valid members for this tenant — confirmed directly
  // from a raw response.
  useEffect(() => {
    if (
      tenantId &&
      user?.userId &&
      token
    ) {
      loadData();
    }
  }, [tenantId, user?.userId, token]);

  

  const { requireAuth } =
    useRequireAuth();

  const doSendRequest =
    async (
      friendId: string
    ) => {
      try {
        await requestFriendship(
          {
            FriendRequesterID:
              user?.userId,

            FriendApproverID:
              friendId,
          },
          token
        );

        setExploreConnections(
          prev =>
            prev.map(
              item =>
                item.id ===
                friendId
                  ? {
                      ...item,
                      friendshipRequest:
                        "Pending",
                    }
                  : item
            )
        );
      } catch (
        error
      ) {
        console.log(error);
      }
    };

  // A guest never sees a candidate card to tap in the first
  // place — loadData()'s effect above only runs when
  // user?.userId is already present, so exploreConnections/
  // friends stay empty for a guest. This guard is defensive
  // completeness, matching the pattern applied everywhere else.
  const sendRequest = (
    friendId: string
  ) =>
    requireAuth(
      () =>
        doSendRequest(friendId),
      {
        message:
          "Sign in to send a friend request.",
      }
    );

  const filteredExplore =
    useMemo(
      () =>
        exploreConnections.filter(
          item =>
            searchText ===
              "" ||
            // Was item.name — getMeetupUsers()'s own mapping
            // never produces a `name` field, only `fullName`, so
            // this never matched anything once someone actually
            // typed a search term.
            item.fullName
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              )
        ),
      [
        exploreConnections,
        searchText,
      ]
    );

  const filteredFriends =
    useMemo(
      () =>
        friends.filter(
          item =>
            searchText === "" ||
            item.fullName
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              )
        ),
      [
        friends,
        searchText,
      ]
    );

  

  return {
    loading,

    searchText,

    setSearchText,

    exploreConnections:
      filteredExplore,

    friends:
      filteredFriends,

    sendRequest,
  };
}