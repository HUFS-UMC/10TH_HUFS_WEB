import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value:T, interval: number =300):T{
    const [throttledValue, setThrottledValue] = useState<T>(value);
    const lastExecutedTime = useRef<number>(Date.now());
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    const elapsedTime = now - lastExecutedTime.current;
    const remainingTime = interval - elapsedTime;

    if (remainingTime <= 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      setThrottledValue(value);
      lastExecutedTime.current = now;
      return;
    }

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setThrottledValue(value);
      lastExecutedTime.current = Date.now();
      timerRef.current = null;
    }, remainingTime);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, interval]);

  return throttledValue;
}