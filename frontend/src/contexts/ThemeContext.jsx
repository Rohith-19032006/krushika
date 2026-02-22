import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

const THEME_KEY = 'farmer-app-theme';
const THEMES = ['light', 'dark', 'bright'];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    // fall back to system preference
    return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, theme);
    // ensure only one of the theme classes is present
    document.documentElement.classList.remove(...THEMES);
    document.documentElement.classList.add(theme);
  }, [theme]);

  // cycle through themes: light -> dark -> bright -> light
  const toggle = () => {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
  };

  const isDark = theme === 'dark';
  const isBright = theme === 'bright';

  return (
    <ThemeContext.Provider value={{ theme, isDark, isBright, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
