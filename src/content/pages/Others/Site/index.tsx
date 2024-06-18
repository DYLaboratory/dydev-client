import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@mui/material";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";

import { useEffect, useState } from "react";
import { SiteData, SiteTypes } from "src/models/data/dataModels";
import WebSiteTable from "src/content/pages/Others/Site/WebSiteTable";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import {
  getWebSiteList,
  setDeleteWebSite,
  setDeleteWebSiteList,
  setInsertWebSite,
  setUpdateWebSite
} from "src/services/others/webSiteApi";
import { useAppSelector } from "src/app/hooks";
import { err400Alert } from "src/utils/errUtils";
import LoadingProgress from "src/components/LoadingProgress";

const ListItemWrapper = styled(ListItem)(`
  display: flex;
  justify-content: space-between;
`);

const ListItemEndWrapper = styled(ListItem)(`
  display: flex;
  justify-content: flex-end;
`);

const FormControlWrapper = styled(FormControl)(
  `margin-left: 20px;`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    margin-left: 20px;
    background-color: ${theme.colors.alpha.white[100]};
`
);

const saveTypeOptions: { id: SiteTypes; name: string; }[] = [
  {
    id: 'DEVELOP',
    name: 'Develop'
  },
  {
    id: 'REFERENCE',
    name: 'Reference'
  },
  {
    id: 'USEFUL',
    name: 'Useful'
  },
  {
    id: 'ENTERTAIN',
    name: 'Entertain'
  },
  {
    id: 'ETC',
    name: 'etc'
  }
];

interface ModalType {
  isNew: boolean;
  isOpen: boolean;
}

function SiteList() {
  const isAdmin = useAppSelector(state => state.user).isAdmin;

  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);

  // modal
  const initialModalState: ModalType = {
    isNew: true,
    isOpen: false
  }

  const [modalState, setModalState] = useState<ModalType>(initialModalState);

  const [sites, setSites] = useState<SiteData[]>([]);

  useEffect(() => {
    setFetchLoading(true);
    getSiteList();
  }, []);

  const handleCloseModal = () => {
    setModalState(initialModalState);
    setWebSite(initialWebSite);
  }

  // get (s)
  const getSiteList = () => {
    getWebSiteList()
      .then(
        res => {
          setSites(res.data);
          setFetchLoading(false);
        },
        err => {
          err400Alert(err, "웹 사이트 목록을 불러오지 못하였습니다.");
          setFetchLoading(false);
        }
      );
  }
  // get (e)

  // insert / update (s)
  const initialWebSite: SiteData = {
    webSiteType: "DEVELOP",
    name: '',
    description: '',
    url: ''
  };

  const [webSite, setWebSite] = useState<SiteData>(initialWebSite);

  const handleTypeChange = e => {
    setWebSite({ ...webSite, webSiteType: e.target.value });
  }

  const handleInputChange = e => {
    const changeValue = {};
    changeValue[e.target.name] = e.target.value;
    setWebSite({ ...webSite, ...changeValue });
  }

  const handleClickSaveButton = () => {
    setEditLoading(true);
    if (modalState.isNew) {
      setInsertWebSite(webSite)
        .then(
          () => {
            alert('등록을 완료하였습니다.');
            setEditLoading(false);
            handleCloseModal();
            getSiteList();
          },
          () => {
            alert('등록 중 오류가 발생하였습니다.');
            setEditLoading(false);
          }
        );
    } else {
      setUpdateWebSite(webSite)
        .then(
          () => {
            alert('수정을 완료하였습니다.');
            setEditLoading(false);
            handleCloseModal();
            getSiteList();
          },
          () => {
            alert('수정 중 오류가 발생하였습니다.')
            setEditLoading(false);
          }
        );
    }
  }
  // insert / update (e)

  // delete (s)
  const handleDeleteButton = (id: number) => {
    if (confirm('해당 웹사이트를 삭제하시겠습니까?')) {
      setFetchLoading(true);
      setDeleteWebSite(id)
        .then(
          () => {
            alert('삭제를 완료하였습니다.');
            setFetchLoading(false);
            getSiteList();
          },
          () => {
            alert('삭제 중 오류가 발생하였습니다.');
            setFetchLoading(false);
          }
        );
    }
  }

  const handleDeleteListButton = (idList: number[]) => {
    if (confirm('선택한 리스트를 삭제하시겠습니까?')) {
      setFetchLoading(true);
      setDeleteWebSiteList(idList)
        .then(
          () => {
            alert('삭제를 완료하였습니다.');
            setFetchLoading(false);
            getSiteList();
          },
          () => {
            alert('삭제 중 오류가 발생하였습니다.');
            setFetchLoading(false);
          }
        )
    }
  }
  // delete (e)

  return (
    <>
      <Helmet>
        <title>Web Site</title>
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
              <WebSiteTable
                isAdmin={isAdmin}
                onOpenModal={setModalState}
                setWebSite={setWebSite}
                sites={sites}
                handleDeleteSite={handleDeleteButton}
                handleDeleteSiteList={handleDeleteListButton}
              />
            </Grid>
          </Grid>
        </Container>
      }
      <Footer />

      {/* modal */}
      <Dialog onClose={handleCloseModal} open={modalState.isOpen}>
        <DialogTitle gutterBottom>
          {modalState.isNew ? "Add New Web Site" : "Edit Web Site"}
        </DialogTitle>
        {editLoading && <LoadingProgress />}

        {!editLoading &&
          <List sx={{pt: 0}}>
            <ListItemWrapper>
              <Typography variant="h4" component="h4">
                type
              </Typography>
              <FormControlWrapper variant="outlined">
                <InputLabel>Type</InputLabel>
                <Select
                  value={webSite.webSiteType}
                  onChange={handleTypeChange}
                  label="Status"
                  autoWidth>
                  {saveTypeOptions.map(typeOption => (
                    <MenuItem key={typeOption.id} value={typeOption.id}>
                      {typeOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControlWrapper>
            </ListItemWrapper>

            <ListItemWrapper>
              <Typography variant="h4" component="h4">
                name
              </Typography>
              <OutlinedInputWrapper
                name="name"
                type="text"
                placeholder="Web Site Name"
                value={webSite.name}
                onChange={handleInputChange}
              />
            </ListItemWrapper>

            <ListItemWrapper>
              <Typography variant="h4" component="h4">
                description
              </Typography>
              <OutlinedInputWrapper
                name="description"
                type="text"
                placeholder="Web Site Description"
                value={webSite.description}
                onChange={handleInputChange}
              />
            </ListItemWrapper>

            <ListItemWrapper>
              <Typography variant="h4" component="h4">
                url
              </Typography>
              <OutlinedInputWrapper
                name="url"
                type="text"
                placeholder="Web Site URL"
                value={webSite.url}
                onChange={handleInputChange}
              />
            </ListItemWrapper>

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
          </List>
        }
      </Dialog>
    </>
  );
}

export default SiteList;
