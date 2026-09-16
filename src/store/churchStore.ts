import { create } from "zustand";

import AsyncStorage from
"@react-native-async-storage/async-storage";

import {
  persist,
  createJSONStorage,
} from "zustand/middleware";

interface Pastor {
  name?: string | null;
  phone?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
}

interface ChurchBranch {
  branchName?: string;
  address?: string;
  branchDetails?: string;
  branchPhone?: string;
}

interface CustomAbout {
  title: string;
  details: string;
}

interface ChurchProfile {
  logoUrl?: string;

  churchName?: string;

  pastors?: Pastor[];

  churchBranches?: ChurchBranch[];

  customAbouts?: CustomAbout[];

  churchSocialMedia?: [],

  forms?: [],
}

interface ChurchState {
  tenantId: string | null;

  churchId: string | null;

  fullProfile: ChurchProfile | null;

  setChurch: (
    tenantId: string,
    churchId: string
  ) => void;

  setFullProfile: (
    profile: ChurchProfile | null
  ) => void;

  clearChurch: () => void;
}

export const useChurchStore = create<ChurchState>()(
  persist(
    set => ({
      tenantId: null,

      churchId: null,

      fullProfile: null,

      setChurch: (
        tenantId,
        churchId
      ) =>
        set({
          tenantId,
          churchId,
        }),

      setFullProfile: profile =>
        set({
          fullProfile: profile,
        }),

      clearChurch: () =>
        set({
          tenantId: null,
          churchId: null,
          fullProfile: null,
        }),
    }),
    {
      name: "church-storage",

      storage: createJSONStorage(
        () => AsyncStorage
      ),
    }
  )
);