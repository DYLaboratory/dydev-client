import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "src/content/pages/Introduction/Notice/PageHeader";
import { useAppSelector } from "src/app/hooks";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getNoticeById } from "src/services/introduction/noticeApi";
import { NoticeData, NoticeTypes } from "src/models/data/dataModels";
import { Button, Card, CardContent, CardHeader, Container, Divider, Grid, Typography } from "@mui/material";
import parse from "html-react-parser";
import Footer from "src/components/Footer";
import { ListAlt } from "@mui/icons-material";
import { URL_INFO } from "src/utils/constants";
import LoadingProgress from "src/components/LoadingProgress";

const NoticeTitle = (props: { type: NoticeTypes, title: string }) => {
  const { type, title } = props;

  return (
    <Typography variant="h4">
      [{type}] {title}
    </Typography>
  )
}

const NoticeSubTitle = (props: { dateTime: string }) => {
  const { dateTime } = props;

  let date = '';
  let time = '';

  if (dateTime) {
    const dateSplit = dateTime.split("T");
    date = dateSplit[0];
    time = dateSplit[1];
  }

  return (
    <Typography variant="h5" align={"right"}>
      {date} {time}
    </Typography>
  )
}

function NoticeView() {
  const isAdmin = useAppSelector(state => state.user).isAdmin;

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  const [notice, setNotice] = useState<NoticeData>({
    noticeType: null,
    title: '',
    content: '',
    viewCount: 0
  });

  useEffect(() => {
    getNoticeById(id)
      .then(
        res => {
          setNotice(res.data);
          setLoading(false);
        },
        err => {
          alert(err.response.data.message);
          navigate(URL_INFO.PAGE.NOTICE);
          setLoading(false);
        }
      );
  }, []);

  return (
    <>
      <Helmet>
        <title>Notice</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader isAdmin={isAdmin} />
      </PageTitleWrapper>
      {loading && <LoadingProgress />}

      {!loading &&
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={<NoticeTitle type={notice.noticeType} title={notice.title} />}
                  subheader={<NoticeSubTitle dateTime={notice.createDateTime} />}
                />
                <Divider />
                <CardContent>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      {parse(notice.content)}
                    </CardContent>
                  </Card>
                </CardContent>
                <Divider />
                <CardHeader
                  title={
                    <Button variant="outlined" onClick={() => navigate(URL_INFO.PAGE.NOTICE)}>
                      <ListAlt /> LIST
                    </Button>}
                />
              </Card>
            </Grid>
          </Grid>
        </Container>
      }
      <Footer />
    </>
  )
}

export default NoticeView;