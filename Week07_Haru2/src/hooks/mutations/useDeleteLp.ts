import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { deleteLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useDeleteLp() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (lpId: number) => deleteLp(lpId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp] });
            navigate("/");
        },

        onError: (err) => {
            console.error("LP 삭제 실패", err);
            alert("삭제에 실패했어요. 다시 시도해주세요.");
        },
    });
}

export default useDeleteLp;