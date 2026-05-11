import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createLpComment,
  deleteLpComment,
  getLpComments,
  getLpDetail,
  updateLpComment,
} from "../apis/lp";
import type { PaginationOrder } from "../types/common";
import type { UpdateCommentPayload } from "../types/lp";
import { useAuth } from "../context/AuthContext";

const LpDetailPage = () => {
const { user } = useAuth();
const myId = user?.id;
  const { lpId } = useParams<{ lpId: string }>();

  const [commentOrder, setCommentOrder] =
    useState<PaginationOrder>("desc");

  const [commentInput, setCommentInput] = useState("");
  const [editingCommentId, setEditingCommentId] =
    useState<number | null>(null);
  const [editInput, setEditInput] = useState("");

  const queryClient = useQueryClient();

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

  const createCommentMutation = useMutation({
    mutationFn: (content: string) =>
      createLpComment(lpId!, {
        content,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId],
      });

      setCommentInput("");
    },

    onError: (error) => {
      console.error(error);
      alert("댓글 작성에 실패했습니다.");
    },
  });

const updateCommentMutation = useMutation({
  mutationFn: ({ commentId, content }: UpdateCommentPayload) =>
    updateLpComment(lpId!, commentId, {
      content,
    }),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["lpComments", lpId],
    });

    setEditingCommentId(null);
    setEditInput("");
  },
});

  const deleteCommentMutation = useMutation({
    mutationFn: (commentId: number) =>
      deleteLpComment(lpId!, commentId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lpComments", lpId],
      });
    },

    onError: (error) => {
      console.error(error);
      alert("댓글 삭제에 실패했습니다.");
    },
  });

  const comments =
    commentsData?.pages.flatMap((page) => page.data.data) ?? [];

  const handleCreateComment = () => {
    const trimmedComment = commentInput.trim();

    if (!trimmedComment) {
      alert("댓글을 입력해주세요.");
      return;
    }

    if (!lpId) {
      alert("LP 정보를 찾을 수 없습니다.");
      return;
    }

    createCommentMutation.mutate(trimmedComment);
  };

  const handleStartEdit = (commentId: number, content: string) => {
    setEditingCommentId(commentId);
    setEditInput(content);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditInput("");
  };

  const handleUpdateComment = (commentId: number) => {
    const trimmedEdit = editInput.trim();

    if (!trimmedEdit) {
      alert("수정할 댓글을 입력해주세요.");
      return;
    }

    updateCommentMutation.mutate({
      commentId,
      content: trimmedEdit,
    });
  };

  const handleDeleteComment = (commentId: number) => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    deleteCommentMutation.mutate(commentId);
  };

  if (isLpLoading) {
    return <div className="text-white">LP 상세 로딩 중...</div>;
  }

  return (
    <section className="text-white">
      <div>
        <h1 className="text-2xl font-bold">
          {lpDetailData?.data.title}
        </h1>

        <p className="mt-3 text-sm text-gray-300">
          {lpDetailData?.data.content}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">댓글</h2>

        <div className="flex gap-2">
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="댓글을 입력해주세요"
            className="flex-1 rounded-md border border-gray-600 bg-neutral-900 px-3 py-2 text-sm text-white outline-none"
          />

          <button
            type="button"
            onClick={handleCreateComment}
            disabled={createCommentMutation.isPending}
            className="rounded-md bg-pink-500 px-4 py-2 text-sm text-white disabled:bg-gray-500"
          >
            {createCommentMutation.isPending ? "작성 중..." : "작성"}
          </button>
        </div>
      </div>

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

      <div className="mt-4 space-y-4">
        {isCommentsLoading && <p>댓글 로딩 중...</p>}

        {isCommentsError && (
          <p className="text-red-400">댓글을 불러오지 못했습니다.</p>
        )}

        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-md bg-neutral-800 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold">
                {comment.author.name}
              </p>

                {comment.author.id === myId && (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(comment.id, comment.content)}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      수정
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deleteCommentMutation.isPending}
                      className="text-sm text-red-400 hover:text-red-300 disabled:text-gray-500"
                    >
                      삭제
                    </button>
                  </div>
                )}
            </div>

            {editingCommentId === comment.id ? (
              <div className="flex gap-2">
                <input
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className="flex-1 rounded-md border border-gray-600 bg-neutral-900 px-3 py-2 text-sm text-white outline-none"
                />

                <button
                  type="button"
                  onClick={() => handleUpdateComment(comment.id)}
                  disabled={updateCommentMutation.isPending}
                  className="rounded-md bg-pink-500 px-3 py-2 text-sm text-white disabled:bg-gray-500"
                >
                  {updateCommentMutation.isPending ? "수정 중" : "완료"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-md bg-gray-600 px-3 py-2 text-sm text-white"
                >
                  취소
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-300">
                {comment.content}
              </p>
            )}
          </div>
        ))}
      </div>

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