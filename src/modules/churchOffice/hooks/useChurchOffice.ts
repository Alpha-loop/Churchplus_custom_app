import { useMemo } from "react";

import { Alert, Linking } from "react-native";

import { useChurchStore } from "@/store/churchStore";

import {
  buildOfficeItems,
  cleanText,
  OfficeItem,
} from "../utils/churchOffice";

export default function useChurchOffice(
  navigation: any
) {
  const fullProfile: any = useChurchStore(
    state => state.fullProfile
  );

  const items = useMemo(
    () =>
      buildOfficeItems(
        fullProfile?.forms
      ),
    [fullProfile]
  );

  const phone = cleanText(
    fullProfile?.phoneNumber
  );

  const email = cleanText(
    fullProfile?.email
  );

  const churchName = cleanText(
    fullProfile?.churchName
  );

  const openItem = (item: OfficeItem) => {
    if (!item.url) {
      Alert.alert(
        item.title,
        "This isn't available in the app yet. Please contact the church office directly."
      );

      return;
    }

    navigation.navigate("ExternalUrl", {
      title: item.title,
      uri: item.url,
    });
  };

  const open = (url: string) =>
    Linking.openURL(url).catch(() =>
      Alert.alert(
        "Unable to open",
        "Your device couldn't open this."
      )
    );

  const call = () =>
    phone &&
    open(
      `tel:${phone.replace(/[^\d+]/g, "")}`
    );

  const sendEmail = () =>
    email && open(`mailto:${email}`);

  return {
    items,
    phone,
    email,
    churchName,
    openItem,
    call,
    sendEmail,
  };
}
