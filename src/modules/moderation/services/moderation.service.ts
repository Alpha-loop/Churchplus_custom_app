import { api } from "@/services/apiClient";

// Confirmed real endpoints (paths only — see the note below on
// what is and isn't confirmed):
//
//   /portal/Socials/FlagPost               — report a post
//   /portal/Socials/BlockFriendShipRequest — block a user
//
// NOT confirmed against the real schema: the HTTP method and the
// request body for either one. Both are inferred from the sibling
// endpoints in this same file, which are known to work:
//
//   - FlagPost sits next to LikePost ({ mobileUserID, postId }) and
//     DeletePost, so it's sent as POST { postId, mobileUserID }.
//   - BlockFriendShipRequest sits next to RequestFriendShip /
//     ApproveFriendShip / DeclineFriendShipRequest, which all take
//     { FriendRequesterID, FriendApproverID } via POST. Blocking
//     follows Decline's direction: the person being blocked is the
//     "requester", the person doing the blocking (me) is the
//     "approver".
//
// If either call fails, useModeration.ts logs the real HTTP status
// and response body — a 405 means the method is wrong, a 400 means
// the body is. Fixing it is a one-line change in this file; nothing
// else depends on these shapes.

export const flagPost = async (
  payload: {
    postId: string;
    mobileUserID: string;
  },
  token: string | null
) => {
  const response = await api.post(
    "/portal/Socials/FlagPost",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const blockUser = async (
  payload: {
    FriendRequesterID: string;
    FriendApproverID: string;
  },
  token: string | null
) => {
  const response = await api.post(
    "/portal/Socials/BlockFriendShipRequest",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
