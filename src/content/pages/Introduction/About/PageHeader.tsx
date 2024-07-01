import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AvatarIcon from "src/components/AvatarIcon";

function PageHeader() {
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
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          About Me
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
