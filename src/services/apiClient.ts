import axios from "axios";

import { useAuthStore } from "../store/authStore";

const API_URL =
  process.env.EXPO_PUBLIC_API_URL;

export const api =
  axios.create({
    baseURL: API_URL,

    timeout: 30000,

    headers: {
      Accept:
        "application/json",

      "Content-Type":
        "application/json",
    },
  });

api.interceptors.request.use(
  async config => {
    const token =
      useAuthStore
        .getState()
        .accessToken;

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  error =>
    Promise.reject(error)
);

api.interceptors.response.use(
  response => response,

  async error => {
    const status =
      error?.response?.status;

    if (status === 401) {
      useAuthStore
        .getState()
        .clearAuth();

      /**
       * TODO:
       * Navigate to login
       */
    }

    return Promise.reject(
      error
    );
  }
);