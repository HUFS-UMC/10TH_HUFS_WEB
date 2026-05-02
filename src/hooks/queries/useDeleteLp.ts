import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLp() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (lpId: number) => deleteLp(lpId),

        onSuccess: (_, lpId) => {
            queryClient.removeQueries({ queryKey: [QUERY_KEY.lps, lpId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
            navigate("/", { replace: true });
        },
    });
}

export default useDeleteLp;