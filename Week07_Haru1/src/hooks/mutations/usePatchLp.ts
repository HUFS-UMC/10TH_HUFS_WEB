import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLp } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function usePatchLp(lpId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: { title?: string; content?: string; thumbnail?: string; tags?: string[] }) =>
            patchLp(lpId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lps] });
        },
    });
}

export default usePatchLp;