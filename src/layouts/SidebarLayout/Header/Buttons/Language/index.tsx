import { IconButton, Tooltip } from "@mui/material";
import LanguageTwoToneIcon from "@mui/icons-material/LanguageTwoTone";
import { useTranslation } from "react-i18next";

function HeaderLanguage() {
  const { t, i18n } = useTranslation();

  const handleToggleLanguage = () => {
    let lang = 'ko';

    if (i18n.language === 'ko') {
      lang = 'en';
    } else {
      lang = 'ko';
    }

    i18n.changeLanguage(lang);
  }

  return (
    <Tooltip arrow title={t(`tooltip.changeLanguage`)}>
      <IconButton color="primary" onClick={handleToggleLanguage}>
        <LanguageTwoToneIcon />
      </IconButton>
    </Tooltip>
  );
}

export default HeaderLanguage;