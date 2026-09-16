import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Church,
  ChurchAbout,
  ChurchBranch,
  ChurchPastor,
} from "../types/onboarding.types";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useUserStore } from "@/store/user.store";
import { useChurchStore } from "@/store/churchStore";
import { useAuthStore } from "@/store/authStore";
import { useAppConfigStore } from "@/store/appConfig.store";


import {
  getMinistryProfile,
  getBrandingConfiguration,
} from "../services/onboarding.service";

// Where "the app, past onboarding" lives, per layout — one place
// to update instead of every screen that finishes onboarding
// needing to know Classic's or Modern's screen names itself.
// "unauthenticated" is where a brand-new user goes after picking
// a church for the first time (still needs to register/login);
// "authenticated" is where an already-logged-in user goes after
// switching churches.
const POST_CHURCH_ROUTES: Record<
  string,
  {
    authenticated: string;
    unauthenticated: string;
  }
> = {
  classic: {
    authenticated: "Main",
    unauthenticated: "Onboarding",
  },

  // "Main" and "Onboarding" now both branch on config.layout
  // internally (see MainRouter.tsx / OnboardingRouter.tsx), so
  // Modern and Classic converge on the exact same screen names —
  // Modern has no login/register screens of its own yet, so a
  // brand-new user goes through the same shared Auth flow Classic
  // uses; only the onboarding carousel and the destination shell
  // actually differ per layout.
  modern: {
    authenticated: "Main",
    unauthenticated: "Onboarding",
  },
};

