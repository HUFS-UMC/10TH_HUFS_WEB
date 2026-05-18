import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, patchComment } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useDeleteComment = (lpId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentId: number) => deleteComment(lpId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId, "comments"] });
        },
    });
};

export const usePatchComment = (lpId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ commentId, content }: { commentId: number; content: string }) =>
            patchComment(lpId, commentId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId, "comments"] });
        },
    });
};