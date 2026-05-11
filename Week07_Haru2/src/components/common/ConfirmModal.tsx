interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmLabel?: string;
    cancelLabel?: string;
    isLoading?: boolean;
}

const ConfirmModal = ({
    message,
    onConfirm,
    onCancel,
    confirmLabel = "예",
    cancelLabel = "아니요",
    isLoading = false,
}: ConfirmModalProps) => {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
        >
            <div
                className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-xs mx-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* X 버튼 */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white bg-transparent border-none cursor-pointer"
                >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <p className="text-sm text-gray-200 text-center mb-6 leading-relaxed">{message}</p>

                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer border-none disabled:opacity-50"
                    >
                        {isLoading ? "처리 중..." : confirmLabel}
                    </button>
                    <button
                        onClick={onCancel}
                        disabled={isLoading}
                        className="flex-1 py-2.5 bg-[#2a2a2a] hover:bg-[#333] text-gray-300 text-sm font-bold rounded-lg transition-colors cursor-pointer border-none disabled:opacity-50"
                    >
                        {cancelLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;