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

import { Image } from "expo-image";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Fingerprint,
  ArrowRight,
} from "lucide-react-native";

import useLogin from "@/modules/auth/hooks/useLogin";

import { useAuthStore } from "@/store/authStore";

import { useChurchStore } from "@/store/churchStore";

export default function ModernLoginScreen({
  navigation,
}: any) {
  const {
    loading,
    handleLogin,
  } = useLogin();

  const enterGuestMode = useAuthStore(
    state => state.enterGuestMode
  );

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const [email, setEmail] =
    useState("");

  const [
    password,
    setPassword,
  ] = useState("");

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [error, setError] =
    useState("");

  const onSubmit = async () => {
    try {
      setError("");

      await handleLogin(
        email,
        password
      );

      navigation.replace(
        "Main"
      );
    } catch (err: any) {
      setError(
        err?.response?.data
          ?.message ||
          "Login failed"
      );
    }
  };

  const onContinueAsGuest = () => {
    enterGuestMode();

    // Same reasoning as useRequireAuth.ts's goToLogin — entering
    // guest mode is a state update, and AppNavigator only
    // registers "Main" once canAccessMain (accessToken || isGuest)
    // actually recomputes as true on the next render. Deferring
    // one tick lets that happen before navigating, rather than
    // firing the reset against a navigator that hasn't registered
    // "Main" yet. reset() (not navigate()) so there's nothing to
    // go "back" to on the auth stack afterward — a guest landing
    // on Main shouldn't be able to swipe/back into Login.
    setTimeout(() => {
      navigation.reset({
        index: 0,

        routes: [
          { name: "Main" },
        ],
      });
    }, 0);
  };

  console.log(fullProfile);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <ScrollView
        contentContainerStyle={
          styles.scroll
        }
      >
        <View
          style={styles.card}
        >
          <View
            style={
              styles.iconWrap
            }
          >
            <Image
              cachePolicy="memory-disk"
              // Local bundled asset instead of fullProfile.logoUrl
              // — this is a dedicated single-church build, so the
              // logo is guaranteed to be there and loads instantly
              // with no network dependency, unlike a remote fetch.
              // Adjust this filename if yours differs from
              // "logo.png" in the project's assets/ folder.
              source={require("../../../assets/logo-full.png")}
              contentFit="cover"
              style={
                styles.logoImage
              }
            />
          </View>

          <Text
            style={
              styles.churchName
            }
          >
            {fullProfile?.churchName ||
              "Faith Connect"}
          </Text>

          <Text
            style={
              styles.subtitle
            }
          >
            Welcome back to your
            sanctuary.
          </Text>

          <View
            style={
              styles.inputWrap
            }
          >
            <Mail
              size={16}
              color="rgba(0,0,0,0.4)"
            />

            <TextInput
              value={email}
              onChangeText={
                setEmail
              }
              placeholder="Email Address"
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCapitalize="none"
              keyboardType="email-address"
              style={
                styles.input
              }
            />
          </View>

          <View
            style={
              styles.inputWrap
            }
          >
            <Lock
              size={16}
              color="rgba(0,0,0,0.4)"
            />

            <TextInput
              value={password}
              onChangeText={
                setPassword
              }
              placeholder="Password"
              placeholderTextColor="rgba(0,0,0,0.4)"
              secureTextEntry={
                !showPassword
              }
              style={
                styles.input
              }
            />

            <TouchableOpacity
              onPress={() =>
                setShowPassword(
                  prev => !prev
                )
              }
              hitSlop={8}
            >
              {showPassword ? (
                <EyeOff
                  size={16}
                  color="rgba(0,0,0,0.4)"
                />
              ) : (
                <Eye
                  size={16}
                  color="rgba(0,0,0,0.4)"
                />
              )}
            </TouchableOpacity>
          </View>

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
            onPress={() =>
              navigation.navigate(
                "ForgotPassword"
              )
            }
            style={
              styles.forgotWrap
            }
          >
            <Text
              style={
                styles.forgotText
              }
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onSubmit}
            disabled={loading}
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
                ? "Signing In..."
                : "Sign In"}
            </Text>

            {!loading ? (
              <ArrowRight
                size={16}
                color="#FFFFFF"
              />
            ) : null}
          </TouchableOpacity>

          <View
            style={
              styles.dividerRow
            }
          >
            <View
              style={
                styles.dividerLine
              }
            />

            <Text
              style={
                styles.dividerText
              }
            >
              or continue with
            </Text>

            <View
              style={
                styles.dividerLine
              }
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => {
              // TODO: no biometric auth library is installed yet
              // (e.g. expo-local-authentication) — this button is
              // a real UI affordance with nothing behind it.
              console.log(
                "Biometric login pressed — not implemented yet"
              );
            }}
            style={
              styles.biometricButton
            }
          >
            <Fingerprint
              size={18}
              color="rgba(17, 17, 17, 0.8)"
            />

            <Text
              style={
                styles.biometricText
              }
            >
              Biometric Login
            </Text>
          </TouchableOpacity>

          <View
            style={
              styles.footer
            }
          >
            <Text
              style={
                styles.footerText
              }
            >
              Don't have an
              account?{" "}
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate(
                  "Register"
                )
              }
            >
              <Text
                style={
                  styles.footerLink
                }
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              onContinueAsGuest
            }
            style={
              styles.guestWrap
            }
          >
            <Text
              style={
                styles.guestText
              }
            >
              Continue as Guest
            </Text>
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

  scroll: {
    flexGrow: 1,

    justifyContent: "center",

    padding: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 24,

    padding: 24,

    alignItems: "center",
  },

  iconWrap: {
    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: "#1D3AA8",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 14,

    overflow: "hidden",
  },

  logoImage: {
    width: "100%",

    height: "100%",
  },

  churchName: {
    fontSize: 20,

    fontWeight: "800",

    color: "#28166f",
  },

  subtitle: {
    fontSize: 13,

    color: "rgba(0,0,0,0.55)",

    marginTop: 4,

    marginBottom: 22,
  },

  inputWrap: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    width: "100%",

    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.1)",

    borderRadius: 12,

    paddingHorizontal: 14,

    height: 48,

    marginBottom: 12,
  },

  input: {
    flex: 1,

    fontSize: 14,

    color: "rgba(17, 17, 17, 0.9)",
  },

  errorText: {
    color: "#B4413C",

    fontSize: 12,

    alignSelf: "flex-start",

    marginBottom: 8,
  },

  forgotWrap: {
    alignSelf: "flex-end",

    marginBottom: 18,
  },

  forgotText: {
    fontSize: 12,

    fontWeight: "600",

    color: "#28166f",
  },

  submitButton: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    backgroundColor: "#28166f",

    borderRadius: 24,

    width: "100%",

    paddingVertical: 14,
  },

  submitText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 14,
  },

  dividerRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    width: "100%",

    marginVertical: 18,
  },

  dividerLine: {
    flex: 1,

    height: 1,

    backgroundColor: "rgba(0,0,0,0.1)",
  },

  dividerText: {
    fontSize: 12,

    color: "rgba(0,0,0,0.45)",
  },

  biometricButton: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    backgroundColor: "#EFEEF9",

    borderRadius: 24,

    width: "100%",

    paddingVertical: 13,
  },

  biometricText: {
    fontSize: 13,

    fontWeight: "600",

    color: "rgba(17, 17, 17, 0.85)",
  },

  footer: {
    flexDirection: "row",

    marginTop: 20,
  },

  footerText: {
    fontSize: 13,

    color: "rgba(0,0,0,0.6)",
  },

  footerLink: {
    fontSize: 13,

    fontWeight: "700",

    color: "#28166f",
  },

  guestWrap: {
    marginTop: 18,

    alignItems: "center",
  },

  guestText: {
    fontSize: 13,

    fontWeight: "600",

    color: "rgba(0,0,0,0.45)",

    textDecorationLine: "underline",
  },
});