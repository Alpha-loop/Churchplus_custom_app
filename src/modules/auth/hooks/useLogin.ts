import { useState } from "react";

import {
  login,
} from "../services/auth.service";

import {
  useAuthStore,
} from "../../../store/authStore";

export default function useLogin() {
  const [
    loading,
    setLoading,
  ] = useState(false);

  const setAuth =
    useAuthStore(
      state =>
        state.setAuth
    );

  const handleLogin =
  async (
    username: string,
    password: string
  ) => {
    try {
      setLoading(true);

      const response =
        await login({
          username,
          password,
        });

      console.log(
        "LOGIN RESPONSE:",
        JSON.stringify(
          response,
          null,
          2
        )
      );

      const userData =
        response.object;

      setAuth({
        accessToken:
          userData.token,

        refreshToken: undefined,

        

        user: userData,
      });

      console.log(
        "AUTH USER:",
        JSON.stringify(
          userData,
          null,
          2
        )
      );

      return userData;
    } catch (error: any) {
      console.log(
        "LOGIN ERROR:",
        error?.response?.data
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLogin,
  };
}