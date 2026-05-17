import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useCreateComment(lpId: number) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, lpId] });
    },
  });
}

export default useCreateComment;
