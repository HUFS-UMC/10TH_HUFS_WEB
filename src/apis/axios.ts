import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import type { AxiosInstance } from "axios";

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE_KEY.accessToken)}`,
  },
});