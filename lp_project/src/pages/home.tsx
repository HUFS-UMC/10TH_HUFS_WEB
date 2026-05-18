import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import type { PaginationOrder } from "../types/common";
import LpCard from "../components/LpCard";
import {LoadingSpinner} from "../components/LoadingSpinner";
import { useThrottle } from "../hooks/useThrottle";

const Home = () => {
  const [sort, setSort] = useState<PaginationOrder>("desc");
  const [scrollY, setScrollY] =useState(0);

  const throttledScrollY = useThrottle(scrollY, 3000);
  useEffect(()=>{
    const handleScroll = ()=>{
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return ()=>{
      window.removeEventListener("scroll", handleScroll);
    }
  },[])

  const { 
      data,
      isLoading,
      isError,
      error,
      refetch,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lps", sort],
    queryFn: ({pageParam}) =>
      getLpList({
        order: sort,
        limit: 20,
        cursor: pageParam,
      }),
      initialPageParam:0,
      getNextPageParam: (lastPage)=>{
        return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
      },
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
  });
  
    useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollTop = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isNearBottom = scrollTop + viewportHeight >= documentHeight - 200;

    if (isNearBottom) {
      fetchNextPage();
    }
  }, [throttledScrollY, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
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

  const lpList = data?.pages.flatMap((page)=>page.data.data) ?? [];

  return (
    <section>
      <div className="mb-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setSort("desc")}
          className={`rounded-md border px-4 py-2 ${
            sort === "desc"
              ? "bg-white text-black"
              : "border-white text-white"
          }`}
        >
          최신순
        </button>

        <button
          type="button"
          onClick={() => setSort("asc")}
          className={`rounded-md border px-4 py-2 ${
            sort === "asc"
              ? "bg-white text-black"
              : "border-white text-white"
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
      <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        className="rounded-md bg-pink-500 px-4 py-2 text-white disabled:bg-gray-500"
      >
        {isFetchingNextPage
          ? "불러오는 중..."
          : hasNextPage
            ? "더보기"
            : "더 이상 없음"}
      </button>
</div>
    </section>
  );
};

export default Home;