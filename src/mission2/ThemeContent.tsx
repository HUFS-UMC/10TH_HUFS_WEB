import { THEME, useTheme } from "./provide/ThemeProvider";
import clsx from "clsx";

export default function ThemeContent() {
    const {theme} = useTheme();
    
    const isLightMode = theme === THEME.LIGHT;
    return (
        <div className={clsx('p-4 h-dvh w-full',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>
            <h1 className={clsx('text-xl font-bold', isLightMode ? 'text-black': 'text-white' )}>
                Theme Content
            </h1>
            <p className={clsx('mt-2', isLightMode ? 'text-black' : 'text-white')}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Earum minima blanditiis doloribus maiores. Soluta doloremque fugit vitae eveniet non laborum. 
                Ea fuga minus sint iste natus sit perferendis voluptas eius!
            </p>

        </div>
    );
}