import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useComments from "../../hooks/useComments";
import CommentItem from "./CommentItem";
import { CommentSkeletonList } from "./CommentSkeleton";

interface CommentSectionProps {
  lpId: number;
  myId?: number;
}

const CommentSection = ({ lpId, myId }: CommentSectionProps) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const {
    comments,
    totalComments,
    isCommentsPending,
    isFetchingNextPage,
    commentBottomRef,
    order,
    setOrder,
    commentInput,
    setCommentInput,
    isCreating,
    handleCreateComment,
    editingComment,
    editInput,
    setEditInput,
    isUpdating,
    handleStartEdit,
    handleUpdateComment,
    handleCancelEdit,
    handleDeleteComment,
    openMenuId,
    setOpenMenuId,
  } = useComments(lpId);

  return (
    <div className="border-t border-white/10 pt-6">
      {/* 헤더 + 정렬 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-300">댓글 {totalComments}개</h2>
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
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            isMine={comment.authorId === myId}
            isEditing={editingComment?.id === comment.id}
            editInput={editInput}
            isUpdating={isUpdating}
            openMenuId={openMenuId}
            onSetOpenMenuId={setOpenMenuId}
            onStartEdit={handleStartEdit}
            onEditInputChange={setEditInput}
            onUpdateComment={handleUpdateComment}
            onCancelEdit={handleCancelEdit}
            onDeleteComment={handleDeleteComment}
          />
        ))}
      </div>

      {/* 추가 로딩 Skeleton */}
      {isFetchingNextPage && (
        <div className="mt-4">
          <CommentSkeletonList count={2} />
        </div>
      )}

      <div ref={commentBottomRef} className="h-4" />
    </div>
  );
};

export default CommentSection;
