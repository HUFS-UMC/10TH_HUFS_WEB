import { useMutation } from "@tanstack/react-query";
import { updateComment } from "../../apis/comment";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useUpdateComment(lpId: number) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lpComments, lpId] });
    },
  });
}

export default useUpdateComment;
