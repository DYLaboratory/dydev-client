import DashboardCard from "src/content/pages/Dashboard/DashboardCard";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";

function AboutCard() {
  const { t } = useTranslation();

  return (
    <DashboardCard title={t(`sideMenu.about`)} url="/introduction/about">
      <Box display="flex" flexDirection="column" justifyContent="space-between">
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {t(`main.greeting`)}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {t(`main.subGreeting1`)}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {t(`main.subGreeting2`)}
          </Typography>
          <Typography variant="subtitle2" gutterBottom>
            {t(`main.subGreeting3`)}
          </Typography>
        </Box>
        <Button
          href="/introduction/about"
          target="_blank"
          rel="noopener noreferrer"
          variant="contained"
          color="primary"
          size="medium"
          fullWidth>
          ABOUT ME
        </Button>
      </Box>
    </DashboardCard>
  )
}

export default AboutCard;
