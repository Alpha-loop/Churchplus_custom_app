import { useState } from "react";
import { Share } from "react-native";

import { useAuthStore } from "@/store/authStore";

import {
likePost,
commentOnPost,
sharePost,
} from "@/modules/home/services/home.service";

import {
FeedDetail,
} from "../types/feed-details.types";

export default function useFeedDetails(
feed: FeedDetail
) {
const user = useAuthStore(
state => state.user
);

const token = useAuthStore(
state => state.accessToken
);

console.log(feed, 'sbdajhbsbhjasd')

const [
commentMessage,
setCommentMessage,
] = useState("");

const [
loadingComment,
setLoadingComment,
] = useState(false);

const [
expandedComments,
setExpandedComments,
] = useState(false);

const [
  comments,
  setComments,
] = useState<any[]>(
  feed?.comments || []
);

const [
isLiked,
setIsLiked,
] = useState(
feed?.isLiked ?? false
);

const toggleLike =
async () => {
try {
const newLikeState =
!isLiked;


    setIsLiked(
      newLikeState
    );

    await likePost({
      tenantId:
        user?.tenantID ||
        user?.tenantId,

      postId:
        feed.postId,

      userId:
        user?.userId,

      isLike:
        newLikeState,
    });
  } catch (error) {
    console.log(
      "LIKE ERROR:",
      error
    );
  }
};


const handleShare =
async () => {
try {
await Share.share({
title: feed.title,


      message: `${feed.title}


${feed.content}`,
});

    await sharePost(
      user?.tenantID ||
        user?.tenantId,

      feed.postId,

      token
    );
  } catch (error) {
    console.log(
      "SHARE ERROR:",
      error
    );
  }
};


const createComment =
async () => {
try {
if (
!commentMessage.trim()
) {
return;
}


    setLoadingComment(
      true
    );

    if (!token) return;

    console.log('post',feed)

    const payload = {
        tenantId:
          user?.tenantID ||
          user?.tenantId,

        postId:
          feed.postId,

        userId:
          user?.userId,

        commentMessage,
      }

    console.log(payload)

    const res = await commentOnPost(
      payload,
      token
    );

    console.log(res)

    const newComment =
      res?.data?.object;

    // Was newComment.personBasicInfoDTO.firstName directly — this
    // backend can return a comment record with personBasicInfoDTO
    // null (confirmed directly: happened for an unauthenticated
    // request that still got accepted), which crashed the whole
    // screen instead of just showing a slightly generic name for
    // one comment. Falls back to the current user's own known
    // name/photo — this is always about the comment *I* just
    // posted, so that's a correct fallback, not a guess.
    const personInfo =
      newComment?.personBasicInfoDTO;

    const fallbackName = [
      user?.firstName,
      user?.lastName,
    ]
      .filter(Boolean)
      .join(" ") || "You";

    setComments(
      prev => [
        {
          commentId:
            newComment?.commentId,

          commenterName:
            personInfo
              ? `${personInfo.firstName} ${personInfo.lastName}`
              : fallbackName,

          commentDate:
            newComment?.commentDate,

          commentMessage:
            newComment?.commentMessage,

          photo:
            personInfo?.photo ??
            user?.photo,
        },

        ...prev,
      ]
    );

    setCommentMessage(
      ""
    );
  } catch (error) {
    console.log(
      "COMMENT ERROR:",
      error
    );
  } finally {
    setLoadingComment(
      false
    );
  }
};


const toggleComments =
() => {
setExpandedComments(
prev => !prev
);
};

const relatedFeeds = <any[]>([]);

return {
feed,

isLiked,

toggleLike,

handleShare,

commentMessage,
setCommentMessage,

comments,

loadingComment,

createComment,

expandedComments,

toggleComments,

relatedFeeds,


};
}