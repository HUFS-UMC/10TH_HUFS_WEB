import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    //delay 시간 후에 value를 debounce로 업데이트하는 타이머 실행
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    //value가 변경되면 기존 타이머를 지워서 업데이트를 취소
    // 값이 바뀔 때마다 타이머가 리셋되므로 delay 시간 이후에 마지막으로 변경된 value만 debounce로 업데이트됨
    return () => clearTimeout(handler);
  }, [value, delay]);

  // debouncedValue는 delay 시간 이후에 value로 업데이트됨
  return debouncedValue;
}

export default useDebounce;
