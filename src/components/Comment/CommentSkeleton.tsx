const CommentSkeleton = () => {
  return (
    <div className="flex animate-pulse gap-3 py-3">
      <div className="h-9 w-9 rounded-full bg-gray-500" />

      <div className="flex-1">
        <div className="h-4 w-28 rounded bg-gray-500" />
        <div className="mt-2 h-4 w-full rounded bg-gray-500" />
      </div>
    </div>
  );
};

export default CommentSkeleton;