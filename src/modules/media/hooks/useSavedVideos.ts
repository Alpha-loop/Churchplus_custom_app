import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY =
  "saved-videos";

// Same reasoning as useSavedDevotionals.ts — there's no backend
// concept of "saved" videos anywhere in this codebase (YouTube
// videos are fetched live from getYouTubeVideos(), not stored
// per-user), so this persists the saved list locally on-device
// via AsyncStorage rather than fake a button that does nothing.
// Real persistence, just device-local, not synced anywhere.
export default function useSavedVideos() {
  const [
    savedIds,
    setSavedIds,
  ] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(
      STORAGE_KEY
    )
      .then(raw => {
        if (raw) {
          setSavedIds(
            JSON.parse(raw)
          );
        }
      })
      .catch(() => {});
  }, []);

  const isSaved = (
    videoId: string
  ) =>
    savedIds.includes(videoId);

  const toggleSaved = async (
    videoId: string
  ) => {
    const next = isSaved(
      videoId
    )
      ? savedIds.filter(
          id =>
            id !== videoId
        )
      : [...savedIds, videoId];

    setSavedIds(next);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next)
      );
    } catch (error) {
      console.log(
        "SAVE VIDEO ERROR:",
        error
      );
    }
  };

  return {
    isSaved,
    toggleSaved,
  };
}