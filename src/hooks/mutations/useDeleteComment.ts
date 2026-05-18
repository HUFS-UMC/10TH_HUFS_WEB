import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "../../apis/comment.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestDeleteCommentDto,
  ResponseDeleteCommentDto,
} from "../../types/comment.ts";

function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseDeleteCommentDto,
    Error,
    RequestDeleteCommentDto
  >({
    mutationFn: deleteComment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpId],
      });
    },
  });
}

export default useDeleteComment;