import { create } from 'zustand';
import cartItems from '../constants/cartItems';
import type { CartItems } from '../types/cart';

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
    isOpen: boolean;

    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;

    calculateTotals: () => void;

    openModal: () => void;
    closeModal: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    isOpen: false,

    increase: (id) =>
        set((state) => ({
            cartItems: state.cartItems.map((item) =>
                item.id === id
                    ? { ...item, amount: item.amount + 1 }
                    : item
            ),
        })),

    decrease: (id) =>
        set((state) => ({
            cartItems: state.cartItems
                .map((item) =>
                    item.id === id
                        ? { ...item, amount: item.amount - 1 }
                        : item
                )
                .filter((item) => item.amount > 0),
        })),

    removeItem: (id) =>
        set((state) => ({
            cartItems: state.cartItems.filter(
                (item) => item.id !== id
            ),
        })),

    clearCart: () =>
        set(() => ({
            cartItems: [],
        })),

    calculateTotals: () =>
        set((state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            return {
                amount,
                total,
            };
        }),

    openModal: () =>
        set(() => ({
            isOpen: true,
        })),

    closeModal: () =>
        set(() => ({
            isOpen: false,
        })),
}));

export default useCartStore;