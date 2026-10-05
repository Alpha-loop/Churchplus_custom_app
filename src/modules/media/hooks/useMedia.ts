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

  

  const loadVideos =
    async () => {

      if (!fullProfile?.churchSocialMedia) {
        console.log("No ministry profile yet.");
        return;
      }

      // Was matching item.name against "channel id" — same bug
      // as useHome.ts's loadVideos: the real entry's name is
      // "YouTube", not "channel id", so this never matched and
      // always fell through to "not found", regardless of what
      // was actually configured.
      const social = fullProfile.churchSocialMedia.find(
        (item: any) =>
          item.name?.toLowerCase().includes("youtube")
      );

      if (!social) {
        console.log("YouTube channel not configured.");
        setChurchMedia([]);
        return;
      }

      // The channel ID itself is stored under "url" — confusingly
      // named, but confirmed from the real response shape.
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

  // Was useEffect(() => { loadVideos(); }, []) — an empty
  // dependency array runs this exactly once, on mount, and
  // captures whatever fullProfile was AT THAT INSTANT. fullProfile
  // is only populated later, once useHome.ts's loadData() finishes
  // its ministry-profile fetch elsewhere — so if the Media tab is
  // opened before that resolves, this ran once against an empty
  // fullProfile, logged "No ministry profile yet," and never ran
  // again even after fullProfile actually loaded (the empty array
  // means it never re-fires, no matter what later changes).
  // useHome.ts's own identical-looking effect already uses
  // [fullProfile] correctly — this one just didn't match it.
  useEffect(() => {
    loadVideos();
  }, [fullProfile]);

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