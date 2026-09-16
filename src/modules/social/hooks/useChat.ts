import {
  useEffect,
  useState,
} from "react";

import {
  getChatMessages,
  saveMessage,
} from "../services/social.service";

import {
  useAuthStore,
} from "@/store/authStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

export default function useChat(
  user2Id: string
) {
  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state =>
        state.accessToken
    );

  const { requireAuth } =
    useRequireAuth();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    sending,
    setSending,
  ] = useState(false);

  const [
    messages,
    setMessages,
  ] = useState<any[]>([]);

  const [
    text,
    setText,
  ] = useState("");

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
          await getChatMessages(
            user.userId,
            user2Id,
            token
          );

        console.log(
          "CHAT RESPONSE:",
          response
        );

        setMessages(
          response || []
        );
      } catch (
        error
      ) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadMessages();
  }, []);

  const doSendMessage =
    async () => {
      if (!text.trim()) {
        return;
      }

      try {
        setSending(true);

        const payload = {
          SenderId:
            user?.userId,

          RecieverId:
            user2Id,

          text,
        };

        const response =
          await saveMessage(
            payload,
            token
          );

        setMessages(
          prev => [
            ...prev,
            response,
          ]
        );

        setText("");
      } catch (
        error
      ) {
        console.log(error);
      } finally {
        setSending(false);
      }
    };

  // Unlike the read side (loadMessages, gated on user?.userId), a
  // guest CAN reach the compose input directly — the send button
  // isn't hidden just because history failed to load. Was: `if
  // (!token) return` — a guest typing a message and hitting send
  // got total silence, no indication anything went wrong.
  const sendMessage = () =>
    requireAuth(
      doSendMessage,
      {
        message:
          "Sign in to send a message.",
      }
    );

  return {
    loading,
    sending,
    messages,
    text,
    setText,
    sendMessage,
  };
}