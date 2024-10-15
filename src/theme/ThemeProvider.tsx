import { createContext, ReactElement, useCallback, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { StylesProvider } from '@mui/styles';
import { themeCreator } from './base';

export const ThemeContext = createContext((themeName: string): void => {});

const themeList = ['PureLightTheme', 'NebularFighterTheme'];

const APP_THEME = 'appTheme';

function ThemeProviderWrapper(props: { children: ReactElement }) {
  const { children } = props;

  const appTheme = localStorage.getItem(APP_THEME);

  const curThemeName = themeList.includes(appTheme) && appTheme || themeList[0];

  const [themeName, _setThemeName] = useState<string>(curThemeName);

  const theme = themeCreator(themeName);

  const setThemeName = useCallback((themeName: string) => {
    localStorage.setItem(APP_THEME, themeName);
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
