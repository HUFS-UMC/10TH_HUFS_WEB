import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postSignin } from "../../apis/auth.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestSigninDto,
  ResponseSigninDto,
} from "../../types/auth.ts";

function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<ResponseSigninDto, Error, RequestSigninDto>({
    mutationFn: postSignin,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default useLogin;