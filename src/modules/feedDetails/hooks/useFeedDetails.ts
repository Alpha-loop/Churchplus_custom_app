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

    setComments(
      prev => [
        {
          commentId:
            newComment.commentId,

          commenterName: `${newComment.personBasicInfoDTO.firstName} ${newComment.personBasicInfoDTO.lastName}`,

          commentDate:
            newComment.commentDate,

          commentMessage:
            newComment.commentMessage,

          photo:
            newComment.personBasicInfoDTO.photo,
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
