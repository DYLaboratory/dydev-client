import { Avatar, Box, Button, Card, CardHeader, Divider, Grid, Typography } from '@mui/material';

function AboutSite() {
  const site = [
    {
      name: 'About',
      jobtitle: '사이트 소개',
      company: 'INTRODUCTION',
      avatar: '/static/images/avatars/1.jpg'
    },
    {
      name: 'Introduction',
      jobtitle: '개발자 소개',
      company: 'INTRODUCTION',
      avatar: '/static/images/avatars/2.jpg'
    },
    {
      name: 'Notice',
      jobtitle: '공지사항',
      company: 'NOTICE',
      avatar: '/static/images/avatars/2.jpg'
    },
    {
      name: 'Feed',
      jobtitle: '오늘의 피드',
      company: 'BLOG',
      avatar: '/static/images/avatars/3.jpg'
    },
    {
      name: 'Blog',
      jobtitle: '블로그',
      company: 'BLOG',
      avatar: '/static/images/avatars/4.jpg'
    },
    {
      name: 'Crissy Spere',
      jobtitle: 'Social Worker',
      company: 'Babbleblab',
      avatar: '/static/images/avatars/5.jpg'
    },
    {
      name: 'Michel Greatbanks',
      jobtitle: 'Research Assistant III',
      company: 'Aimbu',
      avatar: '/static/images/avatars/6.jpg'
    }
  ];

  return (
    <Card>
      <CardHeader title="메뉴 목록" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {site.map((_site) => (
            <Grid key={_site.name} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_site.avatar} />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {_site.company}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {_site.name}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {_site.jobtitle}
                  </Typography>
                  <Button variant="outlined" size="small">
                    이동
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}

export default AboutSite;
