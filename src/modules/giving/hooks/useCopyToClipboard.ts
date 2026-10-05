import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AccessibilityInfo,
  Alert,
} from "react-native";

import * as Clipboard from "expo-clipboard";

// Copies text and remembers *which* thing was copied for a couple of
// seconds, so a button can flip to "Copied". The Classic bank card
// copied silently — the person had no way to know it worked.
//
// `key` identifies the button (e.g. one per bank account), so copying
// a second account moves the "Copied" state instead of leaving two.
export default function useCopyToClipboard(
  resetMs = 2000
) {
  const [
    copiedKey,
    setCopiedKey,
  ] = useState<string | null>(
    null
  );

  const timer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);

      timer.current = null;
    }
  };

  useEffect(
    () => clearTimer,
    []
  );

  const copy = async (
    key: string,
    text: string
  ) => {
    try {
      await Clipboard.setStringAsync(
        text
      );
    } catch (error) {
      console.log(
        "COPY ERROR:",
        error
      );

      // Never show "Copied" for something that wasn't.
      Alert.alert(
        "Couldn't copy",
        "Please select the number and copy it manually."
      );

      return;
    }

    clearTimer();

    setCopiedKey(key);

    AccessibilityInfo.announceForAccessibility(
      "Copied to clipboard"
    );

    timer.current = setTimeout(
      () => setCopiedKey(null),
      resetMs
    );
  };

  return {
    copiedKey,

    copy,
  };
}
