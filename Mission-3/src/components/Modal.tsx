import { useCartActions } from "../stores/cartStore";
import { useModalIsOpen, useModalActions } from "../stores/modalStore";

const Modal = () => {
  const isOpen = useModalIsOpen();
  const { closeModal } = useModalActions();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p>장바구니를 초기화하시겠습니까?</p>
        <div className="gap-2 flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={closeModal}
          >
            아니요
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={handleConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
