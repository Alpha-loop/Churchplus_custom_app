import { api } from "../../../services/apiClient";

import {
  LoginRequest,
  LoginResponse,
} from "../types/auth.types";

// export const login =
//   async (
//     data: LoginRequest
//   ): Promise<LoginResponse> => {
//     const response =
//       await api.post<LoginResponse>(
//         "/api/portal/MobileAuth/login",
//         data
//       );

//     return response.data;
//   };

export const login = async (data: {
  username: string;
  password: string;
}) => {
  console.log(
    "LOGIN REQUEST:",
    JSON.stringify(data, null, 2)
  );

  const response = await api.post(
    "/portal/MobileAuth/login",
    data
  );

  console.log(
    "LOGIN RESPONSE:",
    JSON.stringify(response.data, null, 2)
  );

  return response.data;
};

export const initialSignup =
  async (data: any) => {
    const response =
      await api.post(
        "/portal/MobileOnboarding/initial-signup",
        data
      );

    console.log(
      "SIGNUP RESPONSE:",
      JSON.stringify(
        response.data,
        null,
        2
      )
    );

    return response.data;
  };

export const verifyOtp =
  async (data: any) => {
    const response =
      await api.post(
        "/portal/MobileOnboarding/confirm-otp",
        data
      );

    return response.data;
  };