const CommentSkeleton = () => {
  return (
    <div className="animate-pulse border-b py-4">
      <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>

      <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>

      <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
    </div>
  );
};

export default CommentSkeleton;