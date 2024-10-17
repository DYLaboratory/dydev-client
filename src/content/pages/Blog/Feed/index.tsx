import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Button,
  Container,
  Grid,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';

import Activity from './Activity';
import { useAppSelector } from "src/app/hooks";
import { useSnackbarAlert } from "src/utils/errUtils";
import { useEffect, useState } from "react";
import { FeedData } from "src/models/data/dataModels";
import { getFeedList, setDeleteFeed, setInsertFeed } from "src/services/life/feedApi";
import DialogModal from "src/components/DialogModal";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingProgress from "src/components/LoadingProgress";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import { useTranslation } from "react-i18next";

const TableCellWrapper = styled(TableCell)(`
  border: none;
`);

const ListItemEndWrapper = styled(ListItem)(`
  display: flex;
  justify-content: flex-end;
`);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

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
    content: ''
  }

  const [feed, setFeed] = useState<FeedData>(initialFeedData);
  const [feeds, setFeeds] = useState<FeedData[]>([]);

  useEffect(() => {
    setFetchLoading(true);
    fetchFeedList();
  }, []);

  // get (s)
  const fetchFeedList = async () => {
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

  // insert / update (s)
  const handleInputChange = e => {
    const changeValue = {};
    changeValue[e.target.name] = e.target.value;
    setFeed({ ...feed, ...changeValue });
  }

  const handleClickSaveButton = () => {
    setEditLoading(true);
    if (modalState.isNew) {
      setInsertFeed(feed)
        .then(
          () => {
            successAlert('등록을 완료하였습니다.');
            setEditLoading(false);
            handleCloseModal();
            getFeedList();
          },
          () => {
            errAlert('등록 중 오류가 발생하였습니다.');
            setEditLoading(false);
          }
        );
    }
  }
  // insert / update (e)

  // delete (s)
  const handleDeleteButton = (id: number) => {
    if (confirm('해당 피드를 삭제하시겠습니까?')) {
      setFetchLoading(true);
      setDeleteFeed(id)
        .then(
          () => {
            successAlert('삭제를 완료하였습니다.');
            setFetchLoading(false);
            getFeedList();
          },
          () => {
            errAlert('삭제 중 오류가 발생하였습니다.');
            setFetchLoading(false);
          }
        );
    }
  }

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
                  <Activity key={f.id} feed={f}/>
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
      <DialogModal fullWidth maxWidth="lg" scroll="body" onClose={handleCloseModal} open={modalState.isOpen}>
        <DialogTitle gutterBottom>
          {modalState.isNew ? "Add New Feed" : "Edit Feed"}
        </DialogTitle>
        {editLoading && <LoadingProgress />}

        {!editLoading &&
          <>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCellWrapper width="5%">
                    <Typography variant="h4" component="h4">
                      title
                    </Typography>
                  </TableCellWrapper>
                  <TableCellWrapper width="95%">
                    <OutlinedInputWrapper
                      name="title"
                      type="text"
                      placeholder="Title"
                      value={feed.title}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </TableCellWrapper>
                </TableRow>
                <TableRow>
                  <TableCellWrapper width="5%">
                    <Typography variant="h4" component="h4">
                      content
                    </Typography>
                  </TableCellWrapper>
                  <TableCellWrapper width="95%">
                    <OutlinedInputWrapper
                      name="content"
                      type="text"
                      placeholder="Content"
                      value={feed.content}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </TableCellWrapper>
                </TableRow>
                <TableRow>
                  <TableCellWrapper width="5%">
                    <Typography variant="h4" component="h4">
                      place
                    </Typography>
                  </TableCellWrapper>
                  <TableCellWrapper width="95%">
                    <OutlinedInputWrapper
                      name="place"
                      type="text"
                      placeholder="place"
                      value={feed.place}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </TableCellWrapper>
                </TableRow>
                <TableRow>
                  <TableCellWrapper width="5%">
                    <Typography variant="h4" component="h4">
                      link
                    </Typography>
                  </TableCellWrapper>
                  <TableCellWrapper width="95%">
                    <OutlinedInputWrapper
                      name="link"
                      type="text"
                      placeholder="link"
                      value={feed.link}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </TableCellWrapper>
                </TableRow>
              </TableBody>
            </Table>
            <ListItemEndWrapper>
              <Button color="inherit" onClick={handleCloseModal}>
                <ListItemAvatar>
                  <Avatar>
                    <CancelIcon/>
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="h4">
                  CANCEL
                </Typography>
              </Button>
              <Button color="inherit" onClick={handleClickSaveButton}>
                <ListItemAvatar>
                  <Avatar>
                    <SaveIcon/>
                  </Avatar>
                </ListItemAvatar>
                <Typography variant="h4">
                  SAVE
                </Typography>
              </Button>
            </ListItemEndWrapper>
          </>
        }
      </DialogModal>
    </>
  );
}

export default Feed;
