import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  TextInput,
} from "react-native";

import {
  verifyOtp,
} from "../services/auth.service";

import {
  useAuthStore,
} from "@/store/authStore";

export default function useVerifyOtp(
  signupData: any,
  navigation: any
) {
  const inputs =
    useRef<TextInput[]>(
      []
    );

  const [
    otpArray,
    setOtpArray,
  ] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const [
    timer,
    setTimer,
  ] = useState(30);

  const otp =
    otpArray.join("");

  const setAuth =
    useAuthStore(
        state => state.setAuth
    );

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer === 0)
      return;

    const interval =
      setInterval(() => {
        setTimer(
          prev =>
            prev - 1
        );
      }, 1000);

    return () =>
      clearInterval(
        interval
      );
  }, [timer]);

  const handleChange =
    (
      text: string,
      index: number
    ) => {
      setError("");

      const updated =
        [...otpArray];

      updated[index] =
        text;

      setOtpArray(
        updated
      );

      if (
        text &&
        index < 5
      ) {
        inputs.current[
          index + 1
        ]?.focus();
      }
    };

  const handleVerify =
    async () => {
      try {
        if (
          otp.length < 6
        ) {
          setError(
            "Enter complete OTP"
          );

          return;
        }

        setLoading(
          true
        );

          const payload = {
            ...signupData,
            activationCode: otp,
            };

            console.log(
            "VERIFY REQUEST:",
            JSON.stringify(
                payload,
                null,
                2
            )
            );

            const response =
            await verifyOtp(
                payload
            );

            console.log(
            "VERIFY RESPONSE:",
            JSON.stringify(
                response,
                null,
                2
            )
            );

        console.log(
        "VERIFY RESPONSE:",
        response
        );

        const userData =
        response.object;

        setAuth({
        accessToken:
            userData.token,

        user:
            userData,
        });

        console.log(
        "AUTH USER SAVED:",
        userData
        );

        navigation.replace(
        "Main"
        );
      } catch (error: any) {
        console.log(
            "VERIFY STATUS:",
            error?.response?.status
        );

        console.log(
            "VERIFY ERROR:",
            JSON.stringify(
            error?.response?.data,
            null,
            2
            )
        );

        setError(
            error?.response?.data
            ?.message ||
            "Invalid OTP"
        );
        } finally {
        setLoading(
          false
        );
      }
    };

  return {
    inputs,

    otpArray,

    handleChange,

    handleVerify,

    loading,

    setError,

    error,

    timer,
  };
}