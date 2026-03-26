import { createContext, type PropsWithChildren, useState } from "react";

export enum THEME {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK; //THEME의 LIGHT 또는 DARK 모드 될 수 있음

interface IThemeContext {
    theme: TTheme; //현재 테마 상태
    toggleTheme: () => void; //테마를 토글하는 함수
}


export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(THEME.LIGHT); //초기 테마는 LIGHT

    const toggleTheme = () => {
        setTheme((prevTheme) => (
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT)); //현재 테마에 따라 LIGHT와 DARK를 토글
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeProvider");
    }
    
    return context;
};