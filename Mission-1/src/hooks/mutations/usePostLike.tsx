import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import type { Likes, ResponseLpDto } from "../../types/lp";
import type { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리(캐시 데이터 불러오는 요청) 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lp, lp.lpId],
      });

      // 2. 이 게시글에 관련된 쿼리의 이전 데이터 불러오기
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lp,
        lp.lpId,
      ]);

      // 3. 게시글 복사 newLpPost 만들기 => 오류 발생 시 롤백하기 위해서
      // const newLpPost = { ...previousLpPost };
      // 안전한 깊은 복사 (직접 변경 방지)
      const newLpPost = { ...previousLpPost };

      // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요 위치 찾기
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myinfo,
      ]);
      const userId = Number(me?.data.id);

      const likeIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId,
        ) ?? -1; // 못 찾으면 -1 반환

      // 5. 좋아요 목록에서 해당 좋아요 제거하기
      if (likeIndex >= 0) {
        previousLpPost?.data.likes.splice(likeIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      // 업데이트된 게시글 데이터를 캐시에 반영하기 => UI가 즉시 업데이트됨
      queryClient.setQueryData<ResponseLpDto>(
        [QUERY_KEY.lp, lp.lpId],
        previousLpPost,
      );

      // 6. 오류가 발생하면 롤백하기 위해서 이전 게시글 데이터 반환하기
      return { previousLpPost, newLpPost };
    },
    // 롤백: 오류가 발생하면 이전 게시글 데이터로 캐시를 되돌리기
    onError: (err, newLp, context) => {
      console.error("좋아요 삭제 실패:", err);
      queryClient.setQueryData<ResponseLpDto>(
        [QUERY_KEY.lp, newLp.lpId],
        context?.previousLpPost,
      );
    },
    // 성공 여부와 상관없이 캐시 데이터 최신화하기 (서버에서 다시 데이터 불러오기)
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lp, variables.lpId],
      });
    },
  });
}

export default usePostLike;
