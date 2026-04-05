import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';


interface UseCustomFetchReturn<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    error: AxiosError | null;
}

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        language: 'ko-KR',
        api_key: import.meta.env.VITE_TMDB_API_KEY 
    }
});

const useCustomFetch = <T>(url: string, params?: object): UseCustomFetchReturn<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setIsError(false);
            setError(null);

            try {
                const response = await api.get<T>(url, { params });
                setData(response.data);
            } catch (err) {
                setIsError(true);
                if (axios.isAxiosError(err)) {
                    setError(err);
                }
                console.error("API Fetch Error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url, JSON.stringify(params)]);

    return { data, isLoading, isError, error };
};

export default useCustomFetch;