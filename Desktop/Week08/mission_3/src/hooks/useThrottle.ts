// useThrottle : 주어진 값(상태)가 자주 변경될 때
// 최소 delay(밀리초) 간격으로만 업데이트해서 성능을 개선한다.

import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number = 500): T {
  // ① 상태 변수: 최종적으로 쓰로틀링이 적용된 값을 저장
  const [throttledValue, setThrottledValue] = useState<T>(value);

  // ② useRef: 마지막으로 실행된 시각을 기록
  //    → 리렌더링이 되어도 값이 유지되고,
  //      값이 바뀌어도 리렌더링을 트리거하지 않음
  const lastExecuted = useRef<number>(Date.now());

  // ③ value 또는 delay가 바뀔 때마다 아래 로직 실행
  useEffect(() => {
    // 현재 시각 vs (마지막 실행 시각 + delay) 비교
    if (Date.now() >= lastExecuted.current + delay) {
      // ✅ delay가 충분히 지났으면 → 바로 업데이트
      lastExecuted.current = Date.now();
      setThrottledValue(value);
    } else {
      // delay가 아직 안 지났으면 → delay 후에 업데이트 예약
      const timerId: number = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      // CleanUp: 다음 이펙트 실행 전에 기존 타이머 취소
      //    → 중복 업데이트 방지
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  // 최종적으로 쓰로틀링이 적용된 값 반환
  return throttledValue;
}

export default useThrottle;