import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "PASTE_YOUR_DSN_HERE", // copy it from the Sentry.init in App.tsx
  debug: false,
  enableNativeCrashHandling: true,
});