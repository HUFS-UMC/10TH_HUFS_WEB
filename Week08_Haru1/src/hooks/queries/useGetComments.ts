import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

export const useGetComments = (lpId: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lp, lpId, "comments"],
    queryFn: ({ pageParam }: { pageParam: number | undefined }) => 
      getComments(lpId, { cursor: pageParam }),
    
    initialPageParam: undefined as number | undefined,
    
    getNextPageParam: (lastPage) => lastPage.data.nextCursor ?? undefined,
    
    enabled: !!lpId,
  });
};