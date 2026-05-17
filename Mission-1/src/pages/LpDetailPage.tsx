import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";
import { queryClient } from "../App";
import { QUERY_KEY } from "../constants/key";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart, MoreVertical, Pencil, Trash2 } from "lucide-react";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useGetInfiniteComments from "../hooks/queries/useGetInfiniteComments";
import useCreateComment from "../hooks/mutations/useCreateComment";
import useUpdateComment from "../hooks/mutations/useUpdateComment";
import useDeleteComment from "../hooks/mutations/useDeleteComment";
import useDeleteLp from "../hooks/mutations/useDeleteLp";
import EditLpModal from "../components/EditLpModal";
import { CommentSkeletonList } from "../components/Comment/CommentSkeleton";
import { PAGENATION_ORDER } from "../enums/common";
import type { Comment } from "../types/comment";

function formatRelativeDate(date: Date | string) {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}

const LpDetailPage = () => {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = Number(lpid);
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const { data, isPending, isError, refetch } = useGetLpDetail({ lpId });
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutate: deleteLp, isPending: isDeleting } = useDeleteLp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 댓글 정렬
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);

  // useInfiniteQuery로 댓글 조회
  const {
    data: commentsData,
    isPending: isCommentsPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetInfiniteComments(lpId, order);

  const { ref: commentBottomRef, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { mutate: createComment, isPending: isCreating } = useCreateComment(lpId);
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment(lpId);
  const { mutate: deleteComment } = useDeleteComment(lpId);

  const [commentInput, setCommentInput] = useState("");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editInput, setEditInput] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isSubmittingRef = useRef(false);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isLiked = data?.data.likes.some((like) => like.userId === me?.data.id);
  const isAuthor = !!me?.data.id && data?.data.authorId === me.data.id;

  const handleDeleteLp = () => {
    if (!confirm("정말 이 LP를 삭제하시겠습니까?")) return;
    deleteLp({ lpId }, { onSuccess: () => navigate("/") });
  };

  const handleCreateComment = () => {
    if (!commentInput.trim() || isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    createComment(
      { lpId, content: commentInput.trim() },
      {
        onSuccess: () => setCommentInput(""),
        onSettled: () => { isSubmittingRef.current = false; },
      },
    );
  };

  const handleStartEdit = (comment: Comment) => {
    setEditingComment(comment);
    setEditInput(comment.content);
    setOpenMenuId(null);
  };

  const handleUpdateComment = () => {
    if (!editingComment || !editInput.trim()) return;
    updateComment(
      { lpId, commentId: editingComment.id, content: editInput.trim() },
      { onSuccess: () => setEditingComment(null) },
    );
  };

  const handleDeleteComment = (commentId: number) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;
    deleteComment({ lpId, commentId });
    setOpenMenuId(null);
  };

  if (isPending) {
    return (
      <div className="max-w-lg mx-auto grid grid-cols-1 gap-4 p-4">
        <LpCardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-gray-400">
        <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        <button
          onClick={() => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId] });
            refetch();
          }}
          className="px-4 py-2 bg-white/10 rounded hover:bg-white/20 text-white text-sm transition"
        >
          다시 시도
        </button>
      </div>
    );
  }

  const lp = data?.data;
  if (!lp) return null;

  const comments = commentsData?.pages.flatMap((p) => p.data.data) ?? [];
  const totalComments = commentsData?.pages[0]?.data.data.length ?? 0;

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {lp.author?.avatar ? (
            <img src={lp.author.avatar} alt={lp.author.name} className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-[#f472b6] flex items-center justify-center text-white text-xs font-bold">
              {lp.author?.name?.[0] ?? "?"}
            </div>
          )}
          <span className="text-sm text-gray-300">{lp.author?.name}</span>
        </div>
        <span className="text-xs text-gray-500">{formatRelativeDate(lp.createdAt)}</span>
      </div>

      {/* 제목 */}
      <h1 className="text-xl font-bold mb-4">{lp.title}</h1>

      {/* 수정/삭제 버튼 (본인 게시글만) */}
      {isAuthor && (
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={() => setIsEditModalOpen(true)} className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-white" title="수정">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={handleDeleteLp} disabled={isDeleting} className="p-2 rounded hover:bg-white/10 transition text-gray-400 hover:text-red-400 disabled:opacity-50" title="삭제">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 썸네일 */}
      <div className="flex justify-center mb-6">
        <img src={lp.thumbnail} alt={lp.title} className="w-64 h-64 rounded-full object-cover shadow-2xl" />
      </div>

      {/* 본문 */}
      <p className="text-gray-300 text-sm leading-relaxed mb-6">{lp.content}</p>

      {/* 태그 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {lp.tags.map((tag) => (
          <span key={tag.id} className="px-2 py-1 rounded-full bg-white/10 text-gray-300 text-xs">#{tag.name}</span>
        ))}
      </div>

      {/* 좋아요 버튼 */}
      <div className="flex justify-center mb-10">
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          onClick={isLiked ? () => dislikeMutate({ lpId }) : () => likeMutate({ lpId })}
        >
          <Heart color={isLiked ? "red" : undefined} fill={isLiked ? "red" : "none"} />
          <span>{lp.likes.length}</span>
        </button>
      </div>

      {isEditModalOpen && <EditLpModal lp={lp} onClose={() => setIsEditModalOpen(false)} />}

      {/* 댓글 섹션 */}
      <div className="border-t border-white/10 pt-6">
        {/* 헤더 + 정렬 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-300">
            댓글 {totalComments}개
          </h2>
          <div className="flex gap-1">
            {(["desc", "asc"] as const).map((o) => (
              <button
                key={o}
                onClick={() => setOrder(o)}
                className={`px-2.5 py-1 rounded text-xs transition ${
                  order === o
                    ? "bg-white text-black font-semibold"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                {o === "desc" ? "최신순" : "오래된순"}
              </button>
            ))}
          </div>
        </div>

        {/* 댓글 작성란 */}
        {accessToken ? (
          <div className="flex flex-col gap-1.5 mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="댓글을 입력하세요..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleCreateComment(); } }}
                maxLength={500}
                className="flex-1 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-white text-sm placeholder:text-white/40 outline-none focus:border-[#807bff] transition"
              />
              <button
                onClick={handleCreateComment}
                disabled={isCreating || !commentInput.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#807bff] text-white text-sm font-semibold hover:bg-[#6b63d9] transition disabled:bg-white/20 disabled:text-white/40 disabled:cursor-not-allowed"
              >
                {isCreating ? "등록 중" : "등록"}
              </button>
            </div>
            {commentInput.length > 0 && commentInput.trim().length === 0 && (
              <p className="text-xs text-red-400 px-1">공백만으로는 댓글을 작성할 수 없습니다.</p>
            )}
            <p className="text-xs text-gray-500 px-1 text-right">{commentInput.length} / 500</p>
          </div>
        ) : (
          <p className="text-xs text-gray-500 mb-6 text-center">
            댓글을 작성하려면{" "}
            <button onClick={() => navigate("/login")} className="text-[#807bff] underline hover:text-[#a8a4ff]">
              로그인
            </button>
            이 필요합니다.
          </p>
        )}

        {/* 초기 로딩 Skeleton */}
        {isCommentsPending && <CommentSkeletonList count={3} />}

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-4" ref={menuRef}>
          {comments.map((comment) => {
            const isMine = comment.authorId === me?.data.id;
            const isEditing = editingComment?.id === comment.id;

            return (
              <div key={comment.id} className="flex gap-3">
                <div className="flex-shrink-0">
                  {comment.author.avatar ? (
                    <img src={comment.author.avatar} alt={comment.author.name} className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#807bff] flex items-center justify-center text-white text-xs font-bold">
                      {comment.author.name?.[0] ?? "?"}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-gray-200">{comment.author.name}</span>
                      <span className="text-xs text-gray-500">{formatRelativeDate(comment.createdAt)}</span>
                    </div>

                    {isMine && (
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenuId(openMenuId === comment.id ? null : comment.id)}
                          className="p-1 text-gray-500 hover:text-white transition rounded"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {openMenuId === comment.id && (
                          <div className="absolute right-0 top-6 z-10 w-24 rounded-xl border border-white/10 bg-[#1a1a24] shadow-xl overflow-hidden">
                            <button
                              onClick={() => handleStartEdit(comment)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-300 hover:bg-white/10 transition"
                            >
                              <Pencil className="w-3 h-3" /> 수정
                            </button>
                            <button
                              onClick={() => handleDeleteComment(comment.id)}
                              className="flex items-center gap-2 w-full px-3 py-2 text-xs text-red-400 hover:bg-white/10 transition"
                            >
                              <Trash2 className="w-3 h-3" /> 삭제
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={editInput}
                        onChange={(e) => setEditInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleUpdateComment()}
                        className="flex-1 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-white text-xs outline-none focus:border-[#807bff] transition"
                        autoFocus
                      />
                      <button onClick={handleUpdateComment} disabled={isUpdating} className="px-3 py-1.5 rounded-lg bg-[#807bff] text-white text-xs hover:bg-[#6b63d9] transition disabled:opacity-50">
                        저장
                      </button>
                      <button onClick={() => setEditingComment(null)} className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 text-xs hover:bg-white/20 transition">
                        취소
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-300 mt-0.5 break-words">{comment.content}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 추가 로딩 Skeleton (하단에만) */}
        {isFetchingNextPage && (
          <div className="mt-4">
            <CommentSkeletonList count={2} />
          </div>
        )}

        {/* 무한스크롤 트리거 */}
        <div ref={commentBottomRef} className="h-4" />
      </div>
    </div>
  );
};

export default LpDetailPage;
