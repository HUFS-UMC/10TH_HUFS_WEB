import { THEME, useTheme } from '../context/ThemeProvider';
import { clsx } from 'clsx';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        'px-4 py-2 mt-4 rounded-md transition-all font-bold shadow-md',
        {
          'bg-black text-white': isLightMode,    // 라이트모드일 땐 검은 버튼
          'bg-white text-black': !isLightMode,
        }
      )}
    >
      {isLightMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}
    </button>
  );
}