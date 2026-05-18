import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  console.log("리렌더링");

  return (
    <div className="flex flex-col items-center pt-20 gap-4">
      <div className="fixed top-4 bg-black/80 text-white px-4 py-2 rounded-xl z-50">
        scrollY: {scrollY}px
      </div>
      <h1>쓰로틀링이 뭐임</h1>
      <p>스크롤을 내려보세요</p>
      <div className="h-[3000px]" />
    </div>
  );
};

export default ThrottlePage;
