import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGENATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import CreateLpModal from "../components/CreateLpModal";
import { useAuth } from "../context/AuthContext";
import { Plus } from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import { SEARCH_DEBOUNCE_DELAY } from "../constants/delay";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { accessToken } = useAuth();
  const debouncedValue = useDebounce(search, SEARCH_DEBOUNCE_DELAY);

  const {
    data: lps,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteLpList(10, debouncedValue, order);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const handleToggleOrder = () => {
    setOrder((prev) =>
      prev === PAGENATION_ORDER.desc
        ? PAGENATION_ORDER.asc
        : PAGENATION_ORDER.desc,
    );
  };

  return (
    <div>
      <input
        className="border p-4 rounded-sm w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={handleToggleOrder}
          className={`px-3 py-1 rounded text-sm transition ${
            order === PAGENATION_ORDER.asc
              ? "bg-white text-black font-semibold"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          오래된순
        </button>
        <button
          onClick={handleToggleOrder}
          className={`px-3 py-1 rounded text-sm transition ${
            order === PAGENATION_ORDER.desc
              ? "bg-white text-black font-semibold"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
          }`}
        >
          최신순
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {isPending && <LpCardSkeletonList count={10} />}
        {isError && (
          <div className="col-span-full flex flex-col items-center gap-3 py-16 text-gray-400">
            <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
          </div>
        )}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}
        {isFetching && <LpCardSkeletonList count={10} />}
      </div>
      <div ref={ref} className="h-20" />

      {/* + FAB 버튼 */}
      {accessToken && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-8 right-8 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-[#807bff] text-white shadow-lg shadow-[#807bff]/40 hover:bg-[#6b63d9] active:scale-95 transition"
          aria-label="LP 작성"
        >
          <Plus className="w-7 h-7" />
        </button>
      )}

      {isModalOpen && <CreateLpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default HomePage;
