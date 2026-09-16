import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AudioMedia,
  MediaItem,
  VideoMedia,
} from "../types/media.types";

import {
  getYouTubeVideos,
} from "@/modules/home/services/home.service";
import { useChurchStore } from "@/store/churchStore";

export default function useMedia() {
  const fullProfile = useChurchStore(
      state => state.fullProfile
    );
  

  const [
    searchText,
    setSearchText,
  ] = useState("");

  const [
    churchMedia,
    setChurchMedia,
  ] = useState<VideoMedia[]>([]);

  const [
    allAudios,
    setAllAudios,
  ] = useState<AudioMedia[]>(
    []
  );

  

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos =
    async () => {

      if (!fullProfile?.churchSocialMedia) {
        console.log("No ministry profile yet.");
        return;
      }

      const social = fullProfile.churchSocialMedia.find(
        (item: any) =>
          item.name?.toLowerCase().includes("channel id")
      );

      if (!social) {
        console.log("Channel ID not found.");
        setChurchMedia([]);
        return;
      }

      const channelId =
        social.url


      try {
        const response =
          await getYouTubeVideos(
            channelId
          );

        console.log(
          "MEDIA VIDEOS:",
          response
        );

        const formattedVideos =
          (response || []).map(
            (video: any) => ({
              ...video,

              highThumbnailUrl:
                video.thumbnailUrl,

              typeMedia:
                "video",
            })
          );

        setChurchMedia(
          formattedVideos
        );
      } catch (error) {
        console.log(
          "MEDIA ERROR:",
          error
        );
      }
    };

  /**
   * Audio endpoint not ready yet
   */
  useEffect(() => {
    setAllAudios([]);
  }, []);

  /**
   * Search filter
   */
  const filteredMediaVideos =
    useMemo(() => {
      return churchMedia.filter(
        item =>
          searchText === "" ||
          item.title
            ?.toLowerCase()
            .includes(
              searchText.toLowerCase()
            )
      );
    }, [
      churchMedia,
      searchText,
    ]);

  return {
    searchText,

    setSearchText,

    churchMedia,

    allAudios,

    mergedMedia:
      filteredMediaVideos,

    filteredMediaVideos,
  };
}