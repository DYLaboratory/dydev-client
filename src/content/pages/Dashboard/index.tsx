import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import PageHeader from "src/components/PageHeader";
import WeatherCard from "src/content/pages/Dashboard/WeatherCard";
import { ReactElement } from "react";
import NoticeCard from "src/content/pages/Dashboard/NoticeCard";
import { useTranslation } from "react-i18next";
import AboutCard from "src/content/pages/Dashboard/AboutCard";

function Dashboard() {
  const { t } = useTranslation();

  const header = {
    title: t(`dashboard.title`) ,
    subTitle: t(`dashboard.subtitle`),
    icon: <DashboardTwoToneIcon fontSize="large" />
  };

  const list: ReactElement[] = [
    <AboutCard key={0} />,
    <NoticeCard key={1} />,
    <WeatherCard key={2} />
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
              <Grid item xs={12} md={4} key={i}>
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
