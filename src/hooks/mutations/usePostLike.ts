import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postLike } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { RequestLpDto, ResponseLikeDto } from "../../types/lp.ts";

function usePostLike() {
  const queryClient = useQueryClient();

  return useMutation<ResponseLikeDto, Error, RequestLpDto>({
    mutationFn: postLike,

    onSuccess: (data) => {
      const lpId = String(data.data.lpId);

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, lpId],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

export default usePostLike;