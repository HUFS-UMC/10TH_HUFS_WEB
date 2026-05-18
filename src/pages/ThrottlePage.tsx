import { useEffect, useState } from "react";

import useThrottle from "../hooks/useThrottle.ts";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const throttledScrollY = useThrottle(scrollY, 2000);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log("리렌더링");

  return (
    <div className="flex min-h-[300vh] flex-col items-center justify-center bg-[#020617] text-white">
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gray-800 p-8 text-center shadow-xl">
        <h1 className="mb-4 text-2xl font-bold">쓰로틀링이 무엇일까요?</h1>
        <p className="text-lg">ScrollY : {throttledScrollY}px</p>
      </div>
    </div>
  );
};

export default ThrottlePage;