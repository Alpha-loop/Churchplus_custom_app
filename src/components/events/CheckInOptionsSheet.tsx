import { useEffect, useState } from "react";

import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import QRCode from "react-native-qrcode-svg";

import {
  ChevronLeft,
  ChevronRight,
  QrCode,
  ScanLine,
  X,
} from "lucide-react-native";

import { useAuthStore } from "@/store/authStore";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  visible: boolean;
  onClose: () => void;
  onScan: () => void;
}

// Check-in entry point: scan the event's code, or show your own
// code for the event team to scan. The personal code encodes the
// person's personId — nothing else.
export default function CheckInOptionsSheet({
  visible,
  onClose,
  onScan,
}: Props) {
  const { colors } = useTheme();

  const user: any = useAuthStore(s => s.user);

  const personId = user?.personId
    ? String(user.personId)
    : "";

  const name = [
    user?.person?.firstName ?? user?.firstName,
    user?.person?.lastName ?? user?.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const [view, setView] = useState<"menu" | "qr">(
    "menu"
  );

  // Always reopen on the options list.
  useEffect(() => {
    if (visible) setView("menu");
  }, [visible]);

  const option = (
    Icon: any,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.option,
        { backgroundColor: colors.surfaceAlt },
      ]}
    >
      <View
        style={[
          styles.optionIcon,
          { backgroundColor: colors.primaryMuted },
        ]}
      >
        <Icon size={22} color={colors.primary} />
      </View>

      <View style={styles.optionText}>
        <Text
          style={[
            styles.optionTitle,
            { color: colors.textPrimary },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.optionSub,
            { color: colors.textSecondary },
          ]}
        >
          {subtitle}
        </Text>
      </View>

      <ChevronRight
        size={18}
        color={colors.textMuted}
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.flex}>
        <Pressable
          style={styles.backdrop}
          onPress={onClose}
        />

        <View
          style={[
            styles.sheet,
            { backgroundColor: colors.surface },
          ]}
        >
          <View style={styles.header}>
            {view === "qr" ? (
              <TouchableOpacity
                onPress={() => setView("menu")}
                hitSlop={10}
              >
                <ChevronLeft
                  size={22}
                  color={colors.textPrimary}
                />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 22 }} />
            )}

            <Text
              style={[
                styles.title,
                { color: colors.textPrimary },
              ]}
            >
              {view === "qr" ? "My QR Code" : "Check in"}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              hitSlop={10}
            >
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {view === "menu" ? (
            <>
              {option(
                ScanLine,
                "Scan event code",
                "Scan the code posted at the venue",
                onScan
              )}

              {option(
                QrCode,
                "Show my QR code",
                "Let the event team scan your code",
                () => setView("qr")
              )}
            </>
          ) : (
            <View style={styles.qrWrap}>
              {personId ? (
                <>
                  {/* White card keeps the code scannable in
                      dark mode too. */}
                  <View style={styles.qrCard}>
                    <QRCode
                      value={personId}
                      size={220}
                      color="#000000"
                      backgroundColor="#FFFFFF"
                    />
                  </View>

                  {name ? (
                    <Text
                      style={[
                        styles.qrName,
                        { color: colors.textPrimary },
                      ]}
                    >
                      {name}
                    </Text>
                  ) : null}

                  <Text
                    style={[
                      styles.qrHint,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Show this code to the event team to be
                    checked in.
                  </Text>
                </>
              ) : (
                <Text
                  style={[
                    styles.qrHint,
                    { color: colors.textSecondary },
                  ]}
                >
                  We couldn't find your profile. Please sign
                  out and sign in again.
                </Text>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, justifyContent: "flex-end" },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 36,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  title: { fontSize: 18, fontWeight: "800" },

  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
  },

  optionIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },

  optionText: { flex: 1 },

  optionTitle: { fontSize: 15, fontWeight: "700" },

  optionSub: { fontSize: 12.5, marginTop: 2 },

  qrWrap: { alignItems: "center", paddingVertical: 6 },

  qrCard: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 20,
  },

  qrName: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 16,
  },

  qrHint: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    marginTop: 8,
    paddingHorizontal: 12,
  },
});
