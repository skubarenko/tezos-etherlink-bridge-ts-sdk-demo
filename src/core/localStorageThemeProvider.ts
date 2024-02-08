import type { Theme, ThemeProvider } from './themeProvider';

export class LocalStorageThemeProvider implements ThemeProvider, Disposable {
  private static readonly localStorageKey = 'theme';
  private static readonly rootElementDarkModeClassName = 'dark';

  private readonly darkSystemThemeMatchMediaQueryList: MediaQueryList;

  constructor() {
    this.darkSystemThemeMatchMediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkSystemThemeMatchMediaQueryList.addEventListener('change', this.onMediaQueryListChange);
    this.setCurrentTheme(this.getCurrentTheme());
  }

  getCurrentTheme(): Theme {
    return this.ensureThemeIsValid(localStorage.getItem(LocalStorageThemeProvider.localStorageKey));
  }

  setCurrentTheme(theme: Theme): Theme {
    const result = this.ensureThemeIsValid(theme);
    const isSystemTheme = result === 'system';
    const isDark = isSystemTheme ? this.darkSystemThemeMatchMediaQueryList.matches : result === 'dark';

    document.documentElement.classList.toggle(LocalStorageThemeProvider.rootElementDarkModeClassName, isDark);
    this.updateThirdPartyThemes(isDark);

    if (isSystemTheme)
      localStorage.removeItem(LocalStorageThemeProvider.localStorageKey);
    else
      localStorage.setItem(LocalStorageThemeProvider.localStorageKey, result);

    document.documentElement.classList.toggle(LocalStorageThemeProvider.rootElementDarkModeClassName, isDark);
    this.updateThirdPartyThemes(isDark);
    return result;
  }

  setNextTheme(theme?: Theme): Theme {
    return this.setCurrentTheme(this.getNextTheme(theme || this.getCurrentTheme()));
  }

  protected getNextTheme(theme: Theme): Theme {
    switch (theme) {
      case 'system':
        return 'light';
      case 'light':
        return 'dark';
      case 'dark':
        return 'system';
    }
  }

  private ensureThemeIsValid(theme: string | null | undefined): Theme {
    return theme === 'system' || theme === 'light' || theme === 'dark'
      ? theme
      : 'system';
  }

  private updateThirdPartyThemes(_isDark: boolean): void {
    // Empty
  }

  private onMediaQueryListChange = (e: MediaQueryListEvent) => {
    this.updateThirdPartyThemes(e.matches);
  };

  [Symbol.dispose](): void {
    this.darkSystemThemeMatchMediaQueryList.removeEventListener('change', this.onMediaQueryListChange);
  }
}