export default function useChurchProfile(
  church: Church
) {
  const [loading, setLoading] =
    useState(false);

  const [profile, setProfile] = useState<Church | null>(null);

  const fullProfile = useChurchStore(state => state.fullProfile);

  console.log(church.churchID)

  
  const [
    churchAbout,
    setChurchAbout,
  ] = useState<ChurchAbout[]>([]);

  const [
    churchPastors,
    setChurchPastors,
  ] = useState<ChurchPastor[]>([]);

  const [
    churchBranches,
    setChurchBranches,
  ] = useState<ChurchBranch[]>([]);

  const [
    selectedTab,
    setSelectedTab,
  ] = useState("Pastors");

  const navigation = useNavigation<any>();

  const login = useUserStore(state => state.login);
  const setUserChurch = useUserStore(state => state.setChurch);

  const accessToken = useAuthStore(
    state => state.accessToken
  );

  // AppNavigator.tsx only registers "Main" and everything under
  // it (SocialTabs, Community, Messages, etc.) when
  // canAccessMain = isAuthenticated || isGuest — but this hook was
  // only checking accessToken, missing the isGuest case entirely.
  // A guest user (isGuest: true, no accessToken) would fall
  // through to the "unauthenticated" branch below and try to
  // navigate to "Onboarding" — a screen that isn't even
  // registered while canAccessMain is true, so the call silently
  // goes nowhere and leaves the user stuck on Join/ChurchDetails
  // with no way forward. Matching AppNavigator's actual condition
  // fixes it.
  const isGuest = useAuthStore(
    state => state.isGuest
  );

  const canAccessMain =
    !!accessToken || isGuest;

  const setAppConfig = useAppConfigStore(
    state => state.setConfig
  );

  const setChurchIds = useChurchStore(state => state.setChurch);
  const setFullProfile = useChurchStore(
    state => state.setFullProfile
  );
  

  useEffect(() => {
    if (!church?.churchID) return;

    loadProfile();
  }, [church?.churchID]);

  

  

  

    const mapProfile = useCallback((profile: any) => {
    setChurchPastors(
      (profile.pastors ?? []).map((item: any) => ({
        name: item.name || profile.headPastorName,
        photoUrl: item.photoUrl,
        bio: item.bio,
      }))
    );

    setChurchAbout(
      (profile.customAbouts ?? []).map((item: any) => ({
        title: item.title,
        details: item.details,
      }))
    );

    setChurchBranches(
      (profile.churchBranches ?? []).map((item: any) => ({
        branchName: item.branchName,
        address: item.address,
        pastorName: item.pastorName,
        pastorDetails: item.pastorDetails,
        pastorPictureUrl: item.pastorPicturUrl,
        phone: item.branchPhone,
        email: item.branchEmail,
        details: item.branchDetails,
      }))
    );
  }, []);

  const loadProfile = useCallback(async () => {
    if (!church?.churchID) return;

    try {
      setLoading(true);

      const response = await getMinistryProfile(church.churchID);

      const ministryProfile =
        response?.data ??
        response?.object ??
        response;

      if (!ministryProfile) {
        return;
      }

      setProfile(ministryProfile);
      mapProfile(ministryProfile);
    } catch (error) {
      console.error("MINISTRY PROFILE ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, [church?.churchID, mapProfile]);

  

  const tabs = useMemo(() => {
    return churchAbout.length > 0
      ? [
          "Pastors",
          "Locations",
          "Bios",
          ...churchAbout.map(
            item => item.title
          ),
        ]
      : [
          "Pastors",
          "Locations",
          "Bios",
        ];
  }, [churchAbout]);

  console.log('this is church:', church.churchID)

  const confirmChurch = async () => {
    
    
    try {
      setLoading(true);

      

      // console.log("AsyncStorage:", AsyncStorage);

      // Save church locally
      await AsyncStorage.setItem(
        "church",
        JSON.stringify(church)
      );

      

      // Subscribe to notifications
      // await Promise.all([
      //   subscribeTopic(`media${church.churchID}`),
      //   subscribeTopic(`feed${church.churchID}`),
      // ]);

      

      // Save full church object
      setUserChurch(church);

      // Save IDs
      setChurchIds(
        church.churchID,
        church.churchID
      );

      // Real per-church layout, replacing the hardcoded
      // mock/config.ts that's stood in for this since Modern was
      // first built. Confirmed via a live test: object is null
      // with status:false (not an HTTP error — a 200 with a
      // "not found" body) for a church that hasn't configured
      // branding yet — defaults to classic per that test, exactly
      // as asked. resolvedLayout (not the outer `layout` closure
      // variable, which was captured at render time before this
      // fetch ran) is what the routing decision below actually
      // needs — setConfig() is a state update, and this same
      // function keeps running before React re-renders with it.
      let resolvedLayout: "classic" | "modern" = "classic";

      try {
        const brandingResponse =
          await getBrandingConfiguration(
            church.churchID
          );

        const branding =
          brandingResponse?.object;

        if (
          branding?.theme?.toLowerCase() ===
          "modern"
        ) {
          resolvedLayout =
            "modern";
        }

        // White-label single-church builds can force a layout
        // via EXPO_PUBLIC_FORCE_LAYOUT regardless of what this
        // tenant's own branding config says — useful so a
        // dedicated church build doesn't depend on that church's
        // backend config staying set correctly. Blank/unset for
        // the main multi-church app, which just uses the real
        // fetched value as before.
        const forcedLayout =
          process.env
            .EXPO_PUBLIC_FORCE_LAYOUT;

        if (
          forcedLayout ===
            "modern" ||
          forcedLayout ===
            "classic"
        ) {
          resolvedLayout =
            forcedLayout;
        }

        setAppConfig({
          layout: resolvedLayout,

          appName:
            branding?.appName,

          logoUrl:
            branding?.logoUrl,

          primaryColor:
            branding?.primaryColor,

          secondaryColor:
            branding?.secondaryColor,

          accentColor:
            branding?.accentColor,

          backgroundColor:
            branding?.backgroundColor,

          backgroundImageUrl:
            branding?.backgroundImageUrl,

          fontFamily:
            branding?.fontFamily,

          darkModeEnabled:
            branding?.darkModeEnabled ??
            false,
        });
      } catch (error) {
        console.log(
          "BRANDING CONFIG ERROR:",
          error
        );

        // Same default applies on a genuine network/request
        // failure, not just the "not configured yet" case — a
        // church with no working branding config should never
        // block someone from getting into the app at all.
        setAppConfig({
          layout: "modern",
        });
      }

      

      

      if (!profile) {
          console.log("❌ Profile is NULL");
          return;
        }

        console.log("✅ Saving profile");
        console.log(profile);

        setFullProfile(profile);

        console.log(
          "Store after save:",
          useChurchStore.getState().fullProfile
        );

      // If already logged in OR browsing as a guest (e.g.
      // switching churches from the "More" menu, or a guest who
      // pressed "Skip To Feeds"), just go straight back to the
      // app — no need to re-run onboarding/login again. Which
      // screen counts as "the app" depends on the active layout —
      // resolvedLayout (fetched above, this call), not the outer
      // `layout` closure variable (stale until the next render).
      const routes =
        POST_CHURCH_ROUTES[
          resolvedLayout
        ] ??
        POST_CHURCH_ROUTES.classic;

      if (canAccessMain) {
        navigation.replace(
          routes.authenticated
        );

        return;
      }

      navigation.navigate(
        routes.unauthenticated
      )
    } catch (error) {
      console.error(error);

      Alert.alert(
        "Unable to save church",
        "Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,

    churchAbout,

    churchPastors,

    churchBranches,

    selectedTab,

    setSelectedTab,

    tabs,

    confirmChurch,
  };
}