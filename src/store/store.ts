// Redux Toolkit에서 configureStore 함수를 가져온다.
// configureStore는 Redux store를 쉽게 만들어주는 함수이다.
import { configureStore } from '@reduxjs/toolkit';

// 장바구니 상태를 관리하는 cartSlice의 reducer를 가져온다.
import cartReducer from '../slices/cartSlice';

// 모달 상태를 관리하는 modalSlice의 reducer를 가져온다.
import modalReducer from '../slices/modalSlice';

// 1. 저장소 생성
// Redux store를 생성하는 함수를 만든다.
function createStore() {
  // configureStore를 사용해서 Redux store를 만든다.
  const store = configureStore({
    // 2. 리듀서 설정
    // 여러 개의 slice reducer를 하나의 store에 등록한다.
    reducer: {
      // cart라는 이름으로 cartReducer를 등록한다.
      // 컴포넌트에서는 state.cart으로 접근할 수 있다.
      cart: cartReducer,

      // modal이라는 이름으로 modalReducer를 등록한다.
      // 컴포넌트에서는 state.modal로 접근할 수 있다.
      modal: modalReducer,
    },
  });

  // 생성된 store를 반환한다.
  return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 createStore 함수를 실행해서 실제 store를 만든다.
// 싱글톤패턴
// 앱 전체에서 하나의 store만 사용하도록 만든다.
const store = createStore();

// 다른 파일에서 store를 사용할 수 있도록 export 한다.
// App.tsx의 Provider에 이 store를 전달한다.
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// RootState는 전체 Redux state의 타입이다.
// 예: state.cart, state.modal의 타입을 자동으로 추론한다.
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {cart: CartState, modal: ModalState}
// AppDispatch는 dispatch 함수의 타입이다.
// useDispatch를 TypeScript에서 안전하게 사용하기 위해 필요하다.
export type AppDispatch = typeof store.dispatch;