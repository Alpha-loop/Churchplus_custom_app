import {
  useState,
} from "react";

import {
  StoreCategory,
} from "../types/store.types";

export default function useStore() {
  const [
    searchText,
    setSearchText,
  ] = useState("");

  const heroBanners = [
    {
      id: "1",
    },

    {
      id: "2",
    },

    {
      id: "3",
    },
  ];

  const categories: StoreCategory[] = [
    {
      id: "1",
      name: "Video",
      type: "video",
    },
    {
      id: "2",
      name: "Audio",
      type: "audio",
    },
    {
      id: "3",
      name: "Book",
      type: "book",
    },
  ];

  return {
    searchText,

    setSearchText,

    heroBanners,

    categories,
  };
}