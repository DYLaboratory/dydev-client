import { Grid, Typography } from "@mui/material";

function PageHeader() {
  const title = {
    title: 'Web Site List',
    subTitle: 'These are reference web sites'
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3">
          {title.title}
        </Typography>
        <Typography variant="subtitle2">{title.subTitle}</Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
