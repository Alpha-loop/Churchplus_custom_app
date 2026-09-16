import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  getFeeds,
  getTodayDevotional,
  getYouTubeVideos,
  getCelebrants,
  getMinistryProfile,
} from "../services/home.service";

import { useChurchStore } from "@/store/churchStore";

import {
  useAuthStore,
} from "@/store/authStore";
import { Feed } from "../types/home.types";

export default function useHome() {
  const [
    feeds,
    setFeeds,
  ] = useState<Feed[]>([]);

  const [
    celebrants,
    setCelebrants,
  ] = useState<any[]>([]);

  const [videos, setVideos] =
    useState<any[]>([]);

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const setFullProfile = useChurchStore(
    state => state.setFullProfile
  );

  

  const [
    devotional,
    setDevotional,
  ] = useState<
    {
      title: string;
      mediaUrl: string;
    } | undefined
  >();

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const user =
    useAuthStore(
      state => state.user
    );

  const tenantId =
    useChurchStore(
      state => state.tenantId
    );

  const forms = useMemo(() => {
    const list = fullProfile?.forms ?? [];

    return {
      prayer: list.find((f: any) =>
        f.name?.toLowerCase().includes("prayer")
      ),

      testimony: list.find((f: any) =>
        f.name?.toLowerCase().includes("testimony")
      ),

      commitToChrist: list.find((f: any) =>
        f.name?.toLowerCase().includes("new convert")
      ),

      iamNew: list.find((f: any)=>
        f.name?.toLowerCase().includes("first timer")
      ),

      appointment: list.find((f: any) =>
        f.name?.toLowerCase().includes("general counseling")
      ),
    };
  }, [fullProfile]);

  console.log('forms', forms)

  


  const loadVideos = useCallback(async () => {
    console.log('this is full profile: ', fullProfile?.churchSocialMedia)
    if (!fullProfile?.churchSocialMedia) {
      console.log("No ministry profile yet.");
      return;
    }

    const social = fullProfile.churchSocialMedia.find(
      (item: any) =>
        item.name?.toLowerCase().includes("channel id")
    );

    console.log(social)

    if (!social) {
      console.log("Channel ID not found.");
      setVideos([]);
      return;
    }

    // Replace "value" with the correct property once we inspect your API.
    const channelId =
      social.url

    console.log("CHANNEL ID:", channelId);

    if (!channelId) {
      setVideos([]);
      return;
    }

    try {
      const response =
        await getYouTubeVideos(channelId);

      setVideos(response ?? []);
    } catch (error) {
      console.error(
        "Failed to load YouTube videos",
        error
      );
    }
  }, [fullProfile]);

  const loadData =
    async () => {
      if(!tenantId) return;
      try {
        setLoading(true);

        // channelId = fullProfile.churchSocialMedia.find((i: any) => i.name.toLowerCase().includes("channel id"));

        console.log(
          "TENANT:",
          tenantId
        );


        // Was Promise.all — which fails ATOMICALLY: if even one
        // of these four calls rejects (e.g. an endpoint that
        // requires real auth a guest doesn't have), the whole
        // batch rejects together and jumps to catch, meaning
        // setFeeds()/setDevotional()/etc. never run at all — even
        // for the calls that succeeded on their own (confirmed:
        // getFeeds() was resolving fine by itself, but its result
        // never reached state because a sibling call in the same
        // Promise.all was failing). Promise.allSettled lets each
        // call succeed or fail independently instead.
        const [
          devotionalResult,
          feedsResult,
          celebrantsResult,
          ministryProfileResult,
        ] = await Promise.allSettled([
            getTodayDevotional(
              tenantId
            ),
            getFeeds(
              tenantId
            ),
            getCelebrants(
              tenantId
            ),
            getMinistryProfile(
              tenantId
            ),
          ]);

        if (
          devotionalResult.status ===
          "rejected"
        ) {
          console.log(
            "DEVOTIONAL LOAD FAILED:",
            devotionalResult.reason
          );
        }

        if (
          feedsResult.status ===
          "rejected"
        ) {
          console.log(
            "FEEDS LOAD FAILED:",
            feedsResult.reason
          );
        }

        if (
          celebrantsResult.status ===
          "rejected"
        ) {
          console.log(
            "CELEBRANTS LOAD FAILED:",
            celebrantsResult.reason
          );
        }

        if (
          ministryProfileResult.status ===
          "rejected"
        ) {
          console.log(
            "MINISTRY PROFILE LOAD FAILED:",
            ministryProfileResult.reason
          );
        }

        const devotionalRes =
          devotionalResult.status ===
          "fulfilled"
            ? devotionalResult.value
            : null;

        const feedsRes =
          feedsResult.status ===
          "fulfilled"
            ? feedsResult.value
            : null;

        const celebrantsRes =
          celebrantsResult.status ===
          "fulfilled"
            ? celebrantsResult.value
            : null;

        const ministryProfileRes =
          ministryProfileResult.status ===
          "fulfilled"
            ? ministryProfileResult.value
            : null;

        

        

        // console.log(
        //   "FULL PROFILE",
        //   JSON.stringify(fullProfile, null, 2)
        // );

        setFullProfile(
          ministryProfileRes?.data ??
          ministryProfileRes?.object ??
          ministryProfileRes ??
          null
        );

        

        

        /**
         * Inspect categories
         */
        const categories = [
          ...new Set(
            (feedsRes?.object || []).map(
              (item: any) =>
                item.postCategoryName
            )
          ),
        ];

        /**
         * Temporary separation
         */
        const devotionalPosts =
          (feedsRes?.object || []).filter(
            (item: any) =>
              item.postCategoryName
                ?.toLowerCase()
                .includes(
                  "devotional"
                )
          );

        const churchFeeds =
          (feedsRes?.object || []).filter(
            (item: any) =>
              !item.postCategoryName
                ?.toLowerCase()
                .includes(
                  "devotional"
                )
          );

        console.log(
          "DEVOTIONAL POSTS:",
          devotionalPosts.length
        );

        console.log(
          "CHURCH FEEDS:",
          churchFeeds.length
        );

        /**
         * Set state
         */
        setDevotional(
          devotionalPosts[0] ||
            devotionalRes?.object?.[0]
        );

        setFeeds(
          churchFeeds
        );

        console.log(
          "CELEBRANTS:",
          celebrantsRes
        );

        setCelebrants(
          celebrantsRes?.object ??
          celebrantsRes ??
          []
        );

        console.log(
          "CELEBRANTS RESPONSE:",
          JSON.stringify(
            celebrantsRes,
            null,
            2
          )
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      } finally {
        setLoading(
          false
        );
      }
    };

  useEffect(() => {
    if (!tenantId) {
      console.log(
        "NO TENANT ID"
      );

      return;
    }

    loadData();
  }, [tenantId]);

  useEffect(() => {
    loadVideos();
  }, [fullProfile]);

  console.log(
    "HOME USER:",
    user
  );

  console.log(
    "HOME TENANT:",
    tenantId
  );

  const onRefresh =
    async () => {
      setRefreshing(
        true
      );

      await loadData();

      setRefreshing(
        false
      );
    };

  return {
    feeds,

    setFeeds,

    devotional,

    videos,

    celebrants,

    profile: user,

    fullProfile,

    loading,

    refreshing,

    forms,

    onRefresh,
  };
}