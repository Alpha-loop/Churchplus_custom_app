// import { create } from "zustand";

// interface AuthState {
//   accessToken: string | null;

//   refreshToken: string | null;

//   setTokens: (
//     accessToken: string,
//     refreshToken: string
//   ) => void;

//   clearAuth: () => void;
// }

// export const useAuthStore =
//   create<AuthState>(set => ({
//     accessToken: null,

//     refreshToken: null,

//     setTokens: (
//       accessToken,
//       refreshToken
//     ) =>
//       set({
//         accessToken,
//         refreshToken,
//       }),

//     clearAuth: () =>
//       set({
//         accessToken: null,
//         refreshToken: null,
//       }),
//   }));


import AsyncStorage from
"@react-native-async-storage/async-storage";

import { create } from "zustand";

import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

interface AuthState {
  accessToken: string | null;

  refreshToken: string | null;

  user: any | null;

  setAuth: (
    auth: {
      accessToken: string;
      refreshToken?: string;
      user: any;
    }
  ) => void;

  isGuest: boolean;
  enterGuestMode: () => void;
  exitGuestMode: () => void;

  logout: () => Promise<void>;

  clearAuth: () => void;
}

export const useAuthStore =
  create<AuthState>()(
    persist(
      set => ({
        accessToken: null,

        refreshToken: null,

        user: null,

        

        setAuth:
          auth =>
            set({
              accessToken:
                auth.accessToken,

              refreshToken:
                auth.refreshToken ??
                null,

              user:
                auth.user,

              
            }),

        isGuest: false,

        enterGuestMode: () => set({ isGuest: true }),

        exitGuestMode: () => set({ isGuest: false }),

        logout: async () => {
          await AsyncStorage.removeItem("auth-storage");

          set({
            accessToken: null,
            refreshToken: null,
            user: null,
            isGuest: false,
          });
        },
        clearAuth: () =>
        // Deliberately does NOT touch isGuest — this is called by
        // apiClient.ts's response interceptor on every 401, which
        // is completely normal/expected for a guest (no real
        // token, so plenty of endpoints will 401). Wiping isGuest
        // here silently kicked guests out of guest mode mid-flow,
        // dropping canAccessMain back to false and bouncing them
        // back to Join in a loop. isGuest should only change via
        // an explicit enterGuestMode()/exitGuestMode()/logout()
        // call, never as a side effect of a routine failed request.
        set({
            accessToken: null,
            refreshToken: null,
        }),
      }),
      {
        name: "auth-storage",

        storage: createJSONStorage(
          () => AsyncStorage
        ),
      }
    )
  );