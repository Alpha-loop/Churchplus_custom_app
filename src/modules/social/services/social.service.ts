import { api } from "@/services/apiClient";

export const getMeetupUsers = async (
  tenantId: string,
  userId: string,
  token: string | null
) => {
  const response = await api.get(
    "/portal/Socials/GetOrganisationSpecificConnectionGraph",
    {
      params: {
        tenantId,
        userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(token)

  return (
    response.data || []
  )
    .filter(
      (item: any) =>
        item.person
    )
    .map(
      (item: any) => ({
        id: item.userId,

        firstName:
          item.person.firstName,

        lastName:
          item.person.lastName,

        fullName: `${item.person.firstName} ${item.person.lastName}`,

        photo:
          item.person.photo,

        address:
          item.person.address,

        friendshipRequest:
          item.friendshipRequest,
      })
    );
};

export const requestFriendship =
  async (
    payload: {
      FriendRequesterID: string;
      FriendApproverID: string;
    },
    token: string | null
  ) => {
    const response =
      await api.post(
        "/portal/Socials/RequestFriendShip",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const getSocialFeeds = async (
  userId: string,
  token: string | null
) => {
  const response = await api.get(
    `/portal/Socials/GetFeeds?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const likePost = async (
  payload: {
    mobileUserID: string;
    postId: string;
  },
  token: string | null
) => {
  const response = await api.post(
    "/portal/Socials/LikePost",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deletePost = async (
  payload: {
    postId: string;
    posterUserId: string;
  },
  token: string | null
) => {
  const response = await api.delete(
    "/portal/Socials/DeletePost",
    {
      data: payload,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const createPost = async (
  payload: any,
  token: string
) => {
  const res = await api.post(
    "/portal/Socials/CreatePost",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getPendingRequests = async (
  userId: string,
  token: string
) => {
  const response = await api.get(
    "/portal/Socials/GetAllPendingFriendRequest",
    {
      params: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(
    "PENDING REQUESTS:",
    response.data
  );

  return response.data;
};

/**
 * Approve Friend Request
 */
export const approveRequest = async (
  payload: {
    FriendRequesterID: string;
    FriendApproverID: string;
  },
  token: string
) => {
  const response =
    await api.post(
      "/portal/Socials/ApproveFriendShip",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

/**
 * Decline Friend Request
 */
export const declineRequest = async (
  payload: {
    FriendRequesterID: string;
    FriendApproverID: string;
  },
  token: string
) => {
  const response =
    await api.post(
      "/portal/Socials/DeclineFriendShipRequest",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return response.data;
};

export const getAllMessages = async (
  userId: string,
  token: string | null
) => {
  const res = await api.get(
    "/portal/Socials/GetAllChatMessages",
    {
      params: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getChatMessages = async (
  userId: string,
  user2Id: string,
  token: string | null
) => {
  const res = await api.get(
    "/portal/Socials/GetAllChatMessagesForAConnection",
    {
      params: {
        userId,
        user2Id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const saveMessage = async (
  payload: any,
  token: string | null
) => {
  const res = await api.post(
    "/portal/Socials/SaveChatMessage",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getUserConnections = async (userId: string, token: string) => {
  const res = await api.get(
    `/portal/Socials/GetAllFriends?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getUserProfile = async (id: string, token: string) => {
  const res = await api.get(
    `/portal/Profile/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(
    "PROFILE RESPONSE:",
    JSON.stringify(
      res,
      null,
      2
    )
  );

  return res.data;
};

export const getUserPost = async (userId: string, token: string) => {
  const res = await api.get(
    `/portal/Socials/GetUserFeeds?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};