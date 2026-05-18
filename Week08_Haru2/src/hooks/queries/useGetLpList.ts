import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({cursor, search, order, limit}: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
        }),
        //데이터가 신선하다고 간주하는 시간, 캐시된 데이터 그대로 사용
        staleTime: 1000 * 60 * 5, //5min
        //사용되지 않는 뭐키 데이터가 캐시에 남아있는 시간, 데이터가 신선하지 않더라도 메모리에 저장, 이후 해당 데이터가 쿼리에 사용되지 않으면 제거
        gcTime: 1000 * 60 * 10, //10min 

        select:(data) => data.data.data,
    });
}

export default useGetLpList;