export interface AudioMedia {
  id: string;

  name: string;

  description: string;

  mediaType: number;

  category: string;

  dateAdded: string;

  imagePath: string;

  filePath: string;

  public: boolean;

  viewCount: number;

  downloadCount: number;

  sortOrder?: number;

  price?: number;

  fileBlobName?: string;

  imageBlobName?: string;

  isFree: boolean;

  tenantID: string;

  isPushed: boolean;
}



export interface VideoMedia {
  videoId: string;

  title: string;

  description?: string;

  highThumbnailUrl: string;

  mediumThumbnailUrl?: string;

  thumbnailUrl?: string;

  publishedAt: string;

  likeCount?: number;

  viewCount?: number;

  typeMedia?: "video";
}

export type MediaItem =
  | AudioMedia
  | VideoMedia;