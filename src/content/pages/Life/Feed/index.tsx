import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import { Box, Container, Grid, Typography } from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";

import Activity from "./Activity";
import { useAppSelector } from "src/app/hooks";
import { useSnackbarAlert } from "src/utils/errUtils";
import { useEffect, useState } from "react";
import { FeedData } from "src/models/data/dataModels";
import { getFeedList, setDeleteFeed } from "src/services/life/feedApi";
import LoadingProgress from "src/components/LoadingProgress";
import { useTranslation } from "react-i18next";
import FeedModal from "src/content/pages/Life/Feed/FeedModal";
import styled from "@emotion/styled";

const ActivityCard = styled(Box)`
  margin-bottom: 20px;
`;

interface ModalType {
  isNew: boolean;
  isOpen: boolean;
}

function Feed() {
  const isAdmin = useAppSelector(state => state.user).isAdmin;

  const { t } = useTranslation();

  const { successAlert, errAlert } = useSnackbarAlert();

  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  const initialFeedData: FeedData = {
    title: '',
    content: '',
    place: '',
    link: '',
    fileList: []
  }

  const [feed, setFeed] = useState<FeedData>(initialFeedData);
  const [feeds, setFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    setFetchLoading(true);
    fetchFeedList();
  }, []);

  // get (s)
  const fetchFeedList = async () => {
    setFetchLoading(true);

    await getFeedList()
      .then(
        res => {
          setFeeds(res.data);
          setFetchLoading(false);
        },
        err => {
          errAlert("피드 목록을 불러오지 못하였습니다.");
          setFetchLoading(false);
        }
      );
  }
  // get (e)

  // change input (s)
  const handleInputChange = e => {
    const changeValue = {};
    changeValue[e.target.name] = e.target.value;
    setFeed({ ...feed, ...changeValue });
  }
  // change input (e)

  // modal (s)
  const initialModalState: ModalType = {
    isNew: true,
    isOpen: false
  }

  const [modalState, setModalState] = useState<ModalType>(initialModalState);

  const handleCloseModal = () => {
    setModalState(initialModalState);
    setFeed(initialFeedData);
  }
  // modal (e)

  // edit (s)
  const handleEditFeed = (id: number) => {
    setModalState({
      isNew: false,
      isOpen: true
    });

    setFeed(feeds.find(f => f.id === id));
  }

  const handleDeleteFeed = (id: number) => {
    if (confirm('피드를 삭제하시겠습니까?')) {
      setDeleteFeed(id)
        .then(
          () => {
            successAlert('피드를 삭제하였습니다.');
            fetchFeedList();
          },
          () => {
            errAlert('피드 삭제 중 오류가 발생하였습니다.');
          }
        );
    }
  }
  // edit (e)

  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader isAdmin={isAdmin} onOpenModal={setModalState} />
      </PageTitleWrapper>
      {fetchLoading && <LoadingProgress />}
      {!fetchLoading &&
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}>
            <Grid item xs={12}>
              {
                feeds.map((f, idx) =>
                  <ActivityCard key={f.id}>
                    <Activity
                      feed={f}
                      handleEditFeed={() => handleEditFeed(f.id)}
                      handleDeleteFeed={() => handleDeleteFeed(f.id)}
                    />
                  </ActivityCard>
                )
              }
              {
                feeds.length === 0 &&
                  <Typography variant="h3" component="h3">
                    {t(`message.no-feed`)}
                  </Typography>
              }
            </Grid>
          </Grid>
        </Container>
      }
      <Footer />

      {/* modal */}
      <FeedModal
        modalState={modalState}
        editLoading={editLoading}
        setEditLoading={setEditLoading}
        feed={feed}
        setFeed={setFeed}
        fetchFeedList={fetchFeedList}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
      />
    </>
  );
}

export default Feed;
