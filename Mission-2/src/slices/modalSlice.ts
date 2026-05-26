import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

// modalSlice 생성
// 1. createSlice을 이용하여 modalSlice 생성
// 2. name, initialState, reducers 설정
// 3. modalSlice에서 reducer와 actions 내보내기
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;
export default modalReducer;
