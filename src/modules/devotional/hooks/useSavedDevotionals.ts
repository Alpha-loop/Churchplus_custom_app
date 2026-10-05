import { useEffect, useRef, useState } from "react";

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

  // Always the latest list, updated synchronously. toggleSaved used
  // to build the next list from `savedIds` as captured by the render
  // that created it, so two toggles before React re-rendered (a quick
  // double-tap) both started from the same stale list — the second
  // one overwrote the first, or saved a duplicate.
  const savedIdsRef = useRef<
    string[]
  >([]);

  const commit = (
    ids: string[]
  ) => {
    savedIdsRef.current = ids;

    setSavedIds(ids);
  };

  useEffect(() => {
    AsyncStorage.getItem(
      STORAGE_KEY
    )
      .then(raw => {
        if (raw) {
          // Earlier versions bookmarked by devotion.id, which
          // doesn't exist in the API response, so what's on disk
          // can contain `null` entries. They identify nothing —
          // drop them (and any duplicates) rather than carry them.
          const ids: unknown[] =
            JSON.parse(raw);

          commit(
            Array.from(
              new Set(
                ids.filter(
                  (id): id is string =>
                    typeof id ===
                      "string" &&
                    id !== ""
                )
              )
            )
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
    const current =
      savedIdsRef.current;

    const next =
      current.includes(id)
        ? current.filter(
            savedId =>
              savedId !== id
          )
        : [...current, id];

    commit(next);

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