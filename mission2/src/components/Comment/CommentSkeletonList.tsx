import CommentSkeleton from "./CommentSkeleton";

interface Props {
  count: number;
}

const CommentSkeletonList = ({ count }: Props) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </>
  );
};

export default CommentSkeletonList;