import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import type { PAGINATION_ORDER } from "../../enums/common";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],

    queryFn: ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam,
        limit,
        search,
        order,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext
        ? lastPage.data.nextCursor
        : undefined;
    },

    /* 🔥 캐시 정책 */
    staleTime: 1000 * 60, // 1분 fresh
    gcTime: 1000 * 60 * 5, // 5분 유지
  });
}

export default useGetInfiniteLpList;