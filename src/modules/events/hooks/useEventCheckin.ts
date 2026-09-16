// modules/events/hooks/useEventCheckin.ts

import { useCallback, useState } from "react";

import { useAuthStore } from "@/store/authStore";

import { checkInToEvent } from "../service/event.services";

export interface EventCheckinSuccess {
  success: true;
  data: Awaited<ReturnType<typeof checkInToEvent>>;
}

export interface EventCheckinFailure {
  success: false;
  error: string;
  code?: string;
}

export type EventCheckinResult =
  | EventCheckinSuccess
  | EventCheckinFailure;

function extractErrorMessage(error: unknown): { message: string; code?: string } {
  // Adjust this to match your actual API error shape.
  // Handles axios-style errors, plain Error, and unknown throwables.
  if (error && typeof error === "object") {
    const anyErr = error as any;

    const apiMessage =
      anyErr?.response?.data?.message ??
      anyErr?.response?.data?.error ??
      anyErr?.data?.message;

    const code =
      anyErr?.response?.data?.code ??
      anyErr?.response?.status?.toString() ??
      anyErr?.code;

    if (typeof apiMessage === "string" && apiMessage.length > 0) {
      return { message: apiMessage, code };
    }

    if (anyErr instanceof Error && anyErr.message) {
      return { message: anyErr.message, code };
    }
  }

  return { message: "Something went wrong while checking you in. Please try again." };
}

export default function useEventCheckin() {
  const [loading, setLoading] = useState(false);

  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.accessToken);

  const submitCheckin = useCallback(
    async (eventId: string): Promise<EventCheckinResult> => {
      if (!eventId) {
        return { success: false, error: "Missing event ID in QR code." };
      }

      if (!user?.userId || !token) {
        return {
          success: false,
          error: "You need to be signed in to check in to an event.",
          code: "UNAUTHENTICATED",
        };
      }

      setLoading(true);

      try {
        const data = await checkInToEvent(
          { eventId, userId: user.userId },
          token
        );

        return { success: true, data };
      } catch (error) {
        const { message, code } = extractErrorMessage(error);

        return { success: false, error: message, code };
      } finally {
        setLoading(false);
      }
    },
    [user, token]
  );

  return {
    loading,
    submitCheckin,
  };
}