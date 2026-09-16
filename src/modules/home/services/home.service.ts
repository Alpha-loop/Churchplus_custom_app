import { api } from "../../../services/apiClient";

/**
 * Today's Devotional
 */
export const getTodayDevotional =
  async (
    tenantId: string
  ) => {
    const response =
      await api.post(
        `/portal/${tenantId}/devotionals/today`,
        {
          tenantId,

          userId: null,

          isPending: true,

          isDevotional: true,

          devotionalDate:
            null,

          tags: null,

          allPost: true,
        }
      );

    return response.data;
  };

/**
 * Devotional Library
 */
export const getDevotionals =
  async (
    tenantId: string
  ) => {
    const response =
      await api.post(
        `/portal/${tenantId}/devotionals`,
        {
          tenantId,

          userId: null,

          isPending: true,

          isDevotional: true,

          devotionalDate:
            null,

          tags: null,

          allPost: true,
        }
      );

    return response.data;
  };

/**
 * Church Feeds
 */
export const getFeeds =
  async (
    tenantId: string
  ) => {
    const response =
      await api.post(
        `/portal/${tenantId}/feeds`,
        {
          tenantId,

          userId: null,

          isPending: true,

          isDevotional: true,

          devotionalDate:
            null,

          tags: null,

          allPost: true,
        }
      );

    console.log(
      "FEEDS API RESPONSE:",
      response.data
    );

    return response.data;
  };

/**
 * YouTube Videos
 */
export const getYouTubeVideos =
  async (
    channelId: string
  ) => {
    const response =
      await api.get(
        "/portal/Media/GetYouTubeVideos",
        {
          params: {
            channelId,
          },
        }
      );

    return response.data;
  };

/**
 * Celebrants
 */
export const getCelebrants =
  async (
    tenantId: string
  ) => {
    const response =
      await api.get(
        "/portal/profile/celebrants",
        {
          params: {
            tenantId,
          },
        }
      );

    return response.data;
  };

// ministry.services.ts

export const getMinistryProfile =
  async (
    tenantId: string,
  ) => {
    const response =
      await api.get(
        `/portal/Ministry/${tenantId}/profile`
      );
    console.log(response, "this is ministry profile")
    return response.data;
  };

export const likePost = async ({
  tenantId,
  
  postId,
  userId,
  isLike,
}: {
  tenantId: string;
  postId: string;
  userId: string;
  isLike: boolean;
}) => {
  const response = api.post(`/portal/${tenantId}/feeds/like`, {
    userId,
    postId,
    isLike,
  });

  return response
};

export const commentOnPost = async (
  {
    tenantId,
    postId,
    userId,
    commentMessage,
  }: {
    tenantId: string;
    postId: string;
    userId: string;
    commentMessage: string;
  },
  token: string
) => {
  return api.post(
    `/portal/${tenantId}/feeds/comment`,
    {
      postId,
      commentMessage,
      userId,
      tenantId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ FIX
      },
    }
  );
};

export const sharePost = async (
  tenantId: string,
  postId: string,
  token: string | null
) => {
  const res = await api.get(
    `/portal/${tenantId}/feeds/share`,
    {
      params: { postId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};