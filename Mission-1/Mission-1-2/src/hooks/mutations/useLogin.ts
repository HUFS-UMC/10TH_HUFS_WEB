import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";

function useLogin() {
  const { login } = useAuth();
  return useMutation({
    mutationFn: login,
  });
}

export default useLogin;
