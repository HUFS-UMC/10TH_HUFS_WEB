import axios from "axios";
import { localStorageKey } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";



export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem(localStorageKey.accessToken)}`,
    },
});

axiosInstance.interceptors.request.use((config) => {
    const { getItem } = useLocalStorage(localStorageKey.accessToken);
    const token = getItem();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});