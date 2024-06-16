import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";

import { useEffect, useState } from "react";
import { NoticeData, NoticeTypes } from "src/models/data/dataModels";
import { useAppSelector } from "src/app/hooks";
import { getNoticeList } from "src/services/introduction/noticeApi";
import NoticeTable from "src/content/pages/Introduction/Notice/NoticeTable";
import { err400Alert } from "src/utils/errUtils";

export const noticeTypeOptions: { id: NoticeTypes; name: string }[] = [
  {
    id: 'NOTICE',
    name: 'Notice'
  },
  {
    id: 'VERSION',
    name: 'Version'
  },
  {
    id: 'ETC',
    name: 'etc'
  }
];

function NoticeList() {
  const isAdmin = useAppSelector(state => state.user).isAdmin;

  const [notices, setNotices] = useState<NoticeData[]>([]);

  useEffect(() => {
    fetchNoticeList();
  }, []);

  // get (s)
  const fetchNoticeList = () => {
    getNoticeList()
      .then(
        res => setNotices(res.data),
        err => err400Alert(err, "공지사항 목록을 불러오지 못하였습니다.")
      );
  }
  // get (e)

  return (
    <>
      <Helmet>
        <title>Notice</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader isAdmin={isAdmin} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12}>
            <NoticeTable
              notices={notices}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default NoticeList;
