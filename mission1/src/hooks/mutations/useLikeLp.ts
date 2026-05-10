import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { likeLp } from "../../apis/lp";

const useLikeLp = (lpId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likeLp(lpId),

    onMutate: async () => {

      await queryClient.cancelQueries({
        queryKey: ["lp", String(lpId)],
      });

      const previousLp =
        queryClient.getQueryData([
          "lp",
          String(lpId),
        ]);

      queryClient.setQueryData(
        ["lp", String(lpId)],
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: {
              ...oldData.data,
              likes:
                oldData.data.likes + 1,
            },
          };
        }
      );

      return { previousLp };
    },

    onError: (
      _error,
      _variables,
      context
    ) => {
      queryClient.setQueryData(
        ["lp", String(lpId)],
        context?.previousLp
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["lp", String(lpId)],
      });
    },
  });
};

export default useLikeLp;