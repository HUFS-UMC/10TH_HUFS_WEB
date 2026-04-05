import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

interface UseCustomFetchReturn<T> {
  data: T | null;
  isPending: boolean;
  isError: boolean;
  error: AxiosError | null;
}

export const useCustomFetch = <T,>(
  url: string
): UseCustomFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (!url) {
      setIsPending(false);
      return;
    }

    const fetchData = async () => {
      try {
        setIsPending(true);
        setIsError(false);
        setError(null);

        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            'Content-Type': 'application/json;charset=utf-8'
          }
        });

        setData(response.data);
      } catch (err) {
        setIsError(true);
        if (err instanceof AxiosError) {
          setError(err);
        }
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError, error };
};
