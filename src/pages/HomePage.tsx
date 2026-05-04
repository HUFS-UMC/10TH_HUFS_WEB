import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common.ts";

const HomePage = () => {
  const [search, setSearch] = useState("");

  const { data, isPending, isError } = useGetLpList({
    cursor: 0,
    limit: 10,
    search,
    order: PAGINATION_ORDER.desc,
  });

  if (isPending) {
    return <div className="mt-20">Loading...</div>;
  }

  if (isError) {
    return <div className="mt-20">Error...</div>;
  }

  return (
    <div className="mt-20 px-6">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력하세요"
        className="border border-gray-300 rounded-md p-2 w-full mb-6"
      />

      <div className="flex flex-col gap-4">
        {data?.map((lp) => (
          <div key={lp.id} className="border p-4 rounded-md">
            <h1 className="text-xl font-bold">{lp.title}</h1>
            <p className="text-gray-600">{lp.content}</p>

            {lp.thumbnail && (
              <img
                src={lp.thumbnail}
                alt={lp.title}
                className="w-40 h-40 object-cover mt-2"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;