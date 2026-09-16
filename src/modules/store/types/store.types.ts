export interface StoreCategory {
  id: string;

  name: string;

  type:
    | "video"
    | "audio"
    | "book";
}