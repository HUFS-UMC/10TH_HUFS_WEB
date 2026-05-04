import type { LpComment } from "../../types/comment.ts";

interface CommentItemProps {
  comment: LpComment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const author = comment.author ?? comment.user;

  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div className="flex gap-3">
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold text-white">
            {(author?.name ?? "익명").slice(0, 1)}
          </div>
        )}

        <div>
          <p className="font-semibold text-white">{author?.name ?? "익명"}</p>
          <p className="mt-1 text-sm text-gray-300">{comment.content}</p>
        </div>
      </div>

      <button type="button" className="text-xl text-gray-300 hover:text-white">
        ⋮
      </button>
    </div>
  );
};

export default CommentItem;