import { useDispatch } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { clearCart } from "../slices/cartSlice";

const Modal = () => {
    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        dispatch(closeModal());
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">
                    정말 삭제하시겠습니까?
                </h2>

                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 border rounded cursor-pointer"
                    >
                        아니요
                    </button>

                    <button
                        onClick={handleClearCart}
                        className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;