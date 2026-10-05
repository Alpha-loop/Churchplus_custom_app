import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  getMeetupUsers,
  requestFriendship,
} from "../services/social.service";

import { useChurchStore } from "@/store/churchStore";

import { useAuthStore } from "@/store/authStore";

export type RequestFeedback = {
  type: "success" | "error";

  message: string;
} | null;

// Turns a failed friend-request call into something a person can
// act on. The server's own message wins when there is one (it knows
// the real reason — e.g. a request that already exists); otherwise
// the HTTP status / network state says what kind of failure it was.
// Nothing here guesses at a cause the response doesn't actually show.
const getFriendRequestErrorMessage = (
  error: any
): string => {
  const data = error?.response?.data;

  if (
    typeof data?.message === "string" &&
    data.message.trim()
  ) {
    return data.message.trim();
  }

  // Plain-text bodies only — a long or HTML body (a gateway error
  // page, say) is not something to show a person.
  if (
    typeof data === "string" &&
    data.trim() &&
    data.length <= 160 &&
    !data.trim().startsWith("<")
  ) {
    return data.trim();
  }

  if (!error?.response) {
    return error?.code ===
      "ECONNABORTED"
      ? "The request timed out. Please try again."
      : "Couldn't reach the server. Check your internet connection and try again.";
  }

  const status =
    error.response.status;

  if (status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (status === 403) {
    return "You don't have permission to send this request.";
  }

  if (status >= 500) {
    return "Something went wrong on our side. Please try again in a moment.";
  }

  return "Couldn't send the friend request. Please try again.";
};

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

  // True while a friend request is in flight. The ref is what
  // actually blocks a second tap: state updates are async, so two
  // quick taps can both read sending === false before the first
  // re-render lands.
  const [
    sending,
    setSending,
  ] = useState(false);

  const sendingRef = useRef(false);

  const [
    feedback,
    setFeedback,
  ] = useState<RequestFeedback>(
    null
  );

  const feedbackTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const clearFeedbackTimer = () => {
    if (feedbackTimer.current) {
      clearTimeout(
        feedbackTimer.current
      );

      feedbackTimer.current = null;
    }
  };

  const showFeedback = (
    type: "success" | "error",
    message: string
  ) => {
    clearFeedbackTimer();

    setFeedback({
      type,
      message,
    });

    // Errors stay up longer — they're the ones that need reading.
    feedbackTimer.current =
      setTimeout(
        () => setFeedback(null),
        type === "success"
          ? 3500
          : 6000
      );
  };

  const dismissFeedback = () => {
    clearFeedbackTimer();

    setFeedback(null);
  };

  useEffect(
    () => clearFeedbackTimer,
    []
  );

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

        console.log("MEETUP DISCOVERY DATA:", data);

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

    console.log('candidates', candidates);

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
      if (
        !current ||
        sendingRef.current
      ) {
        return;
      }

      // Captured up front: everything below must refer to the
      // person the request was actually sent to, even if the deck
      // moves while the call is in flight.
      const target = current;

      const name =
        target.fullName ||
        "this member";

      sendingRef.current = true;

      setSending(true);

      dismissFeedback();

      try {
        const response =
          await requestFriendship(
            {
              FriendRequesterID:
                userId,

              FriendApproverID:
                target.id,
            },
            token
          );

        // This backend answers { status, message, object }, and a
        // 200 with status: false is still a failure — it used to be
        // treated as success here, moving on as if it had worked.
        if (response?.status === false) {
          showFeedback(
            "error",
            response?.message ||
              "The friend request couldn't be sent."
          );

          return;
        }

        setCandidates(prev =>
          prev.map(item =>
            item.id ===
            target.id
              ? {
                  ...item,

                  friendshipRequest:
                    "Pending",
                }
              : item
          )
        );

        showFeedback(
          "success",
          `Friend request sent to ${name}.`
        );

        skip();
      } catch (error: any) {
        console.log(
          "SEND REQUEST ERROR:",
          error?.response?.status,

          error?.response?.data ??
            error?.message
        );

        showFeedback(
          "error",
          getFriendRequestErrorMessage(
            error
          )
        );
      } finally {
        sendingRef.current = false;

        setSending(false);
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

    sending,

    feedback,

    dismissFeedback,
  };
}