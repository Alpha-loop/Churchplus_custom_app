// modules/events/screens/EventQRScannerScreen.tsx

import { useCallback, useRef, useState } from "react";

import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  BarcodeScanningResult,
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import { useFocusEffect } from "@react-navigation/native";

import useEventCheckin from "@/modules/events/hooks/useEventCheckin";

import useRequireAuth from "@/modules/auth/hooks/useRequireAuth";

interface EventQRPayload {
  eventId: string;
}

// Guards against malformed/malicious QR payloads instead of trusting JSON.parse blindly.
function parseEventQRPayload(raw: string): EventQRPayload | null {
  let parsed: unknown;

  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }

  if (
    parsed &&
    typeof parsed === "object" &&
    typeof (parsed as any).eventId === "string" &&
    (parsed as any).eventId.trim().length > 0
  ) {
    return { eventId: (parsed as any).eventId };
  }

  return null;
}

type ScanState = "idle" | "processing" | "error";

export default function EventQRScannerScreen({ navigation }: any) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isFocused, setIsFocused] = useState(true);
  const [isAppActive, setIsAppActive] = useState(true);
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState(false);

  const { loading, submitCheckin } = useEventCheckin();

  const { requireAuth } = useRequireAuth();

  // Guards against onBarcodeScanned firing multiple times per frame while
  // a submission is already in flight.
  const isLockedRef = useRef(false);

  // Only run the camera while this screen is focused, saving battery/CPU
  // and avoiding scans firing on a screen the user has navigated away from.
  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => {
        setIsFocused(false);
      };
    }, [])
  );

  // Pause camera if the app is backgrounded (e.g. user switches apps mid-scan).
  useCameraAppStateGuard(setIsAppActive);

  const resetScanState = useCallback(() => {
    isLockedRef.current = false;
    setScanState("idle");
    setErrorMessage(null);
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);
      resetScanState(); // clears isLockedRef + scanState on every focus

      return () => {
        setIsFocused(false);
      };
    }, [resetScanState])
  );

  const handleScan = useCallback(
  async (result: BarcodeScanningResult) => {
    if (isLockedRef.current) return;

    const payload = parseEventQRPayload(result.data);

    if (!payload) {
      isLockedRef.current = true;
      setScanState("error");
      setErrorMessage("This QR code isn't a valid event check-in code.");
      return;
    }

    isLockedRef.current = true;

    requireAuth(
      async () => {
        setScanState("processing");
        setErrorMessage(null);

        const outcome = await submitCheckin(payload.eventId);

        if (outcome.success) {
          navigation.replace("EventCheckinConfirmation", {
            eventId: payload.eventId,
            checkin: outcome.data,
          });
          return;
        }

        setScanState("error");
        setErrorMessage(outcome.error);
      },
      { message: "Log in to check in to this event" }
    );
  },
  [navigation, submitCheckin, requireAuth]
);

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!permission.granted) {
    // canAskAgain === false means the OS will no longer show the native
    // prompt — the user must go to Settings manually.
    const permanentlyDenied = !permission.canAskAgain;

    return (
      <View style={styles.center}>
        <Text style={styles.permissionTitle}>Camera access needed</Text>
        <Text style={styles.permissionBody}>
          We need camera access to scan event check-in QR codes.
        </Text>

        <Pressable
          style={styles.primaryButton}
          accessibilityRole="button"
          onPress={() =>
            permanentlyDenied ? Linking.openSettings() : requestPermission()
          }
        >
          <Text style={styles.primaryButtonText}>
            {permanentlyDenied ? "Open Settings" : "Grant Permission"}
          </Text>
        </Pressable>
      </View>
    );
  }

  const cameraActive = isFocused && isAppActive;
  const isBusy = scanState === "processing" || loading;

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {cameraActive ? (
        <CameraView
          style={{ flex: 1 }}
          enableTorch={torchOn}
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={isLockedRef.current ? undefined : handleScan}
        />
      ) : (
        <View style={[styles.center, { flex: 1 }]} />
      )}

      <View pointerEvents="box-none" style={styles.overlay}>
        <View style={styles.scanBox} />

        {scanState === "idle" && (
          <Text style={styles.scanText}>
            Point your camera at the Event QR Code
          </Text>
        )}

        {isBusy && (
          <View style={styles.statusCard}>
            <ActivityIndicator color="#FFFFFF" />
            <Text style={styles.statusText}>Checking you in…</Text>
          </View>
        )}

        {scanState === "error" && errorMessage && (
          <View style={styles.statusCard}>
            <Text style={styles.statusText}>{errorMessage}</Text>
            <Pressable
              style={styles.retryButton}
              accessibilityRole="button"
              onPress={resetScanState}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </Pressable>
          </View>
        )}
      </View>

      {Platform.OS !== "web" && (
        <Pressable
          style={styles.torchToggle}
          accessibilityRole="button"
          accessibilityLabel={torchOn ? "Turn off flashlight" : "Turn on flashlight"}
          onPress={() => setTorchOn(prev => !prev)}
        >
          <Text style={styles.torchToggleText}>
            {torchOn ? "Flash On" : "Flash Off"}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

// Extracted so the AppState subscription is set up/torn down cleanly.
function useCameraAppStateGuard(setActive: (active: boolean) => void) {
  const subscriptionRef = useRef<ReturnType<typeof AppState.addEventListener> | null>(null);

  useFocusEffect(
    useCallback(() => {
      const handleChange = (state: AppStateStatus) => {
        setActive(state === "active");
      };

      subscriptionRef.current = AppState.addEventListener("change", handleChange);

      return () => {
        subscriptionRef.current?.remove();
      };
    }, [setActive])
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#000",
  },

  permissionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },

  permissionBody: {
    color: "#D1D5DB",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },

  primaryButton: {
    backgroundColor: "#1146B5",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  scanBox: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  scanText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },

  statusCard: {
    marginTop: 24,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    maxWidth: 280,
  },

  statusText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },

  retryButton: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
  },

  retryButtonText: {
    color: "#111827",
    fontWeight: "700",
  },

  torchToggle: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  torchToggleText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});