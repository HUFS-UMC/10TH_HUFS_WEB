import { useState } from "react";

import type { LpComment } from "../../types/comment.ts";
import useUpdateComment from "../../hooks/mutations/useUpdateComment.ts";
import useDeleteComment from "../../hooks/mutations/useDeleteComment.ts";

interface CommentItemProps {
  comment: LpComment;
  lpId: string;
  myId?: number;
}

const CommentItem = ({ comment, lpId, myId }: CommentItemProps) => {
  const author = comment.author ?? comment.user;

  const commentUserId = comment.userId ?? comment.authorId ?? author?.id;
  const isMyComment = myId !== undefined && commentUserId === myId;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const { mutate: updateCommentMutate, isPending: isUpdatePending } =
    useUpdateComment();

  const { mutate: deleteCommentMutate, isPending: isDeletePending } =
    useDeleteComment();

  const handleOpenMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleStartEdit = () => {
    setEditContent(comment.content);
    setIsEditing(true);
    setIsMenuOpen(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  const handleUpdateComment = () => {
    if (!editContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    updateCommentMutate(
      {
        lpId,
        commentId: comment.id,
        content: editContent.trim(),
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
  };

  const handleDeleteComment = () => {
    const isConfirmed = window.confirm("댓글을 삭제하시겠습니까?");

    if (!isConfirmed) {
      return;
    }

    deleteCommentMutate({
      lpId,
      commentId: comment.id,
    });
  };

  return (
    <div className="relative flex items-start justify-between gap-4 py-3">
      <div className="flex flex-1 gap-3">
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
            {(author?.name ?? "익명").slice(0, 1)}
          </div>
        )}

        <div className="flex-1">
          <p className="font-semibold text-white">{author?.name ?? "익명"}</p>

          {isEditing ? (
            <div className="mt-2 flex gap-2">
              <input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateComment();
                  }

                  if (e.key === "Escape") {
                    handleCancelEdit();
                  }
                }}
                className="flex-1 rounded-md border border-gray-500 bg-gray-900 px-3 py-2 text-sm text-white focus:border-pink-500 focus:outline-none"
              />

              <button
                type="button"
                onClick={handleUpdateComment}
                disabled={isUpdatePending || !editContent.trim()}
                className="rounded-md bg-pink-500 px-3 py-2 text-sm text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ✓
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isUpdatePending}
                className="rounded-md bg-gray-600 px-3 py-2 text-sm text-white hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                취소
              </button>
            </div>
          ) : (
            <p className="mt-1 text-sm text-gray-300">{comment.content}</p>
          )}
        </div>
      </div>

      {isMyComment && !isEditing && (
        <div className="relative">
          <button
            type="button"
            onClick={handleOpenMenu}
            className="text-xl text-gray-300 hover:text-white"
          >
            ⋮
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-8 z-10 flex min-w-24 flex-col overflow-hidden rounded-md bg-black text-sm shadow-lg">
              <button
                type="button"
                onClick={handleStartEdit}
                className="px-4 py-2 text-left text-white hover:bg-gray-700"
              >
                수정
              </button>

              <button
                type="button"
                onClick={handleDeleteComment}
                disabled={isDeletePending}
                className="px-4 py-2 text-left text-red-400 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;