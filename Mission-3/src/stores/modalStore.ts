import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  actions: ModalActions;
};

interface ModalActions {
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  actions: {
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
  },
}));

export const useModalIsOpen = () => useModalStore((state) => state.isOpen);
export const useModalActions = () => useModalStore((state) => state.actions);
