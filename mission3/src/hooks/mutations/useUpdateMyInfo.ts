import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMyInfo } from "../../apis/user";

export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateMyInfo,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["myInfo"],
      });

      alert("프로필 수정 완료");
    },

    onError: () => {
      alert("프로필 수정 실패");
    },
  });
};