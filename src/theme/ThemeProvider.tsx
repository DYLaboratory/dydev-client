import { createContext, ReactElement, useCallback, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { themeCreator } from './base';

export const ThemeContext = createContext((themeName: string): void => {});

function ThemeProviderWrapper(props: { children: ReactElement }) {
  const { children } = props;
  const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';
  const [themeName, _setThemeName] = useState(curThemeName);
  const theme = themeCreator(themeName);
  const setThemeName = useCallback((themeName: string) => {
    localStorage.setItem('appTheme', themeName);
    _setThemeName(themeName);
  }, []);

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={setThemeName}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
}

export default ThemeProviderWrapper;
