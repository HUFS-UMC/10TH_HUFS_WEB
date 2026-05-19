import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY, LOCAL_STORAGE_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";

function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myinfo] });

      const previous = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myinfo]);

      // name이 변경되는 경우 캐시 즉시 반영 (Optimistic Update)
      if (newData.name !== undefined) {
        queryClient.setQueryData<ResponseMyInfoDto>([QUERY_KEY.myinfo], (old) => {
          if (!old) return old;
          return { ...old, data: { ...old.data, name: newData.name! } };
        });
        // NavBar용 localStorage도 즉시 업데이트
        localStorage.setItem(LOCAL_STORAGE_KEY.name, newData.name);
      }

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData([QUERY_KEY.myinfo], context.previous);
        const prevName = context.previous.data.name;
        localStorage.setItem(LOCAL_STORAGE_KEY.name, prevName);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myinfo] });
    },
  });
}

export default useUpdateUser;
