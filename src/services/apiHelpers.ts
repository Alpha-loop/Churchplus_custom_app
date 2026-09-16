import { AxiosRequestConfig } from "axios";

import { api } from "./apiClient";

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response =
    await api.get<T>(
      url,
      config
    );

  return response.data;
}

export async function apiPost<
  T
>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response =
    await api.post<T>(
      url,
      data,
      config
    );

  return response.data;
}

export async function apiPut<T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> {
  const response =
    await api.put<T>(
      url,
      data,
      config
    );

  return response.data;
}

export async function apiDelete<
  T
>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const response =
    await api.delete<T>(
      url,
      config
    );

  return response.data;
}