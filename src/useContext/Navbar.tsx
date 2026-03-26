import clsx from "clsx";
import { THEME, useThemeContext } from "./context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
    const { theme } = useThemeContext(); //ThemeContext에서 theme과 toggleTheme을 가져옴

    const isLightMode = theme === THEME.LIGHT; //현재 테마가 LIGHT인지 확인

    return (
    <div className= {clsx(
        "p-4 w-full flex justify-end",
        isLightMode ? "bg-white" : "bg-gray-800",
    )}>
        <ThemeToggleButton />
    </div>);
}