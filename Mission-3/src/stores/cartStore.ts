import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set, get) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id) =>
        set((state) => {
          const item = state.cartItems.find((c) => c.id === id);
          if (item) item.amount += 1;
        }),

      decrease: (id) => {
        const item = get().cartItems.find((c) => c.id === id);
        if (!item) return;

        if (item.amount <= 1) {
          get().actions.removeItem(id);
        } else {
          set((state) => {
            const target = state.cartItems.find((c) => c.id === id);
            if (target) target.amount -= 1;
          });
        }
      },

      removeItem: (id) =>
        set((state) => {
          state.cartItems = state.cartItems.filter((c) => c.id !== id);
        }),

      clearCart: () =>
        set((state) => {
          state.cartItems = [];
          state.amount = 0;
          state.total = 0;
        }),

      calculateTotals: () =>
        set((state) => {
          let amount = 0;
          let total = 0;
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.price * item.amount;
          });
          state.amount = amount;
          state.total = total;
        }),
    },
  })),
);

// selector 훅 — 필요한 것만 꺼내 쓰기
export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    })),
  );

export const useCartActions = () => useCartStore((state) => state.actions);
