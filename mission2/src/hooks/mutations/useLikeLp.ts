import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLp } from "../../apis/lp";

const useLikeLp = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeLp(lpId),

    onMutate: async () => {
      // 상세 페이지 쿼리 취소
      await queryClient.cancelQueries({
        queryKey: ["lp", String(lpId)],
      });

      // 이전 데이터 스냅샷
      const previousLp = queryClient.getQueryData(["lp", String(lpId)]);

      // 낙관적 업데이트 수행
      queryClient.setQueryData(
        ["lp", String(lpId)],
        (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              likes: oldData.data.isLiked
                ? oldData.data.likes - 1 
                : oldData.data.likes + 1,
              isLiked: !oldData.data.isLiked
            },
          };
        }
      );

      return { previousLp };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousLp) {
        queryClient.setQueryData(
          ["lp", String(lpId)],
          context.previousLp
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["lp", String(lpId)],
      });
    },
  });
};

export default useLikeLp;