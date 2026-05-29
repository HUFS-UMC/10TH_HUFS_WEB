import { useCartActions, useCartInfo } from '../hooks/useCartStore';

const Modal = () => {
  const { isOpen } = useCartInfo();
  const { clearCart, closeModal } = useCartActions();

  const handleCloseModal = () => {
    closeModal();
  };

  const handleClearCart = () => {
    clearCart();
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-6 text-gray-900">
          정말 삭제하시겠습니까?
        </h2>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300"
          >
            아니요
          </button>

          <button
            onClick={handleClearCart}
            className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;