import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const title = {
    title: 'Welcome, DY\'s Space',
    subTitle: 'Today is a good day!',
    image: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      {/*<Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={title.title}
          src={title.image}
        />
      </Grid>*/}
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {title.title}!
        </Typography>
        <Typography variant="subtitle2">
          {title.subTitle}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
