import { useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import {
  ChevronLeft,
  KeyRound,
  ArrowRight,
} from "lucide-react-native";

import useForgotPassword from "@/modules/auth/hooks/useForgotPassword";

import { useChurchStore } from "@/store/churchStore";

export default function ModernForgotPasswordScreen({
  navigation,
}: any) {
  const {
    email,
    setEmail,
    loading,
    error,
    handleResetPassword,
  } =
    useForgotPassword();

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <View
        style={styles.topBar}
      >
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
          hitSlop={8}
        >
          <ChevronLeft
            size={22}
            color="#28166f"
          />
        </TouchableOpacity>

        <Text
          style={
            styles.topBarTitle
          }
        >
          {fullProfile?.churchName ||
            "Faith Connect"}
        </Text>

        <View
          style={{ width: 22 }}
        />
      </View>

      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <View
          style={
            styles.iconWrap
          }
        >
          <KeyRound
            size={24}
            color="#28166f"
          />
        </View>

        <Text style={styles.title}>
          Reset Password
        </Text>

        <Text
          style={
            styles.description
          }
        >
          Enter your email
          address and we'll send
          you a link to reset
          your password.
        </Text>

        <View
          style={styles.card}
        >
          <Text
            style={
              styles.fieldLabel
            }
          >
            Email Address
          </Text>

          <TextInput
            value={email}
            onChangeText={
              setEmail
            }
            placeholder="name@example.com"
            placeholderTextColor="rgba(0,0,0,0.4)"
            autoCapitalize="none"
            keyboardType="email-address"
            style={
              styles.input
            }
          />

          {error ? (
            <Text
              style={
                styles.errorText
              }
            >
              {error}
            </Text>
          ) : null}

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={loading}
            onPress={() =>
              handleResetPassword(
                () => {
                  // The screen registered as "ResetPassword" in
                  // AuthNavigator — not restyled for Modern yet,
                  // reused as-is since no design exists for it.
                  navigation.navigate(
                    "ResetPassword"
                  );
                }
              )
            }
            style={
              styles.submitButton
            }
          >
            <Text
              style={
                styles.submitText
              }
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </Text>

            {!loading ? (
              <ArrowRight
                size={16}
                color="#FFFFFF"
              />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F3FA",
  },

  topBar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 14,

    backgroundColor: "#FFFFFF",
  },

  topBarTitle: {
    fontSize: 16,

    fontWeight: "700",

    color: "#28166f",
  },

  scroll: {
    padding: 24,

    alignItems: "center",
  },

  iconWrap: {
    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",

    marginTop: 12,

    marginBottom: 18,
  },

  title: {
    fontSize: 22,

    fontWeight: "800",

    color: "rgba(17, 17, 17, 0.92)",
  },

  description: {
    fontSize: 13,

    color: "rgba(0,0,0,0.55)",

    textAlign: "center",

    lineHeight: 19,

    marginTop: 8,

    marginBottom: 24,

    paddingHorizontal: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 18,

    padding: 18,

    width: "100%",
  },

  fieldLabel: {
    fontSize: 11,

    fontWeight: "700",

    color: "rgba(0,0,0,0.5)",

    marginBottom: 8,

    letterSpacing: 0.3,
  },

  input: {
    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.1)",

    borderRadius: 12,

    paddingHorizontal: 14,

    height: 46,

    fontSize: 14,

    color: "rgba(17, 17, 17, 0.9)",
  },

  errorText: {
    color: "#B4413C",

    fontSize: 12,

    marginTop: 8,
  },

  submitButton: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    backgroundColor: "#28166f",

    borderRadius: 12,

    paddingVertical: 14,

    marginTop: 14,
  },

  submitText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 13,
  },
});