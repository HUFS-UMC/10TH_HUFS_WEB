import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common.ts";
import { getLpList } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, cursor, search, order, limit],

    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),

    select: (data) => data.data.data,

    // 데이터가 신선하다고 간주되는 시간
    // 5분 동안은 같은 요청을 다시 해도 기존 데이터를 재사용함
    staleTime: 1000 * 60 * 5,

    // 사용하지 않는 쿼리 데이터가 캐시에 남아있는 시간
    // 10분 동안 사용하지 않으면 캐시에서 제거됨
    gcTime: 1000 * 60 * 10,

    // 검색어가 없어도 전체 LP 목록을 받아와야 하므로 true
    enabled: true,

    // 요청 실패 시 재시도 횟수
    retry: 1,
  });
}

export default useGetLpList;