import { useQuery } from "@tanstack/react-query";

import { getLpDetail } from "../../apis/lp.ts";
import { QUERY_KEY } from "../../constants/key.ts";

function useGetLpDetail(lpId: string | undefined) {
  return useQuery({
    queryKey: [QUERY_KEY.lp, lpId],
    queryFn: () => getLpDetail(lpId as string),
    enabled: !!lpId,
    select: (data) => data.data,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
  });
}

export default useGetLpDetail;