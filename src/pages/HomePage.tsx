import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import type { PaginationOrder } from "../enums/common.ts";
import type { Lp } from "../types/lp.ts";
import LpCard from "../components/LpCard/LpCard.tsx";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList.tsx";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PaginationOrder>(PAGINATION_ORDER.desc);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
    refetch,
  } = useGetInfiniteLpList(10, search, order);

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
      .map((page) => page.data.data)
      .flat() ?? [];

  const handleOldestClick = () => {
    setOrder(PAGINATION_ORDER.asc);
  };

  const handleNewestClick = () => {
    setOrder(PAGINATION_ORDER.desc);
  };

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-4 text-white">
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
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="w-full rounded-md border border-gray-700 bg-[#111827] p-3 text-white placeholder:text-gray-400 focus:border-pink-500 focus:outline-none md:max-w-md"
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

      <div
        className="
          grid grid-cols-1
          gap-4
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        "
      >
        {isPending && <LpCardSkeletonList count={12} />}

        {!isPending &&
          lpList.map((lp) => <LpCard key={lp.id} lp={lp} />)}

        {!isPending && isFetching && <LpCardSkeletonList count={8} />}
      </div>

      {!isPending && lpList.length === 0 && (
        <div className="mt-10 text-center text-gray-400">
          조회된 LP가 없습니다.
        </div>
      )}

      <div ref={ref} className="h-2" />
    </div>
  );
};

export default HomePage;