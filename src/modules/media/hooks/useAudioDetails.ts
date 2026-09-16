import {
  useState,
} from "react";

export default function useAudioDetails(
  id: string
) {
  const [
    loading,
  ] =
    useState(false);

  const [
    audio,
  ] =
    useState({
      id,

      name:
        "Sunday Sermon",

      imagePath:
        "https://picsum.photos/500",

      description:
        "Sample audio description",

      isFree: true,

      viewCount: 45,

      dateAdded:
        "2026-06-01",

      typeMedia:
        "audio" as const,
    });

  return {
    loading,
    audio,
  };
}