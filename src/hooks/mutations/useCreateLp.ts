import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postLp } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestCreateLpDto,
  ResponseCreateLpDto,
} from "../../types/lp.ts";

function useCreateLp() {
  const queryClient = useQueryClient();

  return useMutation<ResponseCreateLpDto, Error, RequestCreateLpDto>({
    mutationFn: postLp,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

export default useCreateLp;