import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList";
import { useEffect, useState } from "react";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import { useInView } from "react-intersection-observer";

const LpDetailPage = () => {
  const { lpid } = useParams();
  
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lp", lpid],
    queryFn: () => getLpDetail(Number(lpid)),
    enabled: !!lpid,

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,     

  });

  const [order, setOrder] = useState<"asc" | "desc">(
    "desc"
  );

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
  } = useGetInfiniteComments(Number(lpid), order);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [
    inView,
    hasNextPage,
    isFetching,
    fetchNextPage,
  ]);  

  /* ---------------- loading ---------------- */
  if (isLoading) {
    return <div className="mt-20 text-center">로딩중...</div>;
  }

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

  const lp = data?.data;

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-2">
        {lp?.title}
      </h1>

      {/* 메타 정보 */}
      <div className="text-sm text-gray-500 mb-4">
        <span>좋아요 ❤️ {lp?.likes}</span>
        <span className="ml-4">
          {lp?.createdAt}
        </span>
      </div>

      {/* 썸네일 */}
      {lp?.thumbnail && (
        <img
          src={lp.thumbnail}
          className="w-full rounded mb-4"
        />
      )}

      {/* 본문 */}
      <div className="text-base leading-6 whitespace-pre-line">
        {lp?.content}
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-2 mt-6">
        <button className="px-4 py-2 bg-yellow-500 text-white rounded">
          수정
        </button>

        <button className="px-4 py-2 bg-red-500 text-white rounded">
          삭제
        </button>

        <button className="px-4 py-2 bg-pink-500 text-white rounded">
          좋아요
        </button>
      </div>

      {/* 댓글 영역 */}
      <div className="mt-10">

        <h2 className="text-xl font-bold mb-4">
          댓글
        </h2>

        {/* 정렬 */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setOrder("desc")}
            className="px-3 py-1 border rounded"
          >
            최신순
          </button>

          <button
            onClick={() => setOrder("asc")}
            className="px-3 py-1 border rounded"
          >
            오래된순
          </button>
        </div>

        {/* 댓글 작성 UI */}
        <div className="border rounded p-4 mb-6">
          <textarea
            placeholder="댓글을 입력해주세요"
            className="w-full border rounded p-2"
          />

          <p className="text-sm text-gray-500 mt-2">
            댓글은 1자 이상 입력해주세요.
          </p>

          <button className="mt-3 px-4 py-2 bg-pink-500 text-white rounded">
            작성
          </button>
        </div>

        {/* 초기 로딩 */}
        {isPending && (
          <CommentSkeletonList count={5} />
        )}

        {/* 댓글 목록 */}
        {comments?.pages
          ?.flatMap((page) => page.data)
          ?.map((comment) => (
            <div
              key={comment.id}
              className="border-b py-4"
            >
              <p className="font-semibold">
                {comment.author.name}
              </p>

              <p>{comment.content}</p>
            </div>
          ))}

        {/* 추가 로딩 */}
        {isFetchingNextPage && (
          <CommentSkeletonList count={3} />
        )}

        <div ref={ref} className="h-2" />
      </div>


    </div>
  );
};

export default LpDetailPage;