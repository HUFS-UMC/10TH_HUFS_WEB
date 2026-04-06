// src/hooks/useLocalStorage.ts
import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  // 1. 초기값 설정 로직 (로컬스토리지에 데이터가 있으면 가져오고, 없으면 초기값 사용)
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("로컬 스토리지 읽기 에러:", error);
      return initialValue;
    }
  });

  // 2. 값을 업데이트하고 로컬스토리지에도 저장하는 함수
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // 함수형 업데이트 대응 (prev => ...)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("로컬 스토리지 저장 에러:", error);
    }
  };

  return [storedValue, setValue] as const;
}