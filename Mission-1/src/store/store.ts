import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

// 1. 저장소 생성
function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
      cart: cartReducer,
    },
  });
  return store;
}

// 3. 저장소 내보내기
// 싱글톤 패턴으로 저장소를 생성하여 내보냅니다. 이렇게 하면 애플리케이션 전체에서 동일한 저장소 인스턴스를 사용할 수 있습니다.
const store = createStore();
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
