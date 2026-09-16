import {
  useEffect,
  useState,
} from "react";

import {
  getUserProfile,
} from "../services/profile.service";

import {
  useAuthStore,
} from "@/store/authStore";

import { Alert } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

import { deleteUserAccount } from "../services/profile.service";


export default function useProfile() {
  const user =
    useAuthStore(
      state => state.user
    );

  const token =
    useAuthStore(
      state => state.accessToken
    );

  const logout = useAuthStore(
    state => state.logout
  );

  const navigation = useNavigation<any>();

  const [
    profile,
    setProfile,
  ] = useState<any>(null);

  const [
    profileVisible,
    setProfileVisible,
  ] = useState(true);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const loadProfile =
  async () => {
    try {
      if (
        !user?.personId ||
        !token
      ) {
        return;
      }

      setLoading(true);

      const response =
        await getUserProfile(
          user.personId,
          token
        );

      console.log(
        "PROFILE RESPONSE:",
        response
      );

      setProfile(
        response?.object || null
      );
    } catch (error) {
      console.log(
        "PROFILE ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action is permanent and cannot be undone.\n\nAre you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              if (!token) return;

              setLoading(true);

              await deleteUserAccount(user?.userId, token);

              await logout();

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      // Was "Auth" — same nested-wrapper mismatch
                      // as OnboardingScreen.tsx/useRequireAuth.ts.
                      // This app registers "Login" flat.
                      name: "Login",
                    },
                  ],
                })
              );
            } catch (error) {
              console.log(
                "DELETE ACCOUNT ERROR:",
                error
              );

              Alert.alert(
                "Delete Account",
                "Unable to delete your account. Please try again."
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return {
    profile,

    loading,

    profileVisible,

    handleDeleteAccount,

    setProfileVisible,

    refreshProfile:
      loadProfile,
  };
}