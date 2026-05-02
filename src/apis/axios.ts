import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);

  if (accessToken) {
    const normalizedAccessToken =
      accessToken.startsWith('"') && accessToken.endsWith('"')
        ? accessToken.slice(1, -1)
        : accessToken;

    config.headers.Authorization = `Bearer ${normalizedAccessToken}`;
  }

  return config;
});