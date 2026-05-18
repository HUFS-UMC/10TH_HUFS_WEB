import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateComment } from "../../apis/comment.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestUpdateCommentDto,
  ResponseUpdateCommentDto,
} from "../../types/comment.ts";

function useUpdateComment() {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseUpdateCommentDto,
    Error,
    RequestUpdateCommentDto
  >({
    mutationFn: updateComment,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpId],
      });
    },
  });
}

export default useUpdateComment;