import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Comment } from "../../types/comment";
import { formatRelativeDate } from "../../utils/date";
import UserAvatar from "../UserAvatar";

interface CommentItemProps {
  comment: Comment;
  isMine: boolean;
  isEditing: boolean;
  editInput: string;
  isUpdating: boolean;
  openMenuId: number | null;
  onSetOpenMenuId: (id: number | null) => void;
  onStartEdit: (comment: Comment) => void;
  onEditInputChange: (value: string) => void;
  onUpdateComment: () => void;
  onCancelEdit: () => void;
  onDeleteComment: (commentId: number) => void;
}

const CommentItem = ({
  comment,
  isMine,
  isEditing,
  editInput,
  isUpdating,
  openMenuId,
  onSetOpenMenuId,
  onStartEdit,
  onEditInputChange,
  onUpdateComment,
  onCancelEdit,
  onDeleteComment,
}: CommentItemProps) => {
  return (
    <div className="flex gap-3">
      <UserAvatar avatar={comment.author.avatar} name={comment.author.name} size="sm" />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-200">{comment.author.name}</span>
            <span className="text-xs text-gray-500">{formatRelativeDate(comment.createdAt)}</span>
          </div>

          {isMine && (
            <div className="relative">
              <button
                onClick={() => onSetOpenMenuId(openMenuId === comment.id ? null : comment.id)}
                className="p-1 text-gray-500 hover:text-white transition rounded"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {openMenuId === comment.id && (
                <div className="absolute right-0 top-6 z-10 w-24 rounded-xl border border-white/10 bg-[#1a1a24] shadow-xl overflow-hidden">
                  <button
                    onClick={() => onStartEdit(comment)}
                    className="flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-300 hover:bg-white/10 transition"
                  >
                    <Pencil className="w-3 h-3" /> 수정
                  </button>
                  <button
                    onClick={() => onDeleteComment(comment.id)}
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
              onChange={(e) => onEditInputChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onUpdateComment()}
              className="flex-1 rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-white text-xs outline-none focus:border-[#807bff] transition"
              autoFocus
            />
            <button
              onClick={onUpdateComment}
              disabled={isUpdating}
              className="px-3 py-1.5 rounded-lg bg-[#807bff] text-white text-xs hover:bg-[#6b63d9] transition disabled:opacity-50"
            >
              저장
            </button>
            <button
              onClick={onCancelEdit}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 text-xs hover:bg-white/20 transition"
            >
              취소
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-300 mt-0.5 break-words">{comment.content}</p>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
