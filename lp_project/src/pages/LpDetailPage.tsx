import { useState } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getLpComments, getLpDetail } from "../apis/lp";
import type { PaginationOrder } from "../types/common";

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();

  const [commentOrder, setCommentOrder] =
    useState<PaginationOrder>("desc");

  const { data: lpDetailData, isLoading: isLpLoading } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => getLpDetail(lpId!),
    enabled: !!lpId,
  });

  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    isError: isCommentsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["lpComments", lpId, commentOrder],
    queryFn: ({ pageParam }) =>
      getLpComments(lpId!, {
        order: commentOrder,
        limit: 10,
        cursor: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext
        ? lastPage.data.nextCursor
        : undefined;
    },
    enabled: !!lpId,
  });

  const comments =
    commentsData?.pages.flatMap((page) => page.data.data) ?? [];

  if (isLpLoading) {
    return <div className="text-white">LP 상세 로딩 중...</div>;
  }

  return (
    <section className="text-white">
      {/* LP 상세 정보 */}
      <div>
        <h1>{lpDetailData?.data.title}</h1>
        <p>{lpDetailData?.data.content}</p>
      </div>

      {/* 댓글 정렬 버튼 */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setCommentOrder("desc")}
          className={`rounded-md border px-3 py-1 ${
            commentOrder === "desc"
              ? "bg-white text-black"
              : "border-white text-white"
          }`}
        >
          최신순
        </button>

        <button
          type="button"
          onClick={() => setCommentOrder("asc")}
          className={`rounded-md border px-3 py-1 ${
            commentOrder === "asc"
              ? "bg-white text-black"
              : "border-white text-white"
          }`}
        >
          오래된순
        </button>
      </div>

      {/* 댓글 목록 */}
      <div className="mt-4 space-y-4">
        {isCommentsLoading && <p>댓글 로딩 중...</p>}

        {isCommentsError && <p>댓글을 불러오지 못했습니다.</p>}

        {comments.map((comment) => (
          <div key={comment.id} className="rounded-md bg-neutral-800 p-4">
            <p className="font-semibold">{comment.author.name}</p>
            <p className="text-sm text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* 일단 테스트용 더보기 버튼 */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="rounded-md bg-pink-500 px-4 py-2 text-white disabled:bg-gray-500"
        >
          {isFetchingNextPage
            ? "불러오는 중..."
            : hasNextPage
              ? "댓글 더보기"
              : "더 이상 댓글 없음"}
        </button>
      </div>
    </section>
  );
};

export default LpDetailPage;