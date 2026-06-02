const CommentSkeleton = () => (
  <div className="flex gap-3 animate-pulse">
    <div className="w-7 h-7 rounded-full bg-white/10 flex-shrink-0" />
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="h-3 w-20 rounded bg-white/10" />
        <div className="h-3 w-12 rounded bg-white/10" />
      </div>
      <div className="h-4 w-full rounded bg-white/10" />
      <div className="h-4 w-3/4 rounded bg-white/10" />
    </div>
  </div>
);

export const CommentSkeletonList = ({ count = 3 }: { count?: number }) => (
  <div className="flex flex-col gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <CommentSkeleton key={i} />
    ))}
  </div>
);

export default CommentSkeleton;
