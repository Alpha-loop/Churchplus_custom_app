export interface Feed {
  postId: string;

  title: string;

  content: string;

  mediaUrl?: string;

  type?: "Video" | "Picture";

  likeCount: number;

  comments: any[];

  isLiked: boolean;

  postCategoryName: string;

  _OrderDate: string;
}

export interface VideoItem {
  videoId: string;
  title: string;
  thumbnailUrl: string;
  publishedAt?: string;
  viewCount?: number | null;
  likeCount?: number | null;
}

export interface Celebrant {
  photo?: string;

  celebration: string;
}

export interface QuickAction {
  label: string;

  icon: string;
}

export interface ChurchProfile {
  logoUrl?: string;

  churchName?: string;

  // pastors?: Pastor[];

  // churchBranches?: ChurchBranch[];

  // customAbouts?: CustomAbout[];
}