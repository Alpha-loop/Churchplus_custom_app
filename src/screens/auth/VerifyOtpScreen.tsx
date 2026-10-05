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
  ShieldCheck,
} from "lucide-react-native";

import useVerifyOtp from "@/modules/auth/hooks/useVerifyOtp";

export default function ModernVerifyOtpScreen({
  navigation,
  route,
}: any) {
  const {
    signupData,
  } = route.params ?? {};

  const {
    inputs,
    otpArray,
    handleChange,
    handleVerify,
    loading,
    error,
    timer,
  } = useVerifyOtp(
    signupData,
    navigation
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
          <ShieldCheck
            size={26}
            color="#28166f"
          />
        </View>

        <Text style={styles.title}>
          Verify Your Email
        </Text>

        <Text
          style={
            styles.description
          }
        >
          We've sent a 6-digit
          code to your email
          address. Please enter
          it below to continue.
        </Text>

        <View
          style={styles.otpRow}
        >
          {otpArray.map(
            (digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  if (ref) {
                    inputs.current[
                      index
                    ] = ref;
                  }
                }}
                value={digit}
                onChangeText={text =>
                  handleChange(
                    text.slice(
                      -1
                    ),
                    index
                  )
                }
                keyboardType="number-pad"
                maxLength={1}
                style={
                  styles.otpBox
                }
              />
            )
          )}
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
          activeOpacity={0.85}
          disabled={loading}
          onPress={handleVerify}
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
              ? "Verifying..."
              : "Verify & Continue"}
          </Text>
        </TouchableOpacity>

        <View
          style={
            styles.resendRow
          }
        >
          <Text
            style={
              styles.resendLabel
            }
          >
            Didn't receive the
            code?{" "}
          </Text>

          <Text
            style={
              timer > 0
                ? styles.resendTimer
                : styles.resendLink
            }
          >
            {timer > 0
              ? `Resend in 00:${timer
                  .toString()
                  .padStart(
                    2,
                    "0"
                  )}`
              : "Resend OTP"}
          </Text>
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
    width: 64,

    height: 64,

    borderRadius: 32,

    backgroundColor: "#EFEEF9",

    alignItems: "center",

    justifyContent: "center",

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

    marginBottom: 26,

    paddingHorizontal: 12,
  },

  otpRow: {
    flexDirection: "row",

    gap: 8,

    marginBottom: 22,
  },

  otpBox: {
    width: 44,

    height: 52,

    borderRadius: 10,

    borderWidth: 1,

    borderColor: "rgba(0,0,0,0.15)",

    backgroundColor: "#FFFFFF",

    textAlign: "center",

    fontSize: 18,

    fontWeight: "700",

    color: "rgba(17, 17, 17, 0.9)",
  },

  errorText: {
    color: "#B4413C",

    fontSize: 12,

    marginBottom: 10,
  },

  submitButton: {
    backgroundColor: "#28166f",

    borderRadius: 24,

    width: "100%",

    paddingVertical: 15,

    alignItems: "center",
  },

  submitText: {
    color: "#FFFFFF",

    fontWeight: "700",

    fontSize: 13,

    letterSpacing: 0.5,
  },

  resendRow: {
    flexDirection: "row",

    marginTop: 18,
  },

  resendLabel: {
    fontSize: 12,

    color: "rgba(0,0,0,0.5)",
  },

  resendTimer: {
    fontSize: 12,

    color: "rgba(0,0,0,0.4)",
  },

  resendLink: {
    fontSize: 12,

    fontWeight: "700",

    color: "#28166f",
  },
});