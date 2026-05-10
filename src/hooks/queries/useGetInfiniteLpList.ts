import { useInfiniteQuery } from "@tanstack/react-query";

import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";
import type { PaginationOrder } from "../../enums/common.ts";
import type { ResponseLpListDto } from "../../types/lp.ts";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PaginationOrder,
) {
  return useInfiniteQuery<ResponseLpListDto>({
    queryKey: [QUERY_KEY.lps, search, order, limit],

    queryFn: ({ pageParam = 0 }) =>
      getLpList({
        cursor: pageParam as number,
        limit,
        search,
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
    retry: 1,
  });
}

export default useGetInfiniteLpList;