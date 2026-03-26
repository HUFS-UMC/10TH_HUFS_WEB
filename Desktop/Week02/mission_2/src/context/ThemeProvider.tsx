import { createContext, useContext, useState, type PropsWithChildren, useEffect } from "react";

// 1. 테마 상수 정의 (강의 스타일!)
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

type TTheme = typeof THEME[keyof typeof THEME];

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  // Tailwind v4 다크모드 적용을 위한 핵심 로직!
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === THEME.DARK) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};