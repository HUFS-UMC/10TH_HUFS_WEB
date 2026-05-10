import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/user";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useDeleteUser = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deleteUser,

    onSuccess: async () => {
      alert("탈퇴 완료");
      
      await logout();

      navigate("/login");
    },

    onError: () => {
      alert("탈퇴 실패");
    },
  });
};