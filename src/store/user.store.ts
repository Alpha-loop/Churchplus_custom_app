import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface UserState {
  userInfo: any;

  churchInfo: any;

  churchMedia: any[];

  connectedFriends: any[];

  networkStatus: boolean;

  login: (user: any) => void;

  logout: () => void;

  setChurch: (
    church: any
  ) => void;

  clearChurch: () => void;

  updateUserInfo: (
    payload: any
  ) => void;

  setChurchMedia: (
    media: any[]
  ) => void;

  setConnectedFriends: (
    friends: any[]
  ) => void;

  updateNetworkStatus: (
    status: boolean
  ) => void;
}

export const useUserStore =
  create<UserState>()(
    persist(
      (set) => ({
        userInfo: null,

        churchInfo: null,

        churchMedia: [],

        connectedFriends: [],

        networkStatus: true,

        login: (user) =>
          set({
            userInfo: user,
          }),

        logout: () =>
          set({
            userInfo: null,
          }),

        setChurch: (church) =>
          set({
            churchInfo: church,
          }),

        clearChurch: () =>
          set({
            churchInfo: null,

            churchMedia: [],
          }),

        updateUserInfo: (
          payload
        ) =>
          set((state) => ({
            userInfo: {
              ...state.userInfo,

              ...payload,
            },
          })),

        setChurchMedia: (
          media
        ) =>
          set({
            churchMedia: media,
          }),

        setConnectedFriends: (
          friends
        ) =>
          set({
            connectedFriends:
              friends,
          }),

        updateNetworkStatus: (
          status
        ) =>
          set({
            networkStatus:
              status,
          }),
      }),
      {
        name: "faith-connect-user",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );