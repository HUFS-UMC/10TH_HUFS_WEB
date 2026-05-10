import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { deleteComment } from "../../apis/comment";

const useDeleteComment = (
  lpId: number,
  order: "asc" | "desc"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) =>
      deleteComment(commentId),

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

export default useDeleteComment;