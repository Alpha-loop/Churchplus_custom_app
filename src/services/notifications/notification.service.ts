import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Platform } from "react-native";

import { api } from "../apiClient";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerForPushNotifications() {
  if (!Device.isDevice) {
    console.log("Must use physical device");
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const permission = await Notifications.getPermissionsAsync();
  let finalStatus = permission.status;

  if (permission.status !== "granted") {
    const request = await Notifications.requestPermissionsAsync();
    finalStatus = request.status;
  }

  if (finalStatus !== "granted") {
    console.log("Push permission denied");
    return null;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId
    ?? Constants.easConfig?.projectId;

  if (!projectId) {
    console.log("No projectId found — check app.json/eas.json");
    return null;
  }

  try {
    const token = await Notifications.getExpoPushTokenAsync({ projectId });
    return token.data;
  } catch (err) {
    console.error("Error getting push token:", err);
    return null;
  }
}

// Real endpoint, confirmed to exist on this backend:
// POST /portal/PortalUtility/SaveDeviceToken (the base URL
// already includes /api, so the relative path here is
// /portal/PortalUtility/SaveDeviceToken).
//
// Payload confirmed directly from the real OpenAPI schema:
// { id, personID, deviceToken, platform, tenantID } — camelCase,
// not the PascalCase convention requestFriendship uses elsewhere
// on this same backend, so that was a wrong guess corrected here.
// personID is assumed to be the same identifier authStore calls
// userId — there's no other clearly-labeled "person id" available
// anywhere in this app to map it from instead. id is left blank,
// assumed to mean "create new" for a token this device hasn't
// registered before, same as how a fresh row typically works on
// this kind of upsert endpoint.
export async function saveDeviceToken(
  personId: string,
  deviceToken: string,
  tenantId: string,
  token: string | null
) {
  try {
    await api.post(
      "/portal/PortalUtility/SaveDeviceToken",
      {
        id: "",

        personID: personId,

        deviceToken: deviceToken,

        platform: Platform.OS,

        tenantID: tenantId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (error) {
    console.log(
      "SAVE DEVICE TOKEN ERROR:",
      error
    );

    return false;
  }
}