import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/auth";
import { LOCAL_STORAGE_KEY } from "../../constants/key";

function useDeleteUser() {
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.name);
      window.location.href = "/login";
    },
  });
}

export default useDeleteUser;
