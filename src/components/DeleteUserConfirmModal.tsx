import useDeleteUser from "../hooks/mutations/useDeleteUser.ts";

interface DeleteUserConfirmModalProps {
  onClose: () => void;
}

const DeleteUserConfirmModal = ({ onClose }: DeleteUserConfirmModalProps) => {
  const { mutate: deleteUserMutate, isPending } = useDeleteUser();

  const handleDeleteUser = () => {
    deleteUserMutate();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl bg-gray-800 p-6 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">정말 탈퇴하시겠습니까?</h2>

        <p className="mt-4 text-sm leading-6 text-gray-300">
          회원 탈퇴를 진행하면 계정 정보가 삭제됩니다. 이 작업은 되돌릴 수
          없습니다.
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-md bg-gray-600 px-4 py-2 text-sm text-white hover:bg-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            아니오
          </button>

          <button
            type="button"
            onClick={handleDeleteUser}
            disabled={isPending}
            className="rounded-md bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? "탈퇴 중..." : "예"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserConfirmModal;