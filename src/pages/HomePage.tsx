import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import useDebounce from "../hooks/useDebounce.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import type { PaginationOrder } from "../enums/common.ts";
import type { Lp, ResponseLpListDto } from "../types/lp.ts";

import LpCard from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PaginationOrder>(PAGINATION_ORDER.asc);

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: lps,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useGetInfiniteLpList(10, debouncedSearch, order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const lpList: Lp[] =
    lps?.pages
      .map((page: ResponseLpListDto) => page.data.data)
      .flat() ?? [];

  const handleOldestClick = () => {
    setOrder(PAGINATION_ORDER.asc);
  };

  const handleNewestClick = () => {
    setOrder(PAGINATION_ORDER.desc);
  };

  if (isError) {
    return (
      <div className="min-h-dvh bg-[#020617] px-4 py-10 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 rounded-xl bg-gray-800 p-8">
          <p>LP 목록을 불러오지 못했습니다.</p>

          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[#020617] px-4 py-8 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            placeholder="검색어를 입력하세요"
            className="w-full rounded-md border border-gray-700 bg-[#111827] px-4 py-3 text-white placeholder:text-gray-400 focus:border-pink-500 focus:outline-none md:max-w-md"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleOldestClick}
              className={`rounded-l-md border px-4 py-2 text-sm ${
                order === PAGINATION_ORDER.asc
                  ? "border-white bg-white text-black"
                  : "border-gray-600 bg-transparent text-white hover:bg-gray-800"
              }`}
            >
              오래된순
            </button>

            <button
              type="button"
              onClick={handleNewestClick}
              className={`rounded-r-md border px-4 py-2 text-sm ${
                order === PAGINATION_ORDER.desc
                  ? "border-white bg-white text-black"
                  : "border-gray-600 bg-transparent text-white hover:bg-gray-800"
              }`}
            >
              최신순
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isPending && <LpCardSkeletonList count={12} />}

          {!isPending &&
            lpList.map((lp: Lp) => <LpCard key={lp.id} lp={lp} />)}

          {!isPending && isFetchingNextPage && (
            <LpCardSkeletonList count={8} />
          )}
        </div>

        {!isPending && lpList.length === 0 && (
          <p className="py-20 text-center text-gray-400">
            검색 결과가 없습니다.
          </p>
        )}

        <div ref={ref} className="h-10" />
      </div>
    </div>
  );
};

export default HomePage;