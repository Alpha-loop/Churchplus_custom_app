import { useState } from "react";

import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
  Share
} from "react-native";

import MediaRenderer from "./MediaRenderer";

import {
  Like,
  Unlike,
} from "../../../assets/img/like";

import { Comment } from "../../../assets/img/comment";

import { dateUtils } from "../../../utils/date/date.utils";
import { likePost, sharePost } from "../services/home.service";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

import { useAuthStore } from "@/store/authStore";

interface FeedItem {
  postId: string;

  title: string;

  content: string;

  mediaUrl?: string;

  type?: string;

  isLiked: boolean;

  likeCount: number;

  comments: any[];

  postCategoryName: string;

  _OrderDate: string;
}

interface FeedListProps {
  isLoadingFeeds: boolean;

  churchFeeds: FeedItem[];

  navigation: any;

  scrollUp?: () => void;

  userInfo?: any;

  setChurchFeeds: React.Dispatch<
    React.SetStateAction<FeedItem[]>
  >;
}

export default function FeedList({
  isLoadingFeeds,
  churchFeeds,
  navigation,
  scrollUp,
  userInfo,
  setChurchFeeds,
}: FeedListProps) {
  const { requireAuth } =
    useRequireAuth();

  const token = useAuthStore(
    state => state.accessToken
  );

  const viewFeedsDetails = (
    item: FeedItem
  ) => {
    navigation.navigate(
      "FeedsDetail",
      {
        feed: item,
      }
    );

    scrollUp?.();
  };

  const doLikeFeed = async (
    item: FeedItem,
    index: number
  ) => {
    const payload = {
      mobileUserID:
        userInfo.userId,

      postId: item.postId,
    };

    console.log(
      "LIKE PRESSED"
    );

    console.log(
      "USER INFO:",
      userInfo
    );

    console.log(
      "POST ID:",
      item.postId
    );

    const newLikeState =
  !item.isLiked;

const updatedFeeds =
  churchFeeds.map(
    feed => {
      if (
        feed.postId !==
        item.postId
      ) {
        return feed;
      }

      return {
        ...feed,

        isLiked:
          newLikeState,

        likeCount:
          newLikeState
            ? feed.likeCount + 1
            : Math.max(
                0,
                feed.likeCount - 1
              ),
      };
    }
  );

console.log(
  "UPDATED FEED:",
  updatedFeeds.find(
    f =>
      f.postId ===
      item.postId
  )
);

setChurchFeeds(
  updatedFeeds
);

    console.log(
      "CURRENT ITEM:",
      item
    );

    try {
  const response =
    await likePost({
      tenantId:
        userInfo.tenantID ||
        userInfo.tenantId,

      postId:
        item.postId,

      userId:
        userInfo.userId,

      isLike:
        !item.isLiked,
    });

  console.log(
    "LIKE RESPONSE:",
    response
  );
} catch (error: any) {
  console.log(
    "LIKE STATUS:",
    error?.response?.status
  );

  console.log(
    "LIKE DATA:",
    error?.response?.data
  );

  console.log(
    "LIKE ERROR:",
    error
  );
}
  };

  const doShare =
    async (
      item: FeedItem
    ) => {
      try {
        // Sharing via the OS share sheet itself doesn't need an
        // account — only tracking the share server-side does. So
        // this always lets the share happen; it only skips the
        // backend tracking call for a guest, rather than blocking
        // the whole action behind a login redirect.
        await Share.share({
          title: item.title,

          message: `
          ${item.title}

          ${item.content}
          `,
        });

        if (!userInfo) {
          return;
        }

        await sharePost(
          userInfo.tenantID ||
            userInfo.tenantId,

          item.postId,

          // Was userInfo.token — not a real field on the user
          // object at all (the access token lives separately in
          // authStore), so this was always sending
          // "Authorization: Bearer undefined".
          token
        );
      } catch (error) {
        console.log(
          "SHARE ERROR:",
          error
        );
      }
    };

  const likeFeed = (
    item: FeedItem,
    index: number
  ) =>
    requireAuth(
      () =>
        doLikeFeed(
          item,
          index
        ),
      {
        message:
          "Sign in to like this post.",
      }
    );

  const handleShare = doShare;

  if (isLoadingFeeds) {
    return (
      <View
        style={{
          alignItems:
            "center",
          marginTop: 40,
        }}
      >
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }

  if (
    !churchFeeds ||
    churchFeeds.length === 0
  ) {
    return (
      <View
        style={{
          height: 325,
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        <Image
          source={require("../../../assets/img/NoFeeds.png")}
        />
      </View>
    );
  }

  return (
    <>
      {churchFeeds.map(
        (
          item,
          index
        ) => (
          <View
            key={item.postId}
            style={{
              marginTop:
                index === 0
                  ? 0
                  : 20,

              backgroundColor:
                "#FFFFFF",

              borderRadius: 12,

              overflow:
                "hidden",
            }}
          >
            <View
              style={{
                padding: 16,

                flexDirection:
                  "row",

                justifyContent:
                  "space-between",
              }}
            >
              <Text>
                {
                  item.postCategoryName
                }
              </Text>

              <Text>
                {dateUtils.relativeDate(
                  item._OrderDate
                )}
              </Text>
            </View>

            {item.mediaUrl ? (
              <MediaRenderer
                mediaUrl={
                  item.mediaUrl
                }
                type={
                  item.type as
                    | "Video"
                    | "Picture"
                }
              />
            ) : null}

            <TouchableOpacity
              onPress={() =>
                viewFeedsDetails(
                  item
                )
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight:
                    "700",
                  margin: 16,
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  marginHorizontal: 16,
                }}
              >
                {item.content?.slice(
                  0,
                  250
                )}

                {item.content
                  ?.length >
                  250 && (
                  <Text
                    style={{
                      color:
                        "#1146B5",
                    }}
                  >
                    {/* {" "} */}
                    ...Read more
                  </Text>
                )}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                marginTop: 12,

                marginBottom: 20,

                paddingHorizontal: 16,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  likeFeed(
                    item,
                    index
                  )
                }
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",
                }}
              >
                {item.isLiked ? (
                  <Like />
                ) : (
                  <Unlike />
                )}

                <Text
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {
                    item.likeCount
                  }
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  marginLeft: 20,
                }}
              >
                <Comment />

                <Text
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {
                    item.comments
                      .length
                  }
                </Text>
              </View>
            </View>
          </View>
        )
      )}
    </>
  );
}