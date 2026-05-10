import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postComment } from "../../apis/comment.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestCreateCommentDto,
  ResponseCreateCommentDto,
} from "../../types/comment.ts";

function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseCreateCommentDto,
    Error,
    RequestCreateCommentDto
  >({
    mutationFn: postComment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpId],
      });
    },
  });
}

export default useCreateComment;