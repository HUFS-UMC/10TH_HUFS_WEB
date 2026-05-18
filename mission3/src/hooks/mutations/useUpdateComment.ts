import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateComment } from "../../apis/comment";

const useUpdateComment = (
  lpId: number,
  order: "asc" | "desc"
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) =>
      updateComment(commentId, content),

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

export default useUpdateComment;