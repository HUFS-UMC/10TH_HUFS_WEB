import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";

//1. 저장소 생성
function createStore() {
    const store = configureStore({
        //2.리듀서 설정
        reducer: {
            cart: cartReducer,
        },
    });
    return store;
}
//싱글폰 패턴(여기서 실행 후 스토어를 빼줌)
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;