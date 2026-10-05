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
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
} from "lucide-react-native";

import { Image } from "expo-image";

import useRegister from "@/modules/auth/hooks/useRegister";

import { useChurchStore } from "@/store/churchStore";

export default function ModernRegisterScreen({
  navigation,
}: any) {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleRegister,
  } =
    useRegister();

  const fullProfile = useChurchStore(
    state => state.fullProfile
  );

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const [
    agreedToTerms,
    setAgreedToTerms,
  ] = useState(false);

  const canSubmit =
    firstName.trim().length >
      0 &&
    lastName.trim().length >
      0 &&
    email.trim().length > 0 &&
    password.trim().length >
      0 &&
    agreedToTerms &&
    !loading;

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
            color="rgba(17, 17, 17, 0.8)"
          />
        </TouchableOpacity>
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
          <Image
            cachePolicy="memory-disk"
            // Local bundled asset instead of a remote logo URL —
            // same reasoning and same file as LoginScreen.tsx:
            // this is a dedicated single-church build, so the
            // logo is guaranteed to be there and loads instantly.
            // Adjust this filename if yours differs from
            // "logo-full.png" in the project's assets/ folder.
            source={require("../../../assets/logo-full.png")}
            contentFit="cover"
            style={
              styles.logoImage
            }
          />
        </View>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text
          style={
            styles.subtitle
          }
        >
          Join the{" "}
          {fullProfile?.churchName ||
            "Faith Connect"}{" "}
          digital sanctuary.
        </Text>

        <View
          style={styles.field}
        >
          <Text
            style={
              styles.fieldLabel
            }
          >
            First Name
          </Text>

          <View
            style={
              styles.inputWrap
            }
          >
            <User
              size={16}
              color="rgba(0,0,0,0.4)"
            />

            <TextInput
              value={firstName}
              onChangeText={
                setFirstName
              }
              placeholder="Enter your first name"
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={
                styles.input
              }
            />
          </View>
        </View>

        <View
          style={styles.field}
        >
          <Text
            style={
              styles.fieldLabel
            }
          >
            Last Name
          </Text>

          <View
            style={
              styles.inputWrap
            }
          >
            <User
              size={16}
              color="rgba(0,0,0,0.4)"
            />

            <TextInput
              value={lastName}
              onChangeText={
                setLastName
              }
              placeholder="Enter your last name"
              placeholderTextColor="rgba(0,0,0,0.4)"
              style={
                styles.input
              }
            />
          </View>
        </View>

        <View
          style={styles.field}
        >
          <Text
            style={
              styles.fieldLabel
            }
          >
            Email Address
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
              placeholder="name@example.com"
              placeholderTextColor="rgba(0,0,0,0.4)"
              autoCapitalize="none"
              keyboardType="email-address"
              style={
                styles.input
              }
            />
          </View>
        </View>

        <View
          style={styles.field}
        >
          <Text
            style={
              styles.fieldLabel
            }
          >
            Password
          </Text>

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
              placeholder="Create a password"
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
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            setAgreedToTerms(
              prev => !prev
            )
          }
          style={
            styles.termsRow
          }
        >
          <View
            style={[
              styles.checkbox,
              agreedToTerms &&
                styles.checkboxChecked,
            ]}
          >
            {agreedToTerms ? (
              <Check
                size={12}
                color="#FFFFFF"
              />
            ) : null}
          </View>

          <Text
            style={
              styles.termsText
            }
          >
            I agree to the{" "}
            <Text
              style={
                styles.termsLink
              }
              onPress={() => {
                // TODO: no Terms of Service page exists yet.
                console.log(
                  "Terms of Service pressed"
                );
              }}
            >
              Terms of Service
            </Text>{" "}
            and{" "}
            <Text
              style={
                styles.termsLink
              }
              onPress={() => {
                // TODO: no Privacy Policy page exists yet.
                console.log(
                  "Privacy Policy pressed"
                );
              }}
            >
              Privacy Policy
            </Text>
            .
          </Text>
        </TouchableOpacity>

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
          disabled={!canSubmit}
          onPress={() =>
            handleRegister(
              response => {
                navigation.navigate(
                  "VerifyOtp",
                  {
                    signupData:
                      response.object,
                  }
                );
              }
            )
          }
          style={[
            styles.submitButton,
            !canSubmit &&
              styles.submitButtonDisabled,
          ]}
        >
          <Text
            style={
              styles.submitText
            }
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </Text>

          {!loading ? (
            <ArrowRight
              size={16}
              color="#FFFFFF"
            />
          ) : null}
        </TouchableOpacity>

        <View
          style={styles.footer}
        >
          <Text
            style={
              styles.footerText
            }
          >
            Already have an
            account?{" "}
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "Login"
              )
            }
          >
            <Text
              style={
                styles.footerLink
              }
            >
              Log In
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

  topBar: {
    paddingHorizontal: 16,

    paddingTop: 54,

    paddingBottom: 8,
  },

  scroll: {
    padding: 24,

    alignItems: "center",
  },

  iconWrap: {
    width: 60,

    height: 60,

    borderRadius: 30,

    backgroundColor: "#28166f",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 14,

    overflow: "hidden",
  },

  logoImage: {
    width: "100%",

    height: "100%",
  },

  title: {
    fontSize: 24,

    fontWeight: "800",

    color: "#28166f",
  },

  subtitle: {
    fontSize: 13,

    color: "rgba(0,0,0,0.55)",

    textAlign: "center",

    marginTop: 6,

    marginBottom: 22,
  },

  field: {
    width: "100%",

    marginBottom: 14,
  },

  fieldLabel: {
    fontSize: 11,

    fontWeight: "700",

    color: "rgba(0,0,0,0.5)",

    marginBottom: 8,

    letterSpacing: 0.3,

    textTransform: "uppercase",
  },

  inputWrap: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.1)",

    borderRadius: 12,

    paddingHorizontal: 14,

    height: 48,

    backgroundColor: "#FFFFFF",
  },

  input: {
    flex: 1,

    fontSize: 14,

    color: "rgba(17, 17, 17, 0.9)",
  },

  termsRow: {
    flexDirection: "row",

    alignItems: "flex-start",

    gap: 10,

    width: "100%",

    marginTop: 4,

    marginBottom: 16,
  },

  checkbox: {
    width: 18,

    height: 18,

    borderRadius: 4,

    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.25)",

    alignItems: "center",

    justifyContent: "center",

    marginTop: 2,
  },

  checkboxChecked: {
    backgroundColor: "#28166f",

    borderColor: "#28166f",
  },

  termsText: {
    flex: 1,

    fontSize: 12,

    color: "rgba(0,0,0,0.6)",

    lineHeight: 18,
  },

  termsLink: {
    color: "#28166f",

    fontWeight: "600",
  },

  errorText: {
    color: "#B4413C",

    fontSize: 12,

    alignSelf: "flex-start",

    marginBottom: 10,
  },

  submitButton: {
    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 8,

    backgroundColor: "#28166f",

    borderRadius: 24,

    width: "100%",

    paddingVertical: 15,
  },

  submitButtonDisabled: {
    opacity: 0.5,
  },

  submitText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 14,
  },

  footer: {
    flexDirection: "row",

    marginTop: 18,
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
});