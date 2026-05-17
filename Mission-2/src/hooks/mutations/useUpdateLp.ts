import { useMutation } from "@tanstack/react-query";
import { updateLp } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function useUpdateLp(lpId: number) {
  return useMutation({
    mutationFn: updateLp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
    },
  });
}

export default useUpdateLp;
