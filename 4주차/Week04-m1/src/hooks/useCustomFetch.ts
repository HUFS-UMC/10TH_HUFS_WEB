import { useEffect, useState } from "react";
import axios, { type AxiosRequestConfig } from "axios";

interface UseCustomFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export default function useCustomFetch<T>(
  url: string | null,
  config?: AxiosRequestConfig,
  dependencies: unknown[] = []
): UseCustomFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setIsError(true);
      setErrorMessage("잘못된 요청 주소다.");
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage(null);

      try {
        const response = await axios.get<T>(url, config);
        if (!isMounted) return;
        setData(response.data);
      } catch (error) {
        if (!isMounted) return;

        setIsError(true);

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            setErrorMessage("인증에 실패했다. TMDB 키 설정을 확인해라.");
          } else if (error.response?.status === 404) {
            setErrorMessage("요청한 데이터를 찾을 수 없다.");
          } else {
            setErrorMessage("데이터를 불러오는 중 문제가 발생했다. 잠시 후 다시 시도해라.");
          }
        } else {
          setErrorMessage("알 수 없는 오류가 발생했다.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, ...dependencies]);

  return { data, isLoading, isError, errorMessage };
}