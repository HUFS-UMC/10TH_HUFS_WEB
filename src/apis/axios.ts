import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

interface CustomInternalAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const getToken = (key: string) => {
  const token = localStorage.getItem(key);

  if (!token) {
    return null;
  }

  return token.replaceAll('"', "");
};

let refreshPromise: Promise<string> | null = null;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken(LOCAL_STORAGE_KEY.accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as CustomInternalAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (originalRequest.url === "/v1/auth/refresh") {
        localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
        localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

        window.location.href = "/login";

        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = getToken(LOCAL_STORAGE_KEY.refreshToken);

          if (!refreshToken) {
            throw new Error("refreshToken이 없습니다.");
          }

          const { data } = await axios.post(
            `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/refresh`,
            {
              refresh: refreshToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          const newAccessToken = data.data.accessToken;
          const newRefreshToken = data.data.refreshToken;

          localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
          localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);

          return newAccessToken;
        })()
          .catch((refreshError) => {
            localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
            localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

            window.location.href = "/login";

            return Promise.reject(refreshError);
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance.request(originalRequest);
      });
    }

    return Promise.reject(error);
  },
);