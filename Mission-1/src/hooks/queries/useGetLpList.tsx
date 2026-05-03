import { useQuery } from "@tanstack/react-query";
import type { PageNationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PageNationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, order],
    queryFn: () => getLpList({ cursor, search, order, limit }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}

export default useGetLpList;
