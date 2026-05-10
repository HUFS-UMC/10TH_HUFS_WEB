import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deleteUser } from "../../apis/user.ts";
import { useAuth } from "../../context/AuthContext.tsx";
import type { ResponseDeleteUserDto } from "../../types/user.ts";

function useDeleteUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation<ResponseDeleteUserDto, Error>({
    mutationFn: deleteUser,

    onSuccess: async () => {
      await logout();

      queryClient.clear();

      alert("회원 탈퇴가 완료되었습니다.");

      navigate("/login", {
        replace: true,
      });
    },

    onError: (error) => {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다.");
    },
  });
}

export default useDeleteUser;