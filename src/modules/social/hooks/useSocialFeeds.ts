import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getSocialFeeds,
  likePost,
  deletePost,
} from "../services/social.service";

import {
  useAuthStore,
} from "@/store/authStore";

export default function useSocialFeeds() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    feeds,
    setFeeds,
  ] = useState<any[]>([]);

  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state =>
        state.accessToken
    );

  const loadFeeds =
    async () => {
      try {
        setLoading(true);

        const data =
          await getSocialFeeds(
            user?.userId,
            token
          );

        setFeeds(
          Array.isArray(data)
            ? data.reverse()
            : []
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
    if (
      user?.userId
    ) {
      loadFeeds();
    }
  }, []);

  const onRefresh =
    async () => {
      setRefreshing(true);

      await loadFeeds();

      setRefreshing(false);
    };

  const handleLike =
    async (
      item: any,
      index: number
    ) => {
      const payload = {
        mobileUserID:
          user?.userId,

        postId:
          item.postId,
      };

      const copy =
        [...feeds];

      if (
        copy[index]
          .isLiked
      ) {
        copy[index].isLiked =
          false;

        copy[index]
          .likeCount -= 1;
      } else {
        copy[index].isLiked =
          true;

        copy[index]
          .likeCount += 1;
      }

      setFeeds(copy);

      try {
        await likePost(
          payload,
          token
        );
      } catch (
        error
      ) {
        console.log(error);
      }
    };

  const handleDelete =
    async (
      postId: string,
      posterUserId: string
    ) => {
      setFeeds(prev =>
        prev.filter(
          item =>
            item.postId !==
            postId
        )
      );

      try {
        await deletePost(
          {
            postId,
            posterUserId,
          },
          token
        );
      } catch (
        error
      ) {
        console.log(error);

        loadFeeds();
      }
    };

  const filteredFeeds =
    useMemo(() => {
      return feeds.filter(
        item =>
          searchText ===
            "" ||
          item.content
            ?.toLowerCase()
            .includes(
              searchText.toLowerCase()
            )
      );
    }, [
      feeds,
      searchText,
    ]);

  console.log('This is user feeds: ', feeds)

  return {
    loading,

    refreshing,

    searchText,

    setSearchText,

    feeds:
      filteredFeeds,

    handleLike,

    handleDelete,

    onRefresh,

    currentUserId:
      user?.userId,
  };
}