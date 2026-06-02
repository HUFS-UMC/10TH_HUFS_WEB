import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";
import type { PAGENATION_ORDER } from "../../enums/common";

function useGetInfiniteComments(lpId: number, order: PAGENATION_ORDER) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lpComments, lpId, order],
    queryFn: ({ pageParam }) =>
      getComments({ lpId, cursor: pageParam, limit: 10, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    enabled: !!lpId,
  });
}

export default useGetInfiniteComments;
