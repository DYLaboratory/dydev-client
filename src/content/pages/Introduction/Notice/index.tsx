import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Container, Grid } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";

import { useEffect, useState } from "react";
import { NoticeData, NoticeTypes, Paging } from "src/models/data/dataModels";
import { useAppSelector } from "src/app/hooks";
import { getNoticeList } from "src/services/introduction/noticeApi";
import NoticeTable from "src/content/pages/Introduction/Notice/NoticeTable";
import { useSnackbarAlert } from "src/utils/errUtils";
import LoadingProgress from "src/components/LoadingProgress";

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

  const { errAlert } = useSnackbarAlert();

  const [loading, setLoading] = useState<boolean>(true);

  const [notices, setNotices] = useState<NoticeData[]>([]);

  const paging: Paging = {
    sort: "createDateTime,desc"
  }

  useEffect(() => {
    setLoading(true);
    fetchNoticeList();
  }, []);

  // get (s)
  const fetchNoticeList = async () => {
    await getNoticeList({}, paging)
      .then(
        res => {
          setNotices(res.data.content);
          setLoading(false);
        },
        err => {
          errAlert("공지사항 목록을 불러오지 못하였습니다.");
          setLoading(false);
        }
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
              <NoticeTable
                notices={notices}
              />
            </Grid>
          </Grid>
        </Container>
      }
      <Footer />
    </>
  );
}

export default NoticeList;
