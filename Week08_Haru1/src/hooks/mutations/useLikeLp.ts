import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLikeLp, postLikeLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";
import type { CommonResponse } from "../../types/common";

interface MutationContext {
  previousLpPost?: ResponseLpDto;
}

function useLikeLp() {
  const queryClient = useQueryClient();

  return useMutation<
    CommonResponse<null | { id: number }>,
    Error,
    { lpId: number; isLiked: boolean },
    MutationContext 
  >({
    mutationFn: ({ lpId, isLiked }) =>
      isLiked ? deleteLikeLp(lpId) : postLikeLp(lpId),

    onMutate: async ({ lpId }) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.lp, lpId] });

      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lp, lpId]);
      const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
      const userId = Number(me?.data.id);

      if (previousLpPost) {
        const newLpPost = {
          ...previousLpPost,
          data: {
            ...previousLpPost.data,
            likes: [...previousLpPost.data.likes],
          },
        };

        const likedIndex = newLpPost.data.likes.findIndex((like) => like.userId === userId);

        if (likedIndex >= 0) {
          newLpPost.data.likes.splice(likedIndex, 1);
        } else {
          newLpPost.data.likes.push({ userId, lpId } as Likes);
        }

        queryClient.setQueryData([QUERY_KEY.lp, lpId], newLpPost);
      }

      return { previousLpPost };
    },

    onError: (err, { lpId }, context) => {
      if (context?.previousLpPost) {
        queryClient.setQueryData([QUERY_KEY.lp, lpId], context.previousLpPost);
      }
    },

    onSettled: async (data, error, { lpId }) => {
      await queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId] });
    },
  });
}

export default useLikeLp;