import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";

function useGetLpList({cursor, search, order, limit}:PaginationDto) {
    return useQuery({
        queryKey:["lps", search, order],
        queryFn:()=>
            getLpList({
                cursor,
                search,
                order,
                limit,
            }),
    });
}

export default useGetLpList;