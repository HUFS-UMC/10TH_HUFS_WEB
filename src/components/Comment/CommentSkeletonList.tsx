import CommentSkeleton from "./CommentSkeleton.tsx";

interface CommentSkeletonListProps {
  count: number;
}

const CommentSkeletonList = ({ count }: CommentSkeletonListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </>
  );
};

export default CommentSkeletonList;