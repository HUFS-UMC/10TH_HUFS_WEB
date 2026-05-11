import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo, patchMyInfo } from "../../apis/auth";
import type { ResponseMyInfoDto } from "../../types/auth";

function useGetMyInfo(accessToken: string|null) {
    return useQuery({
        queryKey: [QUERY_KEY.myInfo],
        queryFn: getMyInfo,
        enabled: !!accessToken,
    });
}

export const usePatchMyInfo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (body: { name?: string; bio?: string; avator?: string | null }) =>
            patchMyInfo(body),
        onMutate: async (newInfo) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });
            const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);
            if (previousMyInfo) {
                queryClient.setQueryData([QUERY_KEY.myInfo], {
                    ...previousMyInfo,
                    data: { ...previousMyInfo.data, ...newInfo },
                });
            }
            return { previousMyInfo };
        },
        onError: (err, newInfo, context) => {
            if (context?.previousMyInfo) {
                queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
};

export default useGetMyInfo;