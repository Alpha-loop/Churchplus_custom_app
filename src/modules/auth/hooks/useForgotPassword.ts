import { useState } from "react";

export default function useForgotPassword() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleResetPassword =
    async (
      onSuccess?: () => void
    ) => {
      if (!email.trim()) {
        setError(
          "Please enter your email address"
        );

        return;
      }

      try {
        setLoading(true);

        /**
         * API call later
         */

        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              1000
            )
        );

        onSuccess?.();
      } catch {
        setError(
          "Unable to process request"
        );
      } finally {
        setLoading(false);
      }
    };

  return {
    email,
    setEmail,

    loading,

    error,
    setError,

    handleResetPassword,
  };
}