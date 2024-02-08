export type Theme = 'system' | 'light' | 'dark';

export interface ThemeProvider {
  getCurrentTheme(): Theme;
  setCurrentTheme(theme: Theme): Theme;
  setNextTheme(theme?: Theme): Theme;
}
