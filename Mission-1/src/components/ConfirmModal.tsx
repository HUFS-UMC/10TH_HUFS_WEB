interface ConfirmModalProps {
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  isPending?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  title,
  description,
  confirmLabel = "예",
  cancelLabel = "아니오",
  isDanger = false,
  isPending = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#111118] p-6 shadow-2xl flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400 leading-6">{description}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="flex-1 rounded-xl border border-white/15 bg-white/10 py-3 text-sm font-semibold text-white transition hover:bg-white/20 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className={`flex-1 rounded-xl py-3 text-sm font-semibold text-white transition disabled:opacity-50 disabled:cursor-not-allowed ${
              isDanger
                ? "bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25"
                : "bg-[#807bff] hover:bg-[#6b63d9] shadow-lg shadow-[#807bff]/25"
            }`}
          >
            {isPending ? "처리 중..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
