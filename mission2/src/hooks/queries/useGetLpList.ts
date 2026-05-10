import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => 
            getLpList({
                cursor,
                search,
                order,
                limit,
            }),
        // 데이터가 신선하다고 간주하는 시간, 캐시된 데이터 그대로 사용
        // 5분 동안 기존 데이터를 그대로 활용해서 네트워크 요청을 줄인다.
        staleTime: 1000 * 60 * 5, //5분
        // 사용되지 않는 (비활성 상태) 인 쿼리 데이터가 캐시에 남아있는 시간
        // staleTime이 끝나고 데이터가 신선하지 않더라도 일정시간 동안 메모리에 저장
        // 그 이후 해당 데이터가 쿼리에 사용되지 않으면 gcTime이 지난 후 제거
        gcTime: 1000 * 60 * 10, //10분 

        select:(data) => data.data.data,
    });
}

export default useGetLpList;