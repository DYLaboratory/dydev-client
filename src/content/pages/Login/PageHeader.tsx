import { Typography } from '@mui/material';

function PageHeader() {
  const title = {
    title: "DY Laboratory"
  }

  return (
    <>
      <Typography variant="h2" component="h3" gutterBottom>
        {title.title}
      </Typography>
    </>
  );
}

export default PageHeader;
