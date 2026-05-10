interface Props {
  open: boolean;
  title?: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title = "정말 진행하시겠습니까?",
  description = "이 작업은 되돌릴 수 없습니다.",
  onConfirm,
  onCancel,
}: Props) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onCancel}
    >
      <div
        className="bg-white p-6 rounded-md w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">{description}</p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 border rounded"
          >
            취소
          </button>

          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;