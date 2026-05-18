import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpDetail(lpId: number) {
    return useQuery({
        queryKey: [QUERY_KEY.lp, lpId],     // lpId 포함 → LP마다 별도 캐시
        queryFn: () => getLpDetail(lpId),
        staleTime: 1000 * 60 * 5,           // 5min
        gcTime: 1000 * 60 * 10,             // 10min
        select: (data) => data.data,        // CommonResponse<Lp> → Lp
        enabled: !!lpId,
    });
}

export default useGetLpDetail;