// app.config.js
//
// Same reasoning as the main faithConnect app's version of this
// file: JS config (not a static app.json) so each church's build
// can set its own name/icon/bundle ID via env vars at build time.
// The difference here is there's no "fallback to faithConnect
// defaults" — this project only ever exists as a dedicated
// single-church build, so every one of these should genuinely be
// set per church, not left at a shared default.

// Explicitly load .env here rather than assume the surrounding
// CLI command already does it — some commands that evaluate this
// file (like linking an EAS project during `eas build`) don't
// reliably auto-load .env the way `expo start` does, which is
// exactly what was causing EAS_PROJECT_ID to go unseen even
// though it was genuinely set in .env.
require("dotenv").config();

const APP_NAME =
  process.env.APP_NAME ||
  "Church App";

const APP_SLUG =
  process.env.APP_SLUG ||
  "church-app";

const APP_ICON =
  process.env.APP_ICON ||
  "./assets/splash.jpg";

const APP_SPLASH_IMAGE =
  process.env
    .APP_SPLASH_IMAGE ||
  "./assets/splash.jpg";

const APP_SPLASH_BACKGROUND_COLOR =
  process.env
    .APP_SPLASH_BACKGROUND_COLOR ||
  "#ffffff";

const IOS_BUNDLE_IDENTIFIER =
  process.env
    .IOS_BUNDLE_IDENTIFIER ||
  "com.churchapp.placeholder";

const ANDROID_PACKAGE =
  process.env
    .ANDROID_PACKAGE ||
  "com.churchapp.placeholder";

// This church's own Firebase project file — required for real
// push notifications to work (Firebase configs are keyed to a
// specific package name, so a placeholder/shared file will not
// actually deliver notifications for this church's real
// package). Only included if the file genuinely exists — Expo
// hard-fails the entire config parse if this points at a file
// that isn't there at all, which would otherwise block you from
// running/testing the app before Firebase is set up. Push
// notifications just won't work until you add a real file and
// set GOOGLE_SERVICES_FILE.
const fs = require("fs");

const googleServicesPath =
  process.env
    .GOOGLE_SERVICES_FILE ||
  "./google-services.json";

const GOOGLE_SERVICES_FILE =
  fs.existsSync(
    googleServicesPath
  )
    ? googleServicesPath
    : undefined;

// This build needs its OWN EAS project — run `eas init` for this
// specific church rather than reusing any other project's ID.
const EAS_PROJECT_ID =
  process.env
    .EAS_PROJECT_ID || "";

// Android masks adaptive icons to a circle/squircle and only
// guarantees the central ~66% is visible. APP_ICON's artwork fills
// ~77% of its canvas (fine for iOS, which only rounds corners), so
// the emblem's wide tips would be clipped on Android. A separate,
// padded foreground is used when the file exists; otherwise this
// falls back to APP_ICON so a build for another church without one
// never fails on a missing file.
const adaptiveIconPath =
  process.env
    .ANDROID_ADAPTIVE_ICON ||
  "./assets/adaptive-icon.png";

const ANDROID_ADAPTIVE_ICON =
  fs.existsSync(adaptiveIconPath)
    ? adaptiveIconPath
    : APP_ICON;

// The UI is designed for phones. With supportsTablet: true, Apple
// reviews the app on an iPad too (and requires iPad screenshots),
// so any layout issue there is a rejection risk. Off by default;
// set IOS_SUPPORTS_TABLET=true only after actually testing on iPad.
const IOS_SUPPORTS_TABLET =
  process.env.IOS_SUPPORTS_TABLET ===
  "true";

const NOTIFICATION_ICON_COLOR =
  process.env
    .NOTIFICATION_ICON_COLOR ||
  "#1D3AA8";

module.exports = {
  expo: {
    name: APP_NAME,

    slug: APP_SLUG,

    version: "1.0.0",

    orientation: "portrait",

    icon: APP_ICON,

    userInterfaceStyle: "light",

    newArchEnabled: true,

    splash: {
      image: APP_SPLASH_IMAGE,

      resizeMode: "contain",

      backgroundColor:
        APP_SPLASH_BACKGROUND_COLOR,
    },

    ios: {
      supportsTablet:
        IOS_SUPPORTS_TABLET,

      bundleIdentifier:
        IOS_BUNDLE_IDENTIFIER,

      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage:
          ANDROID_ADAPTIVE_ICON,

        backgroundColor:
          APP_SPLASH_BACKGROUND_COLOR,
      },

      edgeToEdgeEnabled: true,

      predictiveBackGestureEnabled: false,

      package:
        ANDROID_PACKAGE,

      // SYSTEM_ALERT_WINDOW ("draw over other apps") comes from the
      // default template for the dev menu overlay and has no use in
      // a store build. If you ever build the development client and
      // its debug overlay stops appearing, remove this line.
      // RECORD_AUDIO: nothing here records audio (the camera is only
      // used to scan QR codes), but a library's own manifest can
      // re-add it at build time regardless of plugin options —
      // blockedPermissions is what actually overrides that.
      blockedPermissions: [
        "android.permission.SYSTEM_ALERT_WINDOW",
        "android.permission.RECORD_AUDIO",
      ],

      // Only present at all when the file genuinely exists —
      // see the note above where GOOGLE_SERVICES_FILE is
      // computed. An explicit `googleServicesFile: undefined`
      // can still trip the same "file doesn't exist" validation
      // as a bad path string, so this key is omitted entirely
      // rather than set to undefined.
      ...(GOOGLE_SERVICES_FILE
        ? {
            googleServicesFile:
              GOOGLE_SERVICES_FILE,
          }
        : {}),
    },

    web: {
      favicon: "./assets/favicon.png",
    },

    plugins: [
      "expo-secure-store",
      "expo-web-browser",
      "expo-video",

      // Store-review purpose strings, written for what this app
      // actually does. The auto-applied defaults ("Allow X to
      // access your camera/location/microphone") are generic, and
      // also declared microphone + location access this app never
      // uses. Both plugins write the same camera key, so they're
      // given identical text to keep the result independent of the
      // order the plugins run in; `false` removes a permission.
      [
        "expo-camera",
        {
          cameraPermission:
            "Used to scan the QR code at an event so you can check in.",

          microphonePermission: false,

          recordAudioAndroid: false,
        },
      ],

      [
        "expo-image-picker",
        {
          photosPermission:
            "Used to choose a photo for your profile or a community post.",

          cameraPermission:
            "Used to scan the QR code at an event so you can check in.",

          microphonePermission: false,
        },
      ],

      [
        "expo-notifications",
        {
          icon: APP_ICON,

          color: NOTIFICATION_ICON_COLOR,
        },
      ],
    ],

    extra: {
      eas: {
        projectId:
          EAS_PROJECT_ID,
      },
    },
  },
};