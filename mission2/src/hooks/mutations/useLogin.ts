import { useMutation } from "@tanstack/react-query";
import { postSignin } from "../../apis/auth";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: postSignin,
  });
};