import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/lp"; // 댓글 등록 API
import { QUERY_KEY } from "../../constants/key";

export const usePostComment = (lpId: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (content: string) => postComment(lpId, content),
        onSuccess: () => {
            // ✅ 성공 시 댓글 목록을 새로고침(Invalidate)해서 방금 쓴 글을 보여줍니다.
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.lp, lpId, "comments"] });
        },
    });
};