import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { withdrawApi } from "../apis/auth";
import { useAuth } from "../context/AuthContext";

interface WithdrawModalProps {
  onClose: () => void;
}

const WithdrawModal = ({ onClose }: WithdrawModalProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const withdrawMutation = useMutation({
    mutationFn: withdrawApi,

    onSuccess: () => {
      queryClient.clear();
      logout();

      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login", { replace: true });
    },

    onError: (error) => {
      console.error(error);
      alert("회원 탈퇴에 실패했습니다.");
    },
  });

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70"
      onClick={onClose}
    >
      <div
        className="w-[360px] rounded-xl bg-neutral-800 p-6 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">회원 탈퇴</h2>

        <p className="mt-4 text-sm text-gray-300">
          정말 탈퇴하시겠습니까?
          <br />
          탈퇴 후에는 계정 정보를 복구할 수 없습니다.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={withdrawMutation.isPending}
            className="flex-1 rounded-md bg-gray-600 py-2 text-sm text-white disabled:bg-gray-500"
          >
            취소
          </button>

          <button
            type="button"
            onClick={() => withdrawMutation.mutate()}
            disabled={withdrawMutation.isPending}
            className="flex-1 rounded-md bg-red-500 py-2 text-sm text-white hover:bg-red-600 disabled:bg-gray-500"
          >
            {withdrawMutation.isPending ? "탈퇴 중..." : "탈퇴하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawModal;