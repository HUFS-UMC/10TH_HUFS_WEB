import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500) {
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // Ref LastExecuted: 마지막으로 업데이트된 시간 저장하는 변수
  const lastExecuted = useRef<number | null>(null);

  useEffect(() => {
    const now = Date.now();

    if (lastExecuted.current === null) {
      lastExecuted.current = now;
      return;
    }

    const elapsed = now - lastExecuted.current;
    const remaining = Math.max(delay - elapsed, 0);

    const timerId = setTimeout(() => {
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    }, remaining);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return throttledValue;
}

export default useThrottle;
