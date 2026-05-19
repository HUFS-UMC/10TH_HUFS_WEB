import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { PAGENATION_ORDER } from "../enums/common";
import useGetInfiniteComments from "./queries/useGetInfiniteComments";
import useCreateComment from "./mutations/useCreateComment";
import useUpdateComment from "./mutations/useUpdateComment";
import useDeleteComment from "./mutations/useDeleteComment";
import type { Comment } from "../types/comment";

function useComments(lpId: number) {
  const [order, setOrder] = useState<PAGENATION_ORDER>(PAGENATION_ORDER.desc);
  const [commentInput, setCommentInput] = useState("");
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editInput, setEditInput] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const isSubmittingRef = useRef(false);

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

  const comments = commentsData?.pages.flatMap((p) => p.data.data) ?? [];
  const totalComments = commentsData?.pages[0]?.data.data.length ?? 0;

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

  return {
    // 댓글 데이터
    comments,
    totalComments,
    isCommentsPending,
    isFetchingNextPage,
    commentBottomRef,
    // 정렬
    order,
    setOrder,
    // 작성
    commentInput,
    setCommentInput,
    isCreating,
    handleCreateComment,
    // 수정
    editingComment,
    editInput,
    setEditInput,
    isUpdating,
    handleStartEdit,
    handleUpdateComment,
    handleCancelEdit: () => setEditingComment(null),
    // 삭제
    handleDeleteComment,
    // 메뉴
    openMenuId,
    setOpenMenuId,
  };
}

export default useComments;
