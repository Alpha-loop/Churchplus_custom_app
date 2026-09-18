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
      supportsTablet: true,

      bundleIdentifier:
        IOS_BUNDLE_IDENTIFIER,

      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      adaptiveIcon: {
        foregroundImage:
          APP_ICON,

        backgroundColor:
          APP_SPLASH_BACKGROUND_COLOR,
      },

      edgeToEdgeEnabled: true,

      predictiveBackGestureEnabled: false,

      package:
        ANDROID_PACKAGE,

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