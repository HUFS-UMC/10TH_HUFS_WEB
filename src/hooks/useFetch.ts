import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const optionsString = JSON.stringify(options);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const {data} = await axiosClient.get(url, {
                    ...options,
                });

                setData(data);
            } catch {
                setError("데이터를 가져오는데 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    },[url, optionsString]);

    return {
        data, error, isLoading
    };
};

export default useFetch;