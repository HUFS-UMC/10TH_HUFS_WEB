import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

export default function ThemeContent() {
    const {theme, toggleTheme} = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx(
            'p-4 h-dvh',
            isLightMode ? 'bg-white text-black' : 'bg-gray-800 text-white'
            )}
        >
            <h1 
                className={clsx(
                    'text-wxl font-bold',
                    isLightMode ? 'text-gray-800' : 'text-white'
                )}
            >
                Theme Content
            </h1>
            <p
                className={clsx(
                    'mt-2',
                    isLightMode ? 'text-gray-600' : 'text-gray-300'
                )}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse est facere dolorem similique debitis consectetur officiis optio saepe praesentium repellat facilis cupiditate, dignissimos voluptates qui iste officia ipsa laudantium quibusdam.
            </p>
        </div>
    );
}