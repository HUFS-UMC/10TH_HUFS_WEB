import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createLp } from "../../apis/lp";

const useCreateLp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      formData: FormData
    ) => createLp(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lps"],
      });
    },
  });
};

export default useCreateLp;