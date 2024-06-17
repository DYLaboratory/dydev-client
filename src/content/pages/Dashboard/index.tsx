import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import FirstCard from 'src/content/pages/Dashboard/FirstCard';
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import PageHeader from "src/components/PageHeader";

function Dashboard() {
  const header = {
    title: "Dashboard",
    subTitle: 'Have a nice day!',
    icon: <DashboardTwoToneIcon fontSize="large" />
  };

  return (
    <>
      <Helmet>
        <title>DYLABO Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={header.title}
          subTitle={header.subTitle}
          icon={header.icon}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}>
          <Grid item xs={12}>
            <FirstCard />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
