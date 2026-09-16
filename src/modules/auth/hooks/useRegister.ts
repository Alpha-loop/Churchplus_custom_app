import { useState } from "react";

import { initialSignup } from "../services/auth.service";
import { useChurchStore } from "@/store/churchStore";

export default function useRegister() {
  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const tenantId = useChurchStore(
    state => state.tenantId
  );

  const handleRegister =
    async (
      onSuccess?: (
        response: any
      ) => void
    ) => {
      try {
        setError("");

        if (!firstName.trim()) {
          setError(
            "First name is required"
          );
          return;
        }
        if (!lastName.trim()) {
          setError(
            "Last name is required"
          );
          return;
        }

        if (!password.trim()) {
          setError(
            "Password is required"
          );
          return;
        }

        setLoading(true);

        const payload = {
          tenantId,
          
          firstName,

          lastName,

          email,

          password,

          channel: 0,
        };

        console.log(
          "SIGNUP REQUEST:",
          JSON.stringify(
            payload,
            null,
            2
          )
        );

        const response =
          await initialSignup(
            payload
          );

        console.log(
          "SIGNUP RESPONSE:",
          JSON.stringify(
            response,
            null,
            2
          )
        );

        onSuccess?.(
          response
        );
      } catch (err: any) {
        console.log(
          "SIGNUP ERROR:",
          err?.response?.data ||
            err
        );

        setError(
          err?.response?.data
            ?.message ||
            "Registration failed"
        );
      } finally {
        setLoading(false);
      }
    };

  return {
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

    setError,

    handleRegister,
  };
}