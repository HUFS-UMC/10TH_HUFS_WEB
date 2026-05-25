import useCartStore from "../store/useCartStore";
import type { Lp } from "../types/cart";

interface CartItemProps {
    lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
    const {
        increase,
        decrease,
        removeItem,
    } = useCartStore();

    const handleIncreaseCount = () => {
        increase(lp.id);
    };

    const handleDecreaseCount = () => {
        if (lp.amount === 1) {
            removeItem(lp.id);
            return;
        }

        decrease(lp.id);
    };

    return (
        <div className="flex items-center p-4 border-b border-gray-200">
            <img
                src={lp.img}
                alt={lp.title}
                className="w-20 h-20 object-cover rounded mr-4"
            />

            <div className="flex-1">
                <h3 className="text-xl font-semibold">
                    {lp.title}
                </h3>

                <p>{lp.singer}</p>

                <p>{lp.price} 원</p>
            </div>

            <div className="flex items-center">
                <button
                    onClick={handleDecreaseCount}
                    className="px-3 py-1 bg-gray-300"
                >
                    -
                </button>

                <span className="px-4">
                    {lp.amount}
                </span>

                <button
                    onClick={handleIncreaseCount}
                    className="px-3 py-1 bg-gray-300"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default CartItem;