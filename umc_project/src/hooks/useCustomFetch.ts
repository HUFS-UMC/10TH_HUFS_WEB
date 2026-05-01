import { useState , useEffect } from "react";
import tmdbClient from "../apis/tmdb";

interface UseCustomFetchReturn<T>{
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: string | null;
}
function useCustomFetch<T> (url: string | null):UseCustomFetchReturn<T>{

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect (()=>{
        if (!url) return;
        
        const fetchData = async () =>{
            setIsLoading(true);
            setIsError(false);
            setErrorMessage(null);

            try {
                const response = await tmdbClient.get<T>(url);
                setData(response.data);
            } catch {
                setIsError(true);
                setErrorMessage("데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    },[url]);

    return{
        data,
        isLoading,
        isError,
        errorMessage,    
    }
}

export default useCustomFetch;