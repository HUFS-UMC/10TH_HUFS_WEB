import { THEME, useThemeContext } from "./context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
    const {theme, toggleTheme} = useThemeContext();

    const isLightMode = theme === THEME.LIGHT; //현재 테마가 LIGHT인지 확인

    return <button onClick={toggleTheme}
        className={clsx("px-4 py-2 mt-4 rounded-md transition-all", {
            'bg-black text-white': isLightMode, //LIGHT 모드일 때 버튼 스타일
            'bg-white text-black': !isLightMode, //DARK 모드일 때 버튼 스타일
        })}
    >
        {isLightMode ? '🌙 다크모드' : '☀️ 라이트모드'}
    </button>
};

