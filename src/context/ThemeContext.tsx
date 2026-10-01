import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'night' | 'day';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  isDay: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme storage key
const THEME_STORAGE_KEY = 'uplands_theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default to 'night' mode on first visit per mandatory requirement
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'day') return 'day';
      return 'night';
    } catch {
      return 'night';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore localStorage availability issues
    }

    const root = document.documentElement;
    if (theme === 'day') {
      root.classList.add('day-mode');
      root.classList.remove('night-mode');
      root.style.colorScheme = 'light';
      document.body.style.backgroundColor = '#FAF8F5';
      document.body.style.color = '#0B291B';
    } else {
      root.classList.add('night-mode');
      root.classList.remove('day-mode');
      root.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#04140D';
      document.body.style.color = '#F1F5F9';
    }

  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'night' ? 'day' : 'night'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDay: theme === 'day' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
