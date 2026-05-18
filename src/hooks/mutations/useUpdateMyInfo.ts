import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchMyInfo } from "../../apis/user.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestUpdateMyInfoDto,
  ResponseUpdateMyInfoDto,
} from "../../types/user.ts";
import type { ResponseMyInfoDto } from "../../types/auth.ts";

type UpdateMyInfoContext = {
  previousMyInfo?: ResponseMyInfoDto;
};

function useUpdateMyInfo() {
  const queryClient = useQueryClient();

  return useMutation<
    ResponseUpdateMyInfoDto,
    Error,
    RequestUpdateMyInfoDto,
    UpdateMyInfoContext
  >({
    mutationFn: patchMyInfo,

    onMutate: async (newMyInfo) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      if (!previousMyInfo) {
        return { previousMyInfo };
      }

      const optimisticMyInfo: ResponseMyInfoDto = {
        ...previousMyInfo,
        data: {
          ...previousMyInfo.data,
          name: newMyInfo.name,
          bio: newMyInfo.bio,
          avatar: newMyInfo.avatar,
        },
      };

      queryClient.setQueryData(
        [QUERY_KEY.myInfo],
        optimisticMyInfo,
      );

      return { previousMyInfo };
    },

    onError: (_error, _newMyInfo, context) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData(
          [QUERY_KEY.myInfo],
          context.previousMyInfo,
        );
      }

      alert("프로필 수정에 실패했습니다.");
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
  });
}

export default useUpdateMyInfo;