import { Alert } from "react-native";

import { useAuthStore } from "@/store/authStore";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import {
  flagPost,
  blockUser,
} from "../services/moderation.service";

import {
  useBlockedIds,
  useBlockedUsersStore,
} from "../store/blockedUsersStore";

import { getPostAuthorId } from "../utils/postAuthor";

const getAuthorName = (
  item: any
): string | undefined => {
  const person =
    item?.posterDetails?.person;

  const name = [
    person?.firstName,
    person?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return name || undefined;
};

// These endpoints reply { status, message, object } like the rest of
// this backend — a 200 with status: false is still a failure.
const wasSuccessful = (data: any) =>
  data?.status !== false;

const logFailure = (
  label: string,
  error: any
) =>
  console.log(
    label,
    error?.response?.status,

    error?.response?.data ??
      error?.message
  );

export default function useModeration() {
  const userId = useAuthStore(
    state => state.user?.userId
  );

  const token = useAuthStore(
    state => state.accessToken
  );

  const { requireAuth } =
    useRequireAuth();

  const blockedIds =
    useBlockedIds(userId);

  const rememberBlocked =
    useBlockedUsersStore(
      state => state.block
    );

  // Only user-generated posts by someone else can be reported or
  // blocked. The church's own announcements (_source "admin") have
  // no user behind them and aren't in the Socials post set that
  // FlagPost operates on.
  const canModeratePost = (
    item: any
  ) =>
    item?._source === "social" &&
    !!userId &&
    getPostAuthorId(item) !==
      userId;

  const reportPost = (item: any) =>
    requireAuth(
      () =>
        Alert.alert(
          "Report this post?",
          "Tell us if this post is offensive, abusive, or doesn't belong here. Our team will review it.",
          [
            {
              text: "Cancel",

              style: "cancel",
            },

            {
              text: "Report",

              style: "destructive",

              onPress: async () => {
                try {
                  const response =
                    await flagPost(
                      {
                        postId:
                          item.postId,

                        mobileUserID:
                          userId!,
                      },
                      token
                    );

                  if (
                    !wasSuccessful(
                      response
                    )
                  ) {
                    throw new Error(
                      response?.message
                    );
                  }

                  Alert.alert(
                    "Report sent",
                    "Thank you. We'll review this post."
                  );
                } catch (error) {
                  logFailure(
                    "POST REPORT ERROR:",
                    error
                  );

                  Alert.alert(
                    "Couldn't send report",
                    "Please check your connection and try again."
                  );
                }
              },
            },
          ],
          { cancelable: true }
        ),
      {
        message:
          "Sign in to report content.",
      }
    );

  const blockPerson = (
    target: {
      id?: string;
      name?: string;
    },
    onBlocked?: () => void
  ) =>
    requireAuth(
      () => {
        if (!target.id) {
          return;
        }

        const who =
          target.name ||
          "this person";

        Alert.alert(
          `Block ${who}?`,
          "You won't see their posts or messages anymore.",
          [
            {
              text: "Cancel",

              style: "cancel",
            },

            {
              text: "Block",

              style: "destructive",

              onPress: async () => {
                try {
                  // I'm the one deciding, so I'm the "approver" and
                  // the other person is the "requester" — same
                  // direction as DeclineFriendShipRequest.
                  const response =
                    await blockUser(
                      {
                        FriendRequesterID:
                          target.id!,

                        FriendApproverID:
                          userId!,
                      },
                      token
                    );

                  if (
                    !wasSuccessful(
                      response
                    )
                  ) {
                    throw new Error(
                      response?.message
                    );
                  }

                  // Only remembered locally once the server call
                  // actually succeeded — never claim a block that
                  // didn't happen.
                  rememberBlocked(
                    userId!,
                    target.id!
                  );

                  Alert.alert(
                    `${who} blocked`,
                    "Their posts and messages are now hidden."
                  );

                  onBlocked?.();
                } catch (error) {
                  logFailure(
                    "BLOCK USER ERROR:",
                    error
                  );

                  Alert.alert(
                    "Couldn't block",
                    "Please check your connection and try again."
                  );
                }
              },
            },
          ],
          { cancelable: true }
        );
      },
      {
        message:
          "Sign in to block someone.",
      }
    );

  const showPostMenu = (
    item: any,
    onBlocked?: () => void
  ) => {
    const authorId =
      getPostAuthorId(item);

    const authorName =
      getAuthorName(item);

    Alert.alert(
      "Post options",
      undefined,
      [
        {
          text: "Report post",

          onPress: () =>
            reportPost(item),
        },

        ...(authorId
          ? [
              {
                text: authorName
                  ? `Block ${authorName}`
                  : "Block this user",

                style:
                  "destructive" as const,

                onPress: () =>
                  blockPerson(
                    {
                      id: authorId,

                      name: authorName,
                    },
                    onBlocked
                  ),
              },
            ]
          : []),

        {
          text: "Cancel",

          style: "cancel" as const,
        },
      ],
      { cancelable: true }
    );
  };

  const showUserMenu = (
    target: {
      id?: string;
      name?: string;
    },
    onBlocked?: () => void
  ) =>
    Alert.alert(
      target.name || "Options",
      undefined,
      [
        {
          text: target.name
            ? `Block ${target.name}`
            : "Block this user",

          style:
            "destructive" as const,

          onPress: () =>
            blockPerson(
              target,
              onBlocked
            ),
        },

        {
          text: "Cancel",

          style: "cancel" as const,
        },
      ],
      { cancelable: true }
    );

  return {
    blockedIds,

    canModeratePost,

    showPostMenu,

    showUserMenu,

    reportPost,

    blockPerson,
  };
}
