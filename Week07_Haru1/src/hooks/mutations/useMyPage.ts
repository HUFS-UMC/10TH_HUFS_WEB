import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMyInfo, withdraw } from "../../apis/auth";
import { QUERY_KEY } from "../../constants/key";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const usePatchMyInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: patchMyInfo,
        onSuccess: () => {
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