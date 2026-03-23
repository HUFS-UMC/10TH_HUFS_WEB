import {createContext, useContext, useState} from "react";
import type {ReactNode} from "react";

interface CounterContextType {
    count: number;
    handleIncreaseNumber: ()=> void;
    handleDecreaseNumber: ()=> void;
} //context 안에 어떤 값이 들어갈지 타입으로 정의.
  // => useContext(CounterContext)를 통해 꺼내면 다음 3개를 받을 수 있다는 뜻.


//공용 보관함 역할.
export const CounterContext = createContext<CounterContextType | undefined>(
    undefined
); // Provider 로 감싸지 않은 곳에서 실수로 useContext 호출했을 때, 타입 단계에서 경고를 줄 수 있음.

//값을 공급하는 역할.
export const CounterProvider = ({children}: {children: ReactNode})=>{
    const [count, setCount] = useState(0);

    const handleIncreaseNumber = () => setCount((prev)=>prev+1);
    const handleDecreaseNumber = () => setCount((prev)=>prev-1);

    return(
        <CounterContext.Provider value={{count, handleIncreaseNumber, handleDecreaseNumber}}>
            {children}
        </CounterContext.Provider>
    );
}

export const useCount = ()=>{
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error(
            "useCount는 반드시 CountProvier 내부에서 사용되어야 합니다."
        );
    }
    return context;
};