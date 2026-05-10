import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchMyInfo } from "../../apis/user.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestUpdateMyInfoDto,
  ResponseUpdateMyInfoDto,
} from "../../types/user.ts";

function useUpdateMyInfo() {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseUpdateMyInfoDto,
    Error,
    RequestUpdateMyInfoDto
  >({
    mutationFn: patchMyInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default useUpdateMyInfo;