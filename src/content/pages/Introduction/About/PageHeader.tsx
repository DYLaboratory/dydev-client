import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AvatarIcon from "src/components/AvatarIcon";
import { useTranslation } from "react-i18next";

function PageHeader() {
  const { t } = useTranslation();

  const user = {
    name: "DYLABO",
    avatarLight: '/static/images/dylabo/main-logo.png',
    avatarDark: '/static/images/dylabo/main-logo-dark.png'
  };

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <AvatarIcon
          alt={user.name}
          image={theme.palette.mode === "dark" ? user.avatarLight : user.avatarDark}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {t(`about.title`)}
        </Typography>
        <Typography variant="subtitle2">
          {t(`about.subtitle`)}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
