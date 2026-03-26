import clsx from "clsx";
import { THEME, useThemeContext } from "./context/ThemeProvider";

export default function ThemeContent() {
    const { theme } = useThemeContext();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div
            className={clsx("p-4 h-dvh w-full", isLightMode ? "bg-white" : "bg-gray-800")}>
        
            <h1 className={clsx("text-2xl font-bold", isLightMode ? "text-black" : "text-white")}>
                Theme content  
            </h1>
            <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
                This is the theme content.
            </p>
        </div>
    );
}