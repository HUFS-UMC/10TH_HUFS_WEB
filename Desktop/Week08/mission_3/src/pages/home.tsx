import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import type { PaginationOrder } from "../types/common";
import LpCard from "../components/LpCard";
import { LoadingSpinner } from "../components/LodingSpinner";
import useDebounce from "../\bhooks/useDebounce";
import useThrottle from "../\bhooks/useThrottle";

const Home = () => {
  const [sort, setSort] = useState<PaginationOrder>("desc");
  const [search, setSearch] = useState<string>("");
  const debouncedValue = useDebounce(search, 300);

  // ── useThrottle: 스크롤 위치를 1초에 한 번만 업데이트 ──
  const [scrollY, setScrollY] = useState<number>(0);
  const throttledScrollY = useThrottle(scrollY, 1000);

  // 스크롤 이벤트 등록 / 언마운트 시 정리
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // throttledScrollY가 바뀔 때만 실행 → 콘솔에 1초 간격으로만 찍힘
  useEffect(() => {
    console.log("[쓰로틀] 현재 스크롤 위치:", throttledScrollY);
  }, [throttledScrollY]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["lps", sort, debouncedValue],
    queryFn: () =>
      getLpList({
        order: sort,
        limit: 20,
        search: debouncedValue,
      }),
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <div className="mt-20 text-center text-white">
        <p className="mb-4">LP 목록을 불러오지 못했습니다.</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const lpList = data?.data.data ?? [];

  return (
    <section>
      {/* 검색창 */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="LP를 검색하세요..."
          className="w-full rounded-md border border-white bg-transparent px-4 py-2 text-white placeholder-gray-400 outline-none focus:border-pink-500"
        />
      </div>

      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setSort("desc")}
          className={`rounded-md border px-4 py-2 ${
            sort === "desc" ? "bg-white text-black" : "border-white text-white"
          }`}
        >
          최신순
        </button>
        <button
          type="button"
          onClick={() => setSort("asc")}
          className={`rounded-md border px-4 py-2 ${
            sort === "asc" ? "bg-white text-black" : "border-white text-white"
          }`}
        >
          오래된순
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {lpList.map((lp) => (
          <LpCard key={lp.id} lp={lp} />
        ))}
      </div>
    </section>
  );
};

export default Home;