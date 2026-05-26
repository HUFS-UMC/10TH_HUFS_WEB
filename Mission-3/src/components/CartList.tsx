import CartItem from "./CartItem";
import { useCartInfo } from "../stores/cartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();
  return (
    <div className="flex flex-col items-center justify-content">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
