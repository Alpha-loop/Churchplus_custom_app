import {
  useEffect,
  useState,
} from "react";

import {
  VideoMedia,
} from "@/modules/media/types/media.types";

import {
  useNavigation,
} from "@react-navigation/native";

import { Alert } from "react-native";

import { CommonActions } from "@react-navigation/native";

import { useAuthStore } from "@/store/authStore";
import { useChurchStore } from "@/store/churchStore";
import useHome from "@/modules/home/hooks/useHome";

interface ChurchSocial {
  name: string;
  url: string;
}

export default function useMore() {
  const navigation =
  useNavigation<any>();

  const logout = useAuthStore(
    state => state.logout
  );

  const clearChurch = useChurchStore(
    state => state.clearChurch
  );

  // const fullProfile = useChurchStore(
  //   state => state.fullProfile
  // );

  

  const {
      videos,
      
      fullProfile,
      
    } = useHome();


  const [
    eventModal,
    setEventModal,
  ] = useState(false);

  const [
    churchSocials,
    setChurchSocials,
  ] = useState<
    ChurchSocial[]
  >([]);

  /**
   * Temporary mock data
   * Replace with store/API later
   */
  const churchInfo = null;

  const userInfo = null;

  const [churchMedia, setChurchMedia] =
    useState<VideoMedia[]>(
        []
    );

  

  useEffect(() => {
    if (!fullProfile?.churchSocialMedia) {
      setChurchSocials([]);
      return;
    }

    const socials = fullProfile.churchSocialMedia.filter(
      (item: any) =>
        item.name?.toLowerCase().includes("handle")
    );

    const media = fullProfile.churchSocialMedia.filter(
      (item: any) =>
        item.name?.toLowerCase().includes("channel id")
    );


    console.log(socials)

    console.log(media, `media`)

    setChurchSocials(socials);
    setChurchMedia(media)
  }, [fullProfile]);

  const routeToLiveStream =
    () => {
      if (
        !churchMedia?.length
      ) {
        return;
      }

      

      navigation.navigate(
        "ViewVideoDetails",
        {
          data:
            videos[0],

          videoDetails:
            videos,
        }
      );
    };

  const routeToProfile =
    () => {
      navigation.navigate(
        "Profile"
      );
    };

  const routeToGiving = () => {
    // "Giving" lives inside the bottom Tab.Navigator nested under
    // the "Faith" tab, so it must be reached with nested params —
    // a plain navigation.navigate("Giving") can't be found by
    // bubbling up from this navigator context.
    navigation.navigate("Faith", {
      screen: "Giving",
    });
  };

  const routeToDevotional =
    () => {
      navigation.navigate(
        "DevotionalLibrary"
      );
    };

  const routeToMyPledges =
    () => {
      navigation.navigate(
        "PledgesAndDonation"
      );
    };

  const switchChurch =
    async () => {
      clearChurch();

      navigation.navigate(
        "Join"
      );
    };

  const logOut = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout of Faith Connect?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: "Auth",
                    },
                  ],
                })
              );
            } catch (error) {
              console.log(
                "LOGOUT ERROR:",
                error
              );
            }
          },
        },
      ]
    );
  };

  

  return {
    eventModal,

    setEventModal,

    churchSocials,

    userInfo,

    routeToLiveStream,

    routeToProfile,

    routeToGiving,

    routeToDevotional,

    routeToMyPledges,

    switchChurch,

    logOut,
  };
}