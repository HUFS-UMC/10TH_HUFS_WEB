import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import CreateLpModal from "../components/CreateLpModal/CreateLpModal";
import useDebounce from "../hooks/useDebounce";

const HomePage = () => {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300);
  const [order, setOrder] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const [open, setOpen] =
  useState(false);

  const{
    data:lps, 
    isFetching, 
    hasNextPage, 
    isPending, 
    fetchNextPage, 
    isError,
    refetch,
  } = useGetInfiniteLpList(10, debouncedSearch, order);

  //ref, inview
  // ref -> 특정한 HTML 요소를 감시할 수 있다
  // inview -> 그 요소가 화면에 보이면 true
  const { ref, inView } = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inView) {
      if (!isFetching && hasNextPage) {
        fetchNextPage();
      }
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  /* ---------------- error ---------------- */
  if (isError) {
    return (
      <div className="mt-20 text-center">
        <p>에러 발생</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">

      {/* 검색 */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
        placeholder="검색"
      />

      {/* 정렬 버튼 */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className="px-3 py-1 border rounded"
        >
          최신순
        </button>

        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className="px-3 py-1 border rounded"
        >
          오래된순
        </button>
      </div>

      {/* 리스트 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

        {/* 로딩 */}
        {isPending && <LpCardSkeletonList count={20} />}

        {/* 데이터 */}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          // console.log(lps?.pages.map((page) => console.log(page)));
          // [[1, 2][3, 4][5, 6]].flat()  => [1, 2, 3, 4, 5, 6]
          // flat을 쓰면 리스트 안에 리스트를 풀어줌           
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))}

        {/* 추가 로딩 */}
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>

      {/* infinite scroll trigger */}
      <div ref={ref} className="h-2" />

      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-pink-500 text-white text-3xl shadow-lg"
      >
        +
      </button>

      {/* 모달 */}
      {open && (
        <CreateLpModal
          onClose={() => setOpen(false)}
        />
      )}      
    </div>
  );
};



export default HomePage;