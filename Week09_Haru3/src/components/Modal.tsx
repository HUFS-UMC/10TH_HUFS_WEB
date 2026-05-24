import { useCartActions } from "../hooks/useCartStore";
import { useModalActions } from "../hooks/useModalStore";

const Modal = () => {
    const { closeModal} = useModalActions();
    const {clearCart} = useCartActions();

    return (
        <aside className="fixed inset-0 bg-black/60 flex items-center justify-center z-5">
            <div className="bg-white rounded-xl p-8 w-80 text-center shadow-xl">
                <h4 className="text-lg font-semibold mb-2">장바구니를 전부 삭제하시겠습니까?</h4>
                <p className="text-sm text-gray-500 mb-6">담긴 상품이 모두 삭제됩니다.</p>
                <div className="flex gap-3">
                    <button className="flex-1 py-2 bg-red-500 text-white roundedmd hover:bg-red-600 cursor-pointer" 
                    onClick={()=>{
                        clearCart();
                        closeModal();
                    }}>네</button>
                    <button className="flex-1 py-2 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer" 
                    onClick={()=>
                        closeModal()
                    }>아니요</button>
                </div>
            </div>
        </aside>
    );
};

export default Modal;