import {
  useEffect,
  useState,
} from "react";

import {
  getAllMessages,
} from "../services/social.service";

import {
  useAuthStore,
} from "@/store/authStore";

export default function useMessages() {
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
    messages,
    setMessages,
  ] = useState<any[]>([]);

  const loadMessages =
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
          await getAllMessages(
            user.userId,
            token
          );

        console.log(
          "MESSAGES:",
          response
        );

        console.log(
            JSON.stringify(
                response,
                null,
                2
            )
        );

        setMessages(
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
    loadMessages();
  }, []);

  return {
    loading,
    messages,
    refresh:
      loadMessages,
  };
}