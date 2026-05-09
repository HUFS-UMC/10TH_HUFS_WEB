import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";

function useGetInfiniteComments(
  lpId: number,
  order: "asc" | "desc"
) {
  return useInfiniteQuery({
    queryKey: ["lpComments", lpId, order],

    queryFn: ({ pageParam = 0 }) =>
      getComments({
        lpId,
        cursor: pageParam,
        limit: 10,
        order,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext
        ? lastPage.data.nextCursor
        : undefined;
    },

    enabled: !!lpId,
  });
}

export default useGetInfiniteComments;