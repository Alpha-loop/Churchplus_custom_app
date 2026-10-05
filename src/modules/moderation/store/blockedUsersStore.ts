import AsyncStorage from "@react-native-async-storage/async-storage";

import { create } from "zustand";

import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

// Blocking is enforced by the backend call (BlockFriendShipRequest),
// but the backend isn't guaranteed to filter a blocked person out of
// every list this app shows. Apple's UGC guideline expects a blocked
// user's content to disappear right away, so the app also remembers
// who was blocked and filters on this device.
//
// Keyed by the signed-in account so that two people sharing one
// device don't inherit each other's blocks.
interface BlockedUsersState {
  blockedByUser: Record<
    string,
    string[]
  >;

  block: (
    myUserId: string,
    blockedUserId: string
  ) => void;
}

export const useBlockedUsersStore =
  create<BlockedUsersState>()(
    persist(
      set => ({
        blockedByUser: {},

        block: (
          myUserId,
          blockedUserId
        ) =>
          set(state => {
            const current =
              state
                .blockedByUser[
                myUserId
              ] ?? [];

            if (
              current.includes(
                blockedUserId
              )
            ) {
              return state;
            }

            return {
              blockedByUser: {
                ...state.blockedByUser,

                [myUserId]: [
                  ...current,

                  blockedUserId,
                ],
              },
            };
          }),
      }),
      {
        name: "blocked-users-storage",

        storage: createJSONStorage(
          () => AsyncStorage
        ),
      }
    )
  );

// Stable reference when there's nothing blocked, so selectors that
// return it don't trigger a re-render on every store update.
const NONE: string[] = [];

export const useBlockedIds = (
  myUserId?: string
) =>
  useBlockedUsersStore(state =>
    myUserId
      ? state.blockedByUser[
          myUserId
        ] ?? NONE
      : NONE
  );
