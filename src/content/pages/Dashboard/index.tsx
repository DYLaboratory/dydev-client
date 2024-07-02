import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import PageHeader from "src/components/PageHeader";
import WeatherCard from "src/content/pages/Dashboard/WeatherCard";
import { ReactElement } from "react";

function Dashboard() {
  const header = {
    title: "Dashboard",
    subTitle: 'Have a nice day!',
    icon: <DashboardTwoToneIcon fontSize="large" />
  };

  const list: ReactElement[] = [
    <WeatherCard key={0} />
  ]

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
          {list.map((v, i) => {
            return (
              <Grid item md={4} xs={12} key={i}>
                {v}
              </Grid>
            )
          })}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
