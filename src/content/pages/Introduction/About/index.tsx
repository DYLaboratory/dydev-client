import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";
import ProfileCover from "src/content/pages/Introduction/About/ProfileCover";
import ContactMe from "src/content/pages/Introduction/About/ContactMe";
import SkillGroup from "src/content/pages/Introduction/About/SkillGroup";
import PopularTags from "src/content/pages/Introduction/About/PopularTags";

function IntroductionAbout() {
  const user = {
    savedCards: 7,
    name: '이동엽',
    nameEng: "DY Lee",
    coverImg: '/static/images/common/developer.png',
    avatar: '/static/images/avatars/me.jpg',
    description:
      <>
        3년차 개발자로서 적극적이고 목표지향적인 사람입니다.<br/>
        빠른 적응력과 원활한 소통능력으로 조직에 어울릴 수 있습니다.<br/>
        지속적인 발전으로 자신뿐만 아니라 동료와 팀의 성장에 보탬이 되기 위해 노력합니다.
      </>,
    jobtitle: '웹 개발자(Web Developer)',
    location: '대한민국 서울(Seoul, Korea)'
  };

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
              Profile for {user.nameEng}
            </Typography>
            <Typography variant="subtitle2">
              발전과 성장을 지향하는 개발자 이동엽입니다.
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
            <ProfileCover user={user} />
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
