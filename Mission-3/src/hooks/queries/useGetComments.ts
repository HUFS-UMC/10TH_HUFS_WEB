import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

function useGetComments(lpId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.comments, lpId],
    queryFn: () => getComments({ lpId }),
    enabled: !!lpId,
  });
}

export default useGetComments;
