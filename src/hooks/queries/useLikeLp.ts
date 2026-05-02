import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLikeLp, deleteLikeLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useLikeLp(lpId: number) {
    const queryClient = useQueryClient();

    return useMutation<any, Error, boolean>({
        // isLiked true → 취소(DELETE), false → 등록(POST)
        mutationFn: (isLiked: boolean) =>
            isLiked ? deleteLikeLp(lpId) : postLikeLp(lpId),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps, lpId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        },
    });
}

export default useLikeLp;