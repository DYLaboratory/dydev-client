import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {
  const title = {
    title: 'Web Site List',
    subTitle: 'These are reference web sites'
  }

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title.title}
        </Typography>
        <Typography variant="subtitle2">
          {title.subTitle}
        </Typography>
      </Grid>
      {/*<Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add WebSite
        </Button>
      </Grid>*/}
    </Grid>
  );
}

export default PageHeader;
