import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  // 모달이 열려있는지 닫혀있는지 저장하는 값
  // false면 모달 닫힘
  // true면 모달 열림
  isOpen: boolean;
}

const initialState: ModalState = {
  // 처음 화면에서는 모달이 보이면 안 되니까 false
  isOpen: false,
};

// modalSlice 생성
// 모달의 열림/닫힘 상태를 관리하는 slice
const modalSlice = createSlice({
  name: 'modal',
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

// 컴포넌트에서 dispatch로 사용할 action 내보내기
export const { openModal, closeModal } = modalSlice.actions;

// duck pattern reducer는 export default로 내보내야함.
const modalReducer = modalSlice.reducer;

export default modalReducer;