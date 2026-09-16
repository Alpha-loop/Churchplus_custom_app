import {
  useEffect,
  useState,
} from "react";

import {
  getMeetupUsers,
  requestFriendship,
} from "../services/social.service";

import { useChurchStore } from "@/store/churchStore";

import { useAuthStore } from "@/store/authStore";

// Real data: getMeetupUsers() / GET
// /portal/Socials/GetOrganisationSpecificConnectionGraph, mapped
// to {id, firstName, lastName, fullName, photo, address,
// friendshipRequest}. Classic's own useConnectedFriends.ts already
// does something similar, but sources tenantId from
// user?.tenantID (the same unreliable source the Devotionals bug
// came from) and has an empty useEffect dependency array, so it
// never retries if tenantID isn't ready at mount — rather than
// build a new feature on a hook with known issues, this is a
// fresh version using churchStore's tenantId (the proven-reliable
// source) with a proper dependency array.
export default function useMeetupDiscovery() {
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
    candidates,
    setCandidates,
  ] = useState<any[]>([]);

  const [
    currentIndex,
    setCurrentIndex,
  ] = useState(0);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const loadCandidates =
    async () => {
      if (!tenantId || !userId) {
        return;
      }

      try {
        setLoading(true);

        const data =
          await getMeetupUsers(
            tenantId,
            userId,
            token
          );

        setCandidates(
          data || []
        );

        setCurrentIndex(0);
      } catch (error) {
        console.log(
          "MEETUP DISCOVERY ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadCandidates();
  }, [tenantId, userId]);

  const current =
    candidates[currentIndex];

  // For the stacked-card peek effect — shows the next couple of
  // real candidates behind the current one, not fake placeholder
  // cards, so what peeks through is genuinely who's next.
  const upcoming = candidates.slice(
    currentIndex + 1,
    currentIndex + 3
  );

  const skip = () => {
    setCurrentIndex(
      prev => prev + 1
    );
  };

  const sendRequest =
    async () => {
      if (!current) {
        return;
      }

      try {
        await requestFriendship(
          {
            FriendRequesterID:
              userId,

            FriendApproverID:
              current.id,
          },
          token
        );

        setCandidates(prev =>
          prev.map(item =>
            item.id ===
            current.id
              ? {
                  ...item,

                  friendshipRequest:
                    "Pending",
                }
              : item
          )
        );

        skip();
      } catch (error) {
        console.log(
          "SEND REQUEST ERROR:",
          error
        );
      }
    };

  return {
    loading,

    current,

    upcoming,

    hasMore:
      currentIndex <
      candidates.length,

    skip,

    sendRequest,
  };
}