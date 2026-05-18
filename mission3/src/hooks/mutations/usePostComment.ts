import {useMutation, useQueryClient,} from "@tanstack/react-query";

import { postComment } from "../../apis/comment";

const usePostComment = (
  lpId: number,
  order: "asc" | "desc"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      postComment({
        lpId,
        content,
      }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "lpComments",
          lpId,
          order,
        ],
      });
    },
  });
};

export default usePostComment;