import {
  useRef,
  useState,
} from "react";

import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import type { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useChurchStore } from "@/store/churchStore";

import { fetchOnlineDonations } from "../services/give.service";

import { getGivingUrl } from "../utils/givingUrl";

export interface GiveFund {
  id: string;

  name: string;
}

// Only funds that can actually be opened: the hosted giving page is
// addressed by fund id, so an entry without one is unusable.
const toFunds = (
  raw: unknown
): GiveFund[] =>
  (Array.isArray(raw)
    ? raw
    : []
  )
    .filter(
      (item: any) => item?.id
    )
    .map((item: any) => ({
      id: String(item.id),

      name:
        String(
          item.name ?? ""
        ).trim() ||
        "Online giving",
    }));

// "Give" from anywhere in the app (devotional, video, …) without
// leaving that screen's context: the gift page opens on top of it, so
// Back returns to what the person was reading or watching.
//
//   no funds   -> says online giving isn't set up (no dead end)
//   one fund   -> opens it directly
//   several    -> `sheetRef` shows a picker (render <GiveFundSheet/>)
//
// Where the funds come from: the church profile the app already loaded
// at startup carries them (same endpoint the Giving tab calls), so
// there's normally nothing to download and it works for guests too.
// Only if the profile in memory doesn't have them is it fetched, on
// tap.
export default function useGiveAction() {
  const navigation =
    useNavigation<any>();

  const tenantId = useChurchStore(
    state => state.tenantId
  );

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const sheetRef =
    useRef<BottomSheetModal>(null);

  // A ref, not state: two quick taps can both read `loading === false`
  // before the first re-render lands.
  const busyRef = useRef(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    funds,
    setFunds,
  ] = useState<GiveFund[]>([]);

  const openFund = (
    fund: GiveFund
  ) => {
    sheetRef.current?.dismiss();

    navigation.navigate(
      "ExternalUrl",
      {
        title: fund.name,

        uri: getGivingUrl(
          fund.id
        ),
      }
    );
  };

  const give = async () => {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;

    try {
      let raw: unknown = (
        fullProfile as any
      )?.onlineDonations;

      if (!Array.isArray(raw)) {
        if (!tenantId) {
          Alert.alert(
            "Giving isn't available right now",
            "Please try again in a moment."
          );

          return;
        }

        setLoading(true);

        raw =
          await fetchOnlineDonations(
            tenantId
          );
      }

      const list = toFunds(raw);

      if (list.length === 0) {
        Alert.alert(
          "Giving isn't available yet",
          "Online giving hasn't been set up for this church yet."
        );

        return;
      }

      if (list.length === 1) {
        openFund(list[0]);

        return;
      }

      setFunds(list);

      sheetRef.current?.present();
    } catch (error: any) {
      console.log(
        "GIVE ERROR:",
        error?.response?.status,

        error?.response?.data ??
          error?.message
      );

      Alert.alert(
        "Couldn't load giving options",
        "Please check your connection and try again."
      );
    } finally {
      busyRef.current = false;

      setLoading(false);
    }
  };

  return {
    give,

    loading,

    funds,

    sheetRef,

    openFund,
  };
}
