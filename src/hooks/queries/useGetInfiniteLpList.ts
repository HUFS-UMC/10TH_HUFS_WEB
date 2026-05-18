import { useInfiniteQuery } from "@tanstack/react-query";

import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { PaginationOrder } from "../../enums/common.ts";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PaginationOrder,
) {
  const trimmedSearch = search.trim();

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, trimmedSearch, order],
    queryFn: ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam,
        limit,
        search: trimmedSearch,
        order,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!lastPage.data.hasNext) {
        return undefined;
      }

      return lastPage.data.nextCursor;
    },
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetInfiniteLpList;