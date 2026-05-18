import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { postLogout } from "../../apis/auth.ts";
import { useAuth } from "../../context/AuthContext.tsx";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: postLogout,

    onSettled: async () => {
      await logout();

      queryClient.clear();

      navigate("/", {
        replace: true,
      });
    },
  });
}

export default useLogout;