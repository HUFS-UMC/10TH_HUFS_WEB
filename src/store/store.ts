import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../slices/cartSlice';
import modalReducer from '../slices/modalSlice';

// 1. 저장소 생성
function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    // 여러 slice를 하나의 store에 등록한다.
    reducer: {
      // 장바구니 상태 관리
      cart: cartReducer,

      // 모달 열림/닫힘 상태 관리
      modal: modalReducer,
    },
  });

  return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 실행해서 스토어를 빼준다.
// 싱글톤패턴
const store = createStore();

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {cart: CartState, modal: ModalState}
export type AppDispatch = typeof store.dispatch;