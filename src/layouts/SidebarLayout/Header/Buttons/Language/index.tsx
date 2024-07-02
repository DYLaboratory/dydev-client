import { IconButton, Tooltip } from "@mui/material";
import LanguageTwoToneIcon from '@mui/icons-material/LanguageTwoTone';

function HeaderLanguage() {
  const handleToggleLanguage = () => {
    alert('준비중입니다.');
  }

  return (
    <Tooltip arrow title="Language">
      <IconButton color="primary" onClick={handleToggleLanguage}>
        <LanguageTwoToneIcon />
      </IconButton>
    </Tooltip>
  );
}

export default HeaderLanguage;