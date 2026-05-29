// Redux Toolkit에서 createSlice 함수를 가져온다.
// createSlice는 action과 reducer를 한 번에 만들어주는 함수이다.
import { createSlice } from '@reduxjs/toolkit';

// 모달 상태의 타입을 정의한다.
// TypeScript에서 state 구조를 명확하게 하기 위해 사용한다.
export interface ModalState {
  // isOpen은 모달이 열려 있는지 닫혀 있는지를 저장하는 값이다.
  // true면 모달이 열려 있는 상태이다.
  // false면 모달이 닫혀 있는 상태이다.
  isOpen: boolean;
}

// modalSlice에서 사용할 초기 상태를 만든다.
const initialState: ModalState = {
  // 처음 화면이 렌더링될 때는 모달이 보이면 안 된다.
  // 그래서 기본값을 false로 설정한다.
  isOpen: false,
};

// modalSlice를 생성한다.
// 모달 열림/닫힘과 관련된 상태와 reducer를 이 안에서 관리한다.
const modalSlice = createSlice({
  // slice의 이름이다.
  // Redux DevTools에서 이 이름으로 확인할 수 있다.
  name: 'modal',

  // 위에서 만든 초기 상태를 등록한다.
  initialState,

  // 상태를 변경하는 reducer 함수들을 정의한다.
  reducers: {
    // 모달을 여는 reducer이다.
    // 이 action이 dispatch되면 isOpen이 true로 바뀐다.
    openModal: (state) => {
      // Redux Toolkit은 내부적으로 Immer를 사용한다.
      // 그래서 state를 직접 수정하는 것처럼 작성해도 안전하게 불변성이 유지된다.
      state.isOpen = true;
    },

    // 모달을 닫는 reducer이다.
    // 이 action이 dispatch되면 isOpen이 false로 바뀐다.
    closeModal: (state) => {
      // 모달 상태를 닫힘 상태로 변경한다.
      state.isOpen = false;
    },
  },
});

// 컴포넌트에서 dispatch(openModal()) 형태로 사용할 수 있도록 action을 내보낸다.
export const { openModal, closeModal } = modalSlice.actions;

// modalSlice에서 생성된 reducer를 변수에 담는다.
const modalReducer = modalSlice.reducer;

// store.ts에서 modalReducer를 등록할 수 있도록 기본 export 한다.
export default modalReducer;