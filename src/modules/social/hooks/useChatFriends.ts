import {
  useEffect,
  useState,
} from "react";

import { getUserConnections } from "../services/social.service";

import { useAuthStore } from "@/store/authStore";

// Classic's useConnectedFriends.ts fetches this same data, but
// gates it behind user?.tenantID (the unreliable source from the
// Devotionals bug) even though getUserConnections() itself doesn't
// need a tenantId at all — meaning the friends list there can fail
// to load for a reason that has nothing to do with friends. This
// is a focused, correctly-scoped version for the New Chat picker.
export default function useChatFriends() {
  const userId = useAuthStore(
    state => state.user?.userId
  );

  const token = useAuthStore(
    state => state.accessToken
  );

  const [
    friends,
    setFriends,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  useEffect(() => {
    if (!userId || !token) {
      return;
    }

    (async () => {
      try {
        setLoading(true);

        const response =
          await getUserConnections(
            userId,
            token
          );

        setFriends(
          (
            response?.data ||
            []
          ).map(
            (item: any) => ({
              id: item.userId,

              fullName: `${
                item.person
                  ?.firstName ||
                ""
              } ${
                item.person
                  ?.lastName ||
                ""
              }`.trim(),

              photo:
                item.person
                  ?.photo,
            })
          )
        );
      } catch (error) {
        console.log(
          "CHAT FRIENDS ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, token]);

  return {
    friends,
    loading,
  };
}