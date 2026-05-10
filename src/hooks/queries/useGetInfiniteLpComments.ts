import { useInfiniteQuery } from "@tanstack/react-query";

import { getLpComments } from "../../apis/comment.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { PaginationOrder } from "../../enums/common.ts";
import type { ResponseLpCommentListDto } from "../../types/comment.ts";

function useGetInfiniteLpComments(
  lpId: string | undefined,
  limit: number,
  order: PaginationOrder,
) {
  return useInfiniteQuery<ResponseLpCommentListDto>({
    queryKey: [QUERY_KEY.lpComments, lpId, order, limit],

    queryFn: ({ pageParam = 0 }) =>
      getLpComments(lpId as string, {
        cursor: pageParam as number,
        limit,
        order,
      }),

    initialPageParam: 0,

    enabled: !!lpId,

    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) {
        return undefined;
      }

      return lastPage.data.nextCursor;
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export default useGetInfiniteLpComments;