import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig
): {
  data: T | null;
  error: string | null;
  isLoading: boolean;
} => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);

      try {
        const { data } = await axiosClient.get<T>(url, options);

        setData(data);
        setError(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("status:", error.response?.status);
          console.log("data:", error.response?.data);
        }

        setError("데이터를 가져오는데 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;