export interface FeedComment {
  commentId?: string;

  commenterName?: string;

  commentMessage: string;

  commentDate?: string;

  photo?: string;
}

export interface FeedDetail {
  postId: string;

  title: string;

  content: string;

  mediaUrl?: string;

  postCategoryName?: string;

  createdDate?: string;

  isLiked?: boolean;

  likeCount?: number;

  shareCount?: number;

  comments?: FeedComment[];
}