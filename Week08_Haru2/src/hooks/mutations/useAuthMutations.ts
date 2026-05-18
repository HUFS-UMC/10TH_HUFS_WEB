import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo, withdraw, postLogout } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { ResponseMyInfoDto } from "../../types/auth";

export const usePatchMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchMyInfo,

        onMutate: async (newInfo) => {
            await queryClient.cancelQueries({ queryKey: [QUERY_KEY.myInfo] });

            const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

            if (previousMyInfo) {
                queryClient.setQueryData([QUERY_KEY.myInfo], {
                    ...previousMyInfo,
                    data: {
                        ...previousMyInfo.data,
                        ...newInfo,
                    },
                });
            }

            return { previousMyInfo };
        },

        onError: (err, newInfo, context) => {
            // 실패 시 롤백
            if (context?.previousMyInfo) {
                queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
        },
    });
};

export const useWithdraw = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return useMutation({
        mutationFn: withdraw,
        onSuccess: () => {
            logout();
            navigate("/login");
        },
    });
};

export const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    return useMutation({
        mutationFn: postLogout,
        onSuccess: () => {
            logout();
            navigate("/login");
        },
    });
};