import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { deleteLp } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type {
  RequestDeleteLpDto,
  ResponseDeleteLpDto,
} from "../../types/lp.ts";

function useDeleteLp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<ResponseDeleteLpDto, Error, RequestDeleteLpDto>({
    mutationFn: deleteLp,

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps],
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, String(variables.lpId)],
      });

      alert("LP가 삭제되었습니다.");

      navigate("/", {
        replace: true,
      });
    },

    onError: (error) => {
      console.error("LP 삭제 실패:", error);
      alert("LP 삭제에 실패했습니다.");
    },
  });
}

export default useDeleteLp;