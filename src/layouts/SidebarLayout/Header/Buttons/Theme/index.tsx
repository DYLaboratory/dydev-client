import { IconButton, Tooltip } from '@mui/material';
import { useContext, useState } from 'react';
import { ContrastTwoTone } from '@mui/icons-material';
import { ThemeContext } from 'src/theme/ThemeProvider';
import { themeType } from 'src/theme/base';
import { useTranslation } from "react-i18next";

function HeaderTheme() {
  const { t } = useTranslation();

  const themeContext = useContext(ThemeContext);
  const [theme, setTheme] = useState<string>(themeType.light);

  const handleToggleTheme = () => {
    const appTheme = localStorage.getItem('appTheme');

    if (!appTheme || appTheme === themeType.light) {
      themeContext(themeType.dark);
      setTheme(themeType.dark);
    } else {
      themeContext(themeType.light);
      setTheme(themeType.light);
    }
  };

  return (
    <Tooltip
      arrow
      title={theme === themeType.light ? t(`tooltip.darkMode`) : t(`tooltip.lightMode`)}>
      <IconButton color="primary" onClick={handleToggleTheme}>
        <ContrastTwoTone />
      </IconButton>
    </Tooltip>
  );
}

export default HeaderTheme;
