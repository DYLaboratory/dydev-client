import { Typography } from '@mui/material';
import { useTranslation } from "react-i18next";

function PageHeader() {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        {t(`feed.title`)}
      </Typography>
      <Typography variant="subtitle2">
        {t(`feed.subtitle`)}
      </Typography>
    </>
  );
}

export default PageHeader;
