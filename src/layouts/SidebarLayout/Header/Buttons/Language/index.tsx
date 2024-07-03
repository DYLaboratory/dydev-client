import { IconButton, Tooltip } from "@mui/material";
import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";
import { useTranslation } from "react-i18next";

function HeaderLanguage() {
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = () => {
    let lang = 'en';

    // storage에서 가져오기
    const appLang = localStorage.getItem('appLang');

    if (!appLang || appLang === 'en') {
      lang = 'ko';
    } else {
      lang = 'en'
    }

    // 스토리지 값 세팅
    localStorage.setItem('appLang', lang);

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }

  return (
    <Tooltip arrow title={t(`tooltip.change_language`)}>
      <IconButton color="primary" onClick={handleToggleLanguage}>
        <LanguageTwoToneIcon />
      </IconButton>
    </Tooltip>
  );
}

export default HeaderLanguage;