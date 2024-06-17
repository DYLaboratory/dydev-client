import { Grid, Typography } from "@mui/material";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import { ReactNode } from "react";
import AvatarIcon from "src/components/AvatarIcon";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  image?: string;
  icon?: ReactNode;
}

function PageHeader() {
  const title = {
    title: "Dashboard",
    subTitle: 'Have a nice day!',
    image: '/static/images/avatars/1.jpg'
  };

  return (
    <Grid container alignItems="center">
      <Grid item>
        <AvatarIcon alt={title.title}>
          <DashboardTwoToneIcon fontSize="large" />
        </AvatarIcon>
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title.title}
        </Typography>
        <Typography variant="subtitle2">{title.subTitle}</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
