import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateLp } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestUpdateLpDto,
  ResponseUpdateLpDto,
} from "../../types/lp.ts";

function useUpdateLp() {
  const queryClient = useQueryClient();

  return useMutation<ResponseUpdateLpDto, Error, RequestUpdateLpDto>({
    mutationFn: updateLp,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, String(variables.lpId)],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

export default useUpdateLp;