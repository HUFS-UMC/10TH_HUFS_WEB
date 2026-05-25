import { FaShoppingCart } from 'react-icons/fa'
import { useEffect } from 'react';
import useCartStore from '../store/useCartStore';

const Navbar = () => {
    const {
        amount,
        cartItems,
        calculateTotals,
    } = useCartStore();

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 onClick={()=>{
                window.location.href = '/'
            }} 
            className="text-2xl font-semibold cursor-pointer"
            >
                장바구니
            </h1>

            <div className='flex items-center gap-2'>
                <FaShoppingCart />

                <span>{amount}</span>
            </div>
        </div>
    );
};

export default Navbar;