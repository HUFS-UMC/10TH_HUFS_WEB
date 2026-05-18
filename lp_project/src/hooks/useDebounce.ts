import {useEffect, useState} from "react";

export function useDebounce<T>(value:T, duration: number=300):T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    //debounce
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDebouncedValue(value);
        }, duration);
        return ()=>{
            clearTimeout(timer);
        };
    }, [value, duration]);
    
    return debouncedValue;

}