import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { deleteLike } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  Likes,
  RequestLpDto,
  ResponseLikeDto,
  ResponseLpDetailDto,
} from "../../types/lp.ts";
import type { ResponseMyInfoDto } from "../../types/auth.ts";

type LikeContext = {
  previousLpPost?: ResponseLpDetailDto;
  newLpPost?: ResponseLpDetailDto;
};

function useDeleteLike() {
  const queryClient = useQueryClient();

  return useMutation<ResponseLikeDto, Error, RequestLpDto, LikeContext>({
    mutationFn: deleteLike,

    onMutate: async (lp: RequestLpDto) => {
      const lpId = String(lp.lpId);

      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lp, lpId],
      });

      const previousLpPost =
        queryClient.getQueryData<ResponseLpDetailDto>([
          QUERY_KEY.lp,
          lpId,
        ]);

      if (!previousLpPost) {
        return { previousLpPost };
      }

      const newLpPost: ResponseLpDetailDto = {
        ...previousLpPost,
        data: {
          ...previousLpPost.data,
          likes: [...previousLpPost.data.likes],
        },
      };

      const me =
        queryClient.getQueryData<ResponseMyInfoDto>([
          QUERY_KEY.myInfo,
        ]);

      const userId = Number(me?.data.id);

      if (!userId) {
        return { previousLpPost };
      }

      const likedIndex =
        newLpPost.data.likes.findIndex(
          (like: Likes) => like.userId === userId,
        ) ?? -1;

      if (likedIndex >= 0) {
        newLpPost.data.likes.splice(likedIndex, 1);
      }

      queryClient.setQueryData(
        [QUERY_KEY.lp, lpId],
        newLpPost,
      );

      return { previousLpPost, newLpPost };
    },

    onError: (
      err: Error,
      newLp: RequestLpDto,
      context: LikeContext | undefined,
    ) => {
      const lpId = String(newLp.lpId);

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;

        // 404 = 서버에는 이미 좋아요가 없음
        // 따라서 좋아요 취소 상태를 유지
        if (status === 404 && context?.newLpPost) {
          queryClient.setQueryData(
            [QUERY_KEY.lp, lpId],
            context.newLpPost,
          );

          return;
        }
      }

      queryClient.setQueryData(
        [QUERY_KEY.lp, lpId],
        context?.previousLpPost,
      );
    },

    onSettled: async (_data, _error, variables) => {
      const lpId = String(variables.lpId);

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, lpId],
      });

      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });
    },
  });
}

export default useDeleteLike;