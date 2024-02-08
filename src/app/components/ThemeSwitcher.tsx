'use client';

import { MoonIcon, SunIcon, ComputerDesktopIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useState } from 'react';

import { LocalStorageThemeProvider, type Theme, type ThemeProvider } from '@/core';
import { combineClassNames } from '@/utils';

const themeProvider: ThemeProvider | null = typeof window !== 'undefined'
  ? new LocalStorageThemeProvider()
  : null;

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  const [theme, setTheme] = useState<Theme>();
  useEffect(() => {
    setTheme(themeProvider?.getCurrentTheme());
  }, []);

  const handleChangeTheme = useCallback(() => {
    setTheme(currentTheme => themeProvider?.setNextTheme(currentTheme));
  }, []);

  const ThemeSwitcherIcon = theme === 'system'
    ? ComputerDesktopIcon
    : theme === 'light'
      ? SunIcon
      : theme === 'dark'
        ? MoonIcon
        : QuestionMarkCircleIcon;

  return <button className={combineClassNames('', props.className)} onClick={handleChangeTheme}>
    {<ThemeSwitcherIcon className="h-5 w-5" />}
  </button>;
};
