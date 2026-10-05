import { useEffect, useRef } from "react";

import * as Notifications from "expo-notifications";

import { EventSubscription } from "expo-modules-core";

import {
  registerForPushNotifications,
  saveDeviceToken,
} from "@/services/notifications/notification.service";

import { useAuthStore } from "@/store/authStore";

import { useChurchStore } from "@/store/churchStore";

// Was built but never called anywhere in the entire faithConnect
// codebase (main app included) — confirmed directly. This is the
// actual wiring: fires once someone is authenticated, gets a
// real Expo push token, and saves it to the real
// SaveDeviceToken endpoint so the backend has something to send
// to later. Runs from AppNavigator.tsx, only in the
// canAccessMain branch — there's no reason to prompt for
// notification permission before someone has even signed in.
export default function usePushNotifications() {
  // Was state.user?.userId — confirmed from a real login
  // response that this backend's personId is a genuinely
  // different value from userId, and SaveDeviceToken's schema
  // names this field personID specifically. Same fix as
  // useNotes.ts, for the same underlying confusion.
  const personId = useAuthStore(
    state => state.user?.personId
  );

  const accessToken = useAuthStore(
    state => state.accessToken
  );

  const tenantId = useChurchStore(
    state => state.tenantId
  );

  const hasRegistered = useRef(false);

  const notificationListener =
    useRef<EventSubscription | null>(
      null
    );

  const responseListener =
    useRef<EventSubscription | null>(
      null
    );

  useEffect(() => {
    if (
      !personId ||
      hasRegistered.current
    ) {
      return;
    }

    hasRegistered.current = true;

    registerForPushNotifications().then(
      token => {
        if (!token) {
          return;
        }

        saveDeviceToken(
          personId,
          token,
          tenantId,
          accessToken
        );
      }
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener(
        notification => {
          console.log(
            "Foreground notification:",
            notification
          );
        }
      );

    // Real navigation-on-tap isn't wired up — nothing anywhere
    // sends a real push yet, so there's no real payload shape to
    // route on. Logs for now, same honesty rule as everywhere
    // else in this codebase: don't fabricate handling for a
    // payload structure that doesn't exist yet.
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        response => {
          console.log(
            "Notification tapped:",
            response
          );
        }
      );

    return () => {
      notificationListener.current?.remove();

      responseListener.current?.remove();
    };
  }, [personId]);
}