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
import { ReactElement, useEffect, useState } from "react";

interface UserTypes {
  name: string;
  fullName: string;
  coverImg: string;
  avatar: string;
  mainDesc: string;
  desc: ReactElement;
  jobtitle: string;
  location: string;
}

function IntroductionAbout() {
  const { i18n } = useTranslation();

  const userKor: UserTypes = {
    name: '이동엽',
    fullName: '이동엽',
    coverImg: '/static/images/common/developer.png',
    avatar: '/static/images/avatars/me.jpg',
    mainDesc: '발전과 성장을 지향하는 개발자 이동엽입니다.',
    desc:
      <>
        - 3년차 개발자로서 적극적이고 목표지향적인 사람입니다.<br/>
        - 빠른 적응력과 원활한 소통능력으로 조직에 어울릴 수 있습니다.<br/>
        - 지속적인 발전으로 자신뿐만 아니라 동료와 팀의 성장에 보탬이 되기 위해 노력합니다.
      </>,
    jobtitle: '웹 개발자',
    location: '대한민국 서울'
  };

  const userEng: UserTypes = {
    name: "DY Lee",
    fullName: "Dong-yeop Lee",
    coverImg: '/static/images/common/developer.png',
    avatar: '/static/images/avatars/me.jpg',
    mainDesc: 'I’m a web developer specializing in Java, dedicated to continuous growth and development.',
    desc:
      <>
        - I&apos;m a proactive and goal-oriented person with three years of experience as a web developer.<br/>
        - With my quick adaptability and effective communication skills, I can fit well within any organization.<br/>
        - I strive for continuous improvement to contribute to the growth of not only myself but also my colleagues and team.
      </>,
    jobtitle: 'Web Developer',
    location: 'Seoul, Korea'
  }

  const [user, setUser] = useState<UserTypes>(userEng);

  useEffect(() => {
    if (i18n.language === 'en') {
      setUser(userEng);
    } else {
      setUser(userKor);
    }
  }, [i18n.language]);

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
              Profile for {user.name}
            </Typography>
            <Typography variant="subtitle2">
              {user.mainDesc}
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
              coverImg={user.coverImg}
              avatar={user.avatar}
              name={user.name}
              fullName={user.fullName}
              description={user.desc}
              jobtitle={user.jobtitle}
              location={user.location}
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
