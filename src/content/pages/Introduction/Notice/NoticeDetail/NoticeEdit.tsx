import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { NoticeData } from "src/models/data/dataModels";
import { getNoticeById, setInsertNotice, setUpdateNotice } from "src/services/introduction/noticeApi";
import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "src/content/pages/Introduction/Notice/PageHeader";
import Footer from "src/components/Footer";
import {
  Box,
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
import TextField from "@mui/material/TextField";
import Editor from "src/components/Editor";
import SaveAsTwoToneIcon from "@mui/icons-material/SaveAsTwoTone";
import ListAltTwoToneIcon from "@mui/icons-material/ListAltTwoTone";
import { noticeTypeOptions } from "src/content/pages/Introduction/Notice";
import { useErrAlert } from "src/utils/errUtils";
import { hasText } from "src/utils/stringUtils";
import LoadingProgress from "src/components/LoadingProgress";

function NoticeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { err400Alert } = useErrAlert();

  const [isNew, setNew] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const [notice, setNotice] = useState<NoticeData>({
    noticeType: "NOTICE",
    title: '',
    content: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      setNew(false);
      getNoticeById(id)
        .then(
          res => {
            setNotice(res.data);
            setLoading(false);
          },
          err => {
            err400Alert(err, '저장 중 오류가 발생하였습니다.');
            setLoading(false);
          }
        );
    } else {
      setLoading(false);
      setNew(true);
    }
  }, []);

  // 유효성 체크
  const validateNotice = (): boolean => {
    // 제목
    if (!hasText(notice.title)) {
      alert('제목을 입력하세요.');
      return false;
    }

    // 내용
    if (!hasText(notice.content)) {
      alert('내용을 입력하세요.');
      return false;
    }

    return true;
  }

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
    if (!validateNotice()) return;

    if (isNew) {
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
    } else {
      setUpdateNotice(notice)
        .then(
          res => {
            alert('저장을 완료하였습니다.');
            navigate(URL_INFO.PAGE.NOTICE + "/" + id);
          },
          err => {
            err400Alert(err, '저장 중 오류가 발생하였습니다.');
          }
        );
    }
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
            {loading && <LoadingProgress />}
            {!loading &&
              <Card>
                <CardHeader title={isNew ? "ADD NOTICE" : "EDIT NOTICE"} />
                <Divider />
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
                    <Box display="flex" alignItems="center">
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
                        <SaveAsTwoToneIcon /> SAVE
                      </Button>
                      <Button onClick={toList}>
                        <ListAltTwoToneIcon /> LIST
                      </Button>
                    </Box>
                  }
                />
              </Card>
            }
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}

export default NoticeEdit;