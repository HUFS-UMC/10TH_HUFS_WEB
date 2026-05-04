import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import useGetLpDetail from "../hooks/queries/useGetLpDetail.ts";
import useGetInfiniteLpComments from "../hooks/queries/useGetInfiniteLpComments.ts";
import { PAGINATION_ORDER } from "../enums/common.ts";
import type { PaginationOrder } from "../enums/common.ts";
import type { LpComment } from "../types/comment.ts";
import CommentItem from "../components/Comment/CommentItem.tsx";
import CommentSkeletonList from "../components/Comment/CommentSkeletonList.tsx";

const LpDetailPage = () => {
  const { lpid } = useParams();

  const [commentOrder, setCommentOrder] = useState<PaginationOrder>(
    PAGINATION_ORDER.asc,
  );

  const {
    data: lp,
    isPending: isLpPending,
    isError: isLpError,
    refetch: refetchLp,
  } = useGetLpDetail(lpid);

  const {
    data: comments,
    isPending: isCommentsPending,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isError: isCommentsError,
    refetch: refetchComments,
  } = useGetInfiniteLpComments(lpid, 10, commentOrder);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (isLpPending) {
    return (
      <div className="min-h-dvh bg-black px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl animate-pulse rounded-xl bg-gray-800 p-8">
          <div className="h-6 w-40 rounded bg-gray-600" />
          <div className="mx-auto mt-8 h-80 w-80 rounded bg-gray-600" />
          <div className="mt-8 h-4 w-full rounded bg-gray-600" />
          <div className="mt-3 h-4 w-2/3 rounded bg-gray-600" />
        </div>
      </div>
    );
  }

  if (isLpError || !lp) {
    return (
      <div className="min-h-dvh bg-black px-4 py-10 text-white">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-xl bg-gray-800 p-8">
          <p>LP 상세 정보를 불러오지 못했습니다.</p>

          <button
            type="button"
            onClick={() => refetchLp()}
            className="rounded-md bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const createdDate = new Date(lp.createdAt).toLocaleDateString();

  const commentList: LpComment[] =
    comments?.pages
      .map((page) => page.data.data)
      .flat() ?? [];

  const handleOldestClick = () => {
    setCommentOrder(PAGINATION_ORDER.asc);
  };

  const handleNewestClick = () => {
    setCommentOrder(PAGINATION_ORDER.desc);
  };

  return (
    <div className="min-h-dvh bg-black px-4 py-10 text-white">
      <section className="mx-auto max-w-3xl rounded-xl bg-gray-800 p-6 md:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {lp.author?.avatar ? (
              <img
                src={lp.author.avatar}
                alt={lp.author.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-200 text-sm text-gray-900">
                👤
              </div>
            )}

            <div>
              <p className="font-semibold">
                {lp.author?.name ?? `작성자 ${lp.authorId}`}
              </p>
              <p className="text-xs text-gray-400">{createdDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xl">
            <button type="button" className="hover:text-pink-400">
              ✎
            </button>
            <button type="button" className="hover:text-pink-400">
              🗑
            </button>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-bold">{lp.title}</h1>

        <div className="mt-8 flex justify-center">
          <div className="relative flex h-80 w-80 items-center justify-center rounded-lg bg-gray-900 shadow-2xl">
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="h-72 w-72 rounded-full border-4 border-black object-cover"
            />

            <div className="absolute h-20 w-20 rounded-full bg-white" />
          </div>
        </div>

        <p className="mt-8 whitespace-pre-line text-sm leading-7 text-gray-200">
          {lp.content}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {lp.tags.map((tag) => (
            <span
              key={tag.id}
              className="rounded-full bg-gray-700 px-3 py-1 text-sm text-gray-200"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-2xl">
          <button type="button" className="text-pink-400 hover:scale-110">
            ♥
          </button>
          <span>{lp.likes.length}</span>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold">댓글</h2>

            <div className="flex">
              <button
                type="button"
                onClick={handleOldestClick}
                className={`rounded-l-md border px-3 py-2 text-sm ${
                  commentOrder === PAGINATION_ORDER.asc
                    ? "border-white bg-white text-black"
                    : "border-gray-600 bg-transparent text-white hover:bg-gray-700"
                }`}
              >
                오래된순
              </button>

              <button
                type="button"
                onClick={handleNewestClick}
                className={`rounded-r-md border px-3 py-2 text-sm ${
                  commentOrder === PAGINATION_ORDER.desc
                    ? "border-white bg-white text-black"
                    : "border-gray-600 bg-transparent text-white hover:bg-gray-700"
                }`}
              >
                최신순
              </button>
            </div>
          </div>

          <div className="mb-6 flex gap-2">
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              className="flex-1 rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-pink-500 focus:outline-none"
            />

            <button
              type="button"
              className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500"
            >
              작성
            </button>
          </div>

          <p className="mb-4 text-xs text-gray-400">
            댓글 작성 기능은 UI만 구현되어 있습니다.
          </p>

          {isCommentsError && (
            <div className="mb-4 flex items-center justify-between rounded-md bg-red-950 p-4 text-sm">
              <span>댓글을 불러오지 못했습니다.</span>

              <button
                type="button"
                onClick={() => refetchComments()}
                className="rounded bg-red-500 px-3 py-1 text-white"
              >
                다시 시도
              </button>
            </div>
          )}

          <div>
            {isCommentsPending && <CommentSkeletonList count={10} />}

            {!isCommentsPending &&
              commentList.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}

            {!isCommentsPending && commentList.length === 0 && (
              <p className="py-6 text-center text-gray-400">
                아직 댓글이 없습니다.
              </p>
            )}

            {!isCommentsPending && isFetchingNextPage && (
              <CommentSkeletonList count={5} />
            )}

            <div ref={ref} className="h-4" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LpDetailPage;