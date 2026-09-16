import { useEffect, useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY =
  "saved-devotionals";

// There's no backend concept of "saved" devotionals anywhere in
// this codebase — so rather than fake a "Save Entry" button that
// does nothing, this persists the saved list locally on-device via
// AsyncStorage. Real persistence, just device-local, not synced
// anywhere — worth knowing if a real synced "saved items" feature
// is wanted later.
export default function useSavedDevotionals() {
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
    id: string
  ) => savedIds.includes(id);

  const toggleSaved = async (
    id: string
  ) => {
    const next = isSaved(id)
      ? savedIds.filter(
          savedId =>
            savedId !== id
        )
      : [...savedIds, id];

    setSavedIds(next);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next)
      );
    } catch (error) {
      console.log(
        "SAVE DEVOTIONAL ERROR:",
        error
      );
    }
  };

  return {
    isSaved,
    toggleSaved,
  };
}