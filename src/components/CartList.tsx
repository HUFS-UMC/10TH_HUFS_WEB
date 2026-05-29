import { useCartActions, useCartInfo } from '../hooks/useCartStore';
import CartItem from './CartItem';

const CartList = () => {
  const { cartItems } = useCartInfo();
  const { openModal } = useCartActions();

  const handleAllClearButton = () => {
    openModal();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 && (
        <div className="my-10">
          <p className="text-2xl font-semibold">장바구니가 비어있습니다.</p>
        </div>
      )}

      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      {cartItems.length > 0 && (
        <button
          onClick={handleAllClearButton}
          className="p-4 border rounded-md my-10 text-red-500 border-red-400 hover:bg-red-50 cursor-pointer"
        >
          전체 삭제
        </button>
      )}
    </div>
  );
};

export default CartList;