import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLpList } from "../apis/lp";
import type { PaginationOrder } from "../types/common";
import LpCard from "../components/LpCard";
import { LoadingSpinner } from "../components/LodingSpinner";

const Home = () => {
  const [sort, setSort] = useState<PaginationOrder>("desc");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["lps", sort],
    queryFn: () =>
      getLpList({
        order: sort,
        limit: 20,
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
    </section>
  );
};

export default Home;