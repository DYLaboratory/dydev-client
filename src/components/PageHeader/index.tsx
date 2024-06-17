import { Avatar, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactNode } from "react";
import AvatarIcon from "src/components/AvatarIcon";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  image?: string;
  icon?: ReactNode;
}

function PageHeader(props: PageHeaderProps) {
  const { title, subTitle, image, icon } = props;

  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      {(image || icon) &&
        <Grid item>
          {image &&
            <Avatar
              sx={{
                mr: 2,
                width: theme.spacing(8),
                height: theme.spacing(8)
              }}
              variant="rounded"
              alt={title}
              src={image}
            />
          }
          {icon &&
            <AvatarIcon alt={title}>
              {icon}
            </AvatarIcon>
          }
        </Grid>
      }
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle2">{subTitle}</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
