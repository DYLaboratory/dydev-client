import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { NoticeData } from "src/models/data/dataModels";
import { getNoticeById, setInsertNotice } from "src/services/introduction/noticeApi";
import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "src/content/pages/Introduction/Notice/PageHeader";
import Footer from "src/components/Footer";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { URL_INFO } from "src/utils/constants";
import { ListAlt } from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import Editor from "src/components/Editor";
import SaveIcon from "@mui/icons-material/Save";
import { noticeTypeOptions } from "src/content/pages/Introduction/Notice";
import { err400Alert } from "src/utils/errUtils";

const NoticeTitle = () => {
  return (
    <>
      <Typography variant="h5">
        TITLE
      </Typography>
      <TextField
        id="outlined-required"
        fullWidth
        placeholder="Enter Notice Title"
      />
    </>
  )
}

function NoticeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isNew, setNew] = useState<boolean>(true);

  const [notice, setNotice] = useState<NoticeData>({
    noticeType: "NOTICE",
    title: '',
    content: ''
  });

  useEffect(() => {
    if (id) {
      setNew(false);
      getNoticeById(id)
        .then(
          res => {
            setNotice(res.data);
          },
          err => {
            err400Alert(err, '저장 중 오류가 발생하였습니다.');
          }
        );
    } else {
      setNew(true);
    }
  }, []);

  const handleEditorChange = data => {
    setNotice({ ...notice, content: data });
  };

  const handleTitleChange = e => {
    setNotice({ ...notice, title: e.target.value });
  }

  const handleTypeChange = e => {
    setNotice({ ...notice, noticeType: e.target.value });
  }

  const handleClickSaveButton = () => {
    setInsertNotice(notice)
      .then(
        res => {
          alert('저장을 완료하였습니다.');
          navigate(URL_INFO.PAGE.NOTICE);
        },
        err => {
          err400Alert(err, '저장 중 오류가 발생하였습니다.');
        }
      );
  }

  const toList = () => {
    if (confirm("목록으로 돌아가시겠습니까?")) {
      navigate(URL_INFO.PAGE.NOTICE)
    }
  }

  return (
    <>
      <Helmet>
        <title>{isNew ? "Add" : "Edit"} Notice</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader isAdmin={false} />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardHeader title={
                <>
                  <Typography variant="h5">
                    TITLE
                  </Typography>
                  <TextField
                    id="outlined-required"
                    value={notice.title}
                    fullWidth
                    placeholder="Enter Notice Title"
                    onChange={handleTitleChange}
                  />
                </>
              } />
              <Divider />
              <CardContent>
                <Typography variant="h5">
                  CONTENT
                </Typography>
                <Card sx={{ minWidth: 275 }}>
                  <Editor content={notice.content} handleBlur={handleEditorChange} />
                </Card>
              </CardContent>
              <Divider />
              <CardHeader
                title={
                  <>
                    <FormControl variant="outlined">
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={notice.noticeType}
                        onChange={handleTypeChange}
                        label="Status"
                      >
                        {noticeTypeOptions.map(typeOption => (
                          <MenuItem key={typeOption.id} value={typeOption.id}>
                            {typeOption.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Button color="success" onClick={handleClickSaveButton}>
                      <SaveIcon /> SAVE
                    </Button>
                    <Button onClick={toList}>
                      <ListAlt /> LIST
                    </Button>
                  </>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default NoticeEdit;