import { useEffect, useState } from "react";

import {
  getPendingRequests,
  approveRequest,
  declineRequest,
} from "../services/social.service";

import { useAuthStore } from "@/store/authStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

export default function useNotifications() {
  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state => state.accessToken
    );

  const { requireAuth } =
    useRequireAuth();

  const [
    requests,
    setRequests,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const loadRequests =
    async () => {
      if (
        !user?.userId ||
        !token
      ) {
        return;
      }

      try {
        setLoading(true);

        const response =
          await getPendingRequests(
            user.userId,
            token
          );

        setRequests(
          response || []
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadRequests();
  }, []);

  // A guest never actually sees a request card to tap in the
  // first place — loadRequests() above already returns an empty
  // list for them. These guards are here for defensive
  // completeness (e.g. if this ever gets called some other way),
  // not because a guest can realistically trigger them today.
  const doApprove =
    async (
      request: any
    ) => {
      try {
        await approveRequest(
          {
            FriendRequesterID:
              request.friendRequesterID,

            FriendApproverID:
              user?.userId,
          },
          token!
        );

        loadRequests();
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const doDecline =
    async (
      request: any
    ) => {
      try {
        await declineRequest(
          {
            FriendRequesterID:
              request.friendRequesterID,

            FriendApproverID:
              user?.userId,
          },
          token!
        );

        loadRequests();
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const approve = (
    request: any
  ) =>
    requireAuth(
      () => doApprove(request),
      {
        message:
          "Sign in to accept friend requests.",
      }
    );

  const decline = (
    request: any
  ) =>
    requireAuth(
      () => doDecline(request),
      {
        message:
          "Sign in to manage friend requests.",
      }
    );

    

  return {
    loading,

    requests,

    approve,

    decline,

    refresh:
      loadRequests,
  };
}