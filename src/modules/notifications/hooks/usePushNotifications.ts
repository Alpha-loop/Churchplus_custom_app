import { useEffect, useRef } from "react";

import * as Notifications from "expo-notifications";

import { navigationRef } from "@/navigation/navigationRef";

import {
  registerForPushNotifications,
  saveDeviceToken,
} from "@/services/notifications/notification.service";

import { useAuthStore } from "@/store/authStore";

import { useChurchStore } from "@/store/churchStore";

import type { AppNotificationData } from "@/types/notifications/notification.types";

// Maps the `page` value the backend puts in a push's data payload
// to a screen in AppNavigator. Agree these keys with the backend
// team, then add one line per screen that pushes can open.
const PAGE_TO_SCREEN: Record<string, string> = {
  notifications: "Notifications",
  // Check each screen's expected params before enabling:
  // event: "EventDetails",
  // devotional: "TodayDevotional",
  // post: "FeedsDetail",
};

export default function usePushNotifications() {
  const personId = useAuthStore(
    state => state.user?.personId
  );

  const accessToken = useAuthStore(
    state => state.accessToken
  );

  const tenantId = useChurchStore(
    state => state.tenantId
  );

  // Remembers which person + church this device's token was saved
  // for, so logging in as someone else saves it again (same keying
  // as the FaithConnect app).
  const registeredKey = useRef<string | null>(null);

  // 1. Register the token whenever a (new) person is signed in.
  useEffect(() => {
    if (!personId || !tenantId || !accessToken) {
      registeredKey.current = null;
      return;
    }

    const key = `${personId}:${tenantId}`;

    if (registeredKey.current === key) {
      return;
    }

    registeredKey.current = key;

    registerForPushNotifications().then(token => {
      if (!token) {
        return;
      }

      saveDeviceToken(
        personId,
        token,
        tenantId,
        accessToken
      ).then(ok => {
        // Allow a retry next time if the save failed.
        if (!ok && registeredKey.current === key) {
          registeredKey.current = null;
        }
      });
    });
  }, [personId, accessToken, tenantId]);

  // 2. Open the right screen when a notification is tapped.
  // useLastNotificationResponse also covers the app being
  // launched from a closed state by tapping a notification,
  // which a plain response listener misses.
  const lastResponse =
    Notifications.useLastNotificationResponse();

  const handledId = useRef<string | null>(null);

  useEffect(() => {
    if (
      !lastResponse ||
      !accessToken ||
      !navigationRef.isReady()
    ) {
      return;
    }

    const id =
      lastResponse.notification.request.identifier;

    if (handledId.current === id) {
      return;
    }

    handledId.current = id;

    const data =
      (lastResponse.notification.request.content
        .data ?? {}) as AppNotificationData;

    const screen = data.page
      ? PAGE_TO_SCREEN[data.page]
      : undefined;

    navigationRef.navigate(
      screen ?? "Notifications",
      data.id ? { id: data.id } : undefined
    );
  }, [lastResponse, accessToken]);
}
