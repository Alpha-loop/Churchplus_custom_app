import { useEffect, useState } from "react";

import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { CheckCircle2, X } from "lucide-react-native";

import moment from "moment";

import {
  RegistrationSession,
} from "@/modules/events/utils/eventRegistration";

import { useTheme } from "@/theme/ThemeContext";

interface Props {
  visible: boolean;
  eventName: string;
  sessions: RegistrationSession[];
  personName: string;
  submitting: boolean;
  error: string | null;
  onClearError: () => void;
  onSubmit: (attendanceId: string) => Promise<boolean>;
  onClose: () => void;
}

export default function EventRegistrationSheet({
  visible,
  eventName,
  sessions,
  personName,
  submitting,
  error,
  onClearError,
  onSubmit,
  onClose,
}: Props) {
  const { colors } = useTheme();

  const [done, setDone] = useState(false);

  const [selectedId, setSelectedId] = useState(
    sessions[0]?.id ?? ""
  );

  const selected =
    sessions.find(x => x.id === selectedId) ??
    sessions[0];

  // Fresh start each time it opens.
  useEffect(() => {
    if (visible) {
      setDone(false);

      setSelectedId(sessions[0]?.id ?? "");

      onClearError();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const handleSubmit = async () => {
    if (selected && (await onSubmit(selected.id))) {
      setDone(true);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <Pressable
          style={styles.backdrop}
          onPress={submitting ? undefined : onClose}
        />

        <View
          style={[
            styles.sheet,
            { backgroundColor: colors.surface },
          ]}
        >
          <View style={styles.header}>
            <Text
              style={[
                styles.title,
                { color: colors.textPrimary },
              ]}
              numberOfLines={2}
            >
              {done ? "You're registered" : "Register"}
            </Text>

            <TouchableOpacity
              onPress={onClose}
              hitSlop={10}
              disabled={submitting}
            >
              <X size={22} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {done ? (
            <View style={styles.doneWrap}>
              <CheckCircle2
                size={48}
                color={colors.primary}
              />

              <Text
                style={[
                  styles.doneText,
                  { color: colors.textSecondary },
                ]}
              >
                Thanks{personName ? `, ${personName.split(" ")[0]}` : ""}. Your
                registration for {eventName} has been
                received.
              </Text>

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={onClose}
                style={[
                  styles.button,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Text style={styles.buttonText}>Done</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <Text
                style={[
                  styles.eventName,
                  { color: colors.textSecondary },
                ]}
              >
                {eventName}
              </Text>

              {sessions.length > 1 ? (
                <View style={styles.field}>
                  <Text
                    style={[
                      styles.label,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Choose a session
                  </Text>

                  {sessions.map(item => {
                    const active = item.id === selected?.id;

                    return (
                      <TouchableOpacity
                        key={item.id}
                        activeOpacity={0.85}
                        disabled={submitting}
                        onPress={() => setSelectedId(item.id)}
                        style={[
                          styles.session,
                          {
                            borderColor: active
                              ? colors.primary
                              : colors.border,
                            backgroundColor: active
                              ? colors.primaryMuted
                              : colors.surfaceAlt,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.sessionName,
                            { color: colors.textPrimary },
                          ]}
                        >
                          {item.name}
                        </Text>

                        <Text
                          style={[
                            styles.sessionMeta,
                            { color: colors.textSecondary },
                          ]}
                        >
                          {[
                            item.date
                              ? moment(item.date).format(
                                  "MMM D, h:mm A"
                                )
                              : null,
                            item.groupName,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}

              {selected?.amount ? (
                <Text
                  style={[
                    styles.fee,
                    { color: colors.textMuted },
                  ]}
                >
                  Registration fee:{" "}
                  {selected.amount.toLocaleString()}
                </Text>
              ) : null}

              {personName ? (
                <Text
                  style={[
                    styles.eventName,
                    { color: colors.textSecondary },
                  ]}
                >
                  Registering as {personName}
                </Text>
              ) : null}

              {error ? (
                <Text
                  style={[
                    styles.error,
                    { color: colors.danger },
                  ]}
                >
                  {error}
                </Text>
              ) : null}

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleSubmit}
                disabled={submitting}
                style={[
                  styles.button,
                  {
                    backgroundColor: colors.primary,
                    opacity: submitting ? 0.7 : 1,
                  },
                ]}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>
                    Confirm Registration
                  </Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
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
    paddingBottom: 34,
    maxHeight: "90%",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  title: { fontSize: 20, fontWeight: "800", flex: 1 },

  eventName: { fontSize: 14, marginBottom: 4 },

  fee: { fontSize: 12, marginBottom: 6 },

  session: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },

  sessionName: { fontSize: 14, fontWeight: "700" },

  sessionMeta: { fontSize: 12, marginTop: 2 },

  field: { marginTop: 12 },

  label: { fontSize: 12, fontWeight: "600", marginBottom: 6 },

  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },

  error: { fontSize: 13, marginTop: 12, lineHeight: 18 },

  button: {
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    alignSelf: "stretch",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  doneWrap: {
    alignItems: "center",
    paddingVertical: 18,
    gap: 14,
  },

  doneText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
