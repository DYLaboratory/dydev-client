import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';

import Activity from './Activity';

function Feed() {
  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12}>
            <Activity />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Feed;
