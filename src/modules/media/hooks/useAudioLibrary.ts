import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AudioMedia,
} from "../types/media.types";

import {
  getAudios,
} from "../services/media.service";
import { useAuthStore } from "@/store/authStore";

export default function useAudioLibrary() {
  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    allAudios,
    setAllAudios,
  ] = useState<AudioMedia[]>([]);

  const user =
    useAuthStore(
      state => state.user
    );

  // const tenantId =
  //   user?.tenantID ||
  //   user?.tenantId;

  const tenantId = '0c7df0f4-0cd7-4803-a65c-0f6a4fd19935'

  const [
    loading,
    setLoading,
  ] = useState(false);

  console.log(tenantId)

  const loadAudios =
    async () => {
      try {
        setLoading(true);

        const response =
          await getAudios(tenantId);

        console.log(
          "AUDIO RESPONSE:",
          response
        );

        setAllAudios(
          response?.object ?? []
        );
      } catch (
        error
      ) {
        console.log(
          "AUDIO ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadAudios();
  }, []);

  const categories =
    useMemo(() => {
      const unique =
        new Map();

      allAudios.forEach(
        audio => {
          if (
            audio.category
          ) {
            unique.set(
              audio.category,
              audio
            );
          }
        }
      );

      return Array.from(
        unique.values()
      );
    }, [allAudios]);

  const filteredAudios =
    useMemo(
      () =>
        allAudios.filter(
          item =>
            item.name
              ?.toLowerCase()
              .includes(
                searchText.toLowerCase()
              )
        ),
      [
        searchText,
        allAudios,
      ]
    );

  return {
    searchText,
    setSearchText,

    categories,

    filteredAudios,

    loading,

    allAudios,

    refreshAudios:
      loadAudios,
  };
}