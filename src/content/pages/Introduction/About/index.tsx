import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";
import ProfileCover from "src/content/pages/Introduction/About/ProfileCover";
import ContactMe from "src/content/pages/Introduction/About/ContactMe";
import SkillGroup from "src/content/pages/Introduction/About/SkillGroup";
import PopularTags from "src/content/pages/Introduction/About/PopularTags";
import { useTranslation } from "react-i18next";
import { ReactElement } from "react";

function IntroductionAbout() {
  const { t } = useTranslation();

  const userInfo = {
    coverImg: '/static/images/common/developer.png',
    avatar: '/static/images/avatars/me.jpg',
  };

  const desc: ReactElement =
      <>
        {t(`myInfo.desc1`)}<br/>
        {t(`myInfo.desc2`)}<br/>
        {t(`myInfo.desc3`)}
      </>

  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Box display="flex" mb={3}>
          <Box>
            <Typography variant="h3" component="h3" gutterBottom>
              Profile for {t(`myInfo.name`)}
            </Typography>
            <Typography variant="subtitle2">
              {t(`myInfo.mainDesc`)}
            </Typography>
          </Box>
        </Box>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}>
          <Grid item xs={12} md={8}>
            <ProfileCover
              coverImg={userInfo.coverImg}
              avatar={userInfo.avatar}
              name={t(`myInfo.name`)}
              fullName={t(`myInfo.fullName`)}
              description={desc}
              jobTitle={t(`myInfo.jobTitle`)}
              location={t(`myInfo.location`)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ContactMe />
          </Grid>
          <Grid item xs={12} md={10}>
            <SkillGroup />
          </Grid>
          <Grid item xs={12} md={2}>
            <PopularTags />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default IntroductionAbout;
