import { create } from "zustand";

interface ModalActions {
    openModal: () =>  void;
    closeModal: () => void;
}

interface ModalState {
    isOpen: boolean;
    actions: ModalActions;
}

export const useModalStore = create<ModalState>()((set) => ({
    isOpen: false,
    actions: {
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false }),
    },
}));

export const useModalActions = () => useModalStore((state) => state.actions);