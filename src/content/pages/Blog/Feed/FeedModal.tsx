import DialogTitle from "@mui/material/DialogTitle";
import LoadingProgress from "src/components/LoadingProgress";
import { Box, Button, OutlinedInput, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DialogModal from "src/components/DialogModal";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import { FeedData, FileData } from "src/models/data/dataModels";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";
import { hasText } from "src/utils/stringUtils";
import { setInsertFeed, setUpdateFeed } from "src/services/life/feedApi";
import { useSnackbarAlert } from "src/utils/errUtils";
import { CONSTANTS } from "src/utils/constants";
import URL_INFO from "../../../../utils/constants/urlInfo";

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

const ImageBox = styled(Box)(`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
  max-width: 100%;
`);

const ImageItem = styled(Box)(`
  position: relative;
  width: 180px;
  height: 180px;
  margin: 10px;
  flex-shrink: 0;
`);

const FeedImage = styled("img")(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover"
}));

const RemoveImageButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: '-10px',
  right: '-10px',
  backgroundColor: theme.palette.primary.dark,  // 기본 색상
  color: 'white',
  border: 'none',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',  // 부드러운 전환
  '&:hover': {
    backgroundColor: 'red',  // 호버 시 색상 변경
  }
}));

interface ModalType {
  isNew: boolean;
  isOpen: boolean;
}

interface FileType {
  seq: number;
  file: File;
  id?: number;
}

interface FeedModalProps {
  modalState: ModalType;
  editLoading: boolean;
  setEditLoading: (loading: boolean) => void;
  feed: FeedData;
  setFeed: (prev: FeedData) => void;
  fetchFeedList: () => void;
  handleCloseModal: () => void;
  handleInputChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

function FeedModal(props: FeedModalProps) {
  const { modalState, editLoading, setEditLoading, feed, setFeed, fetchFeedList, handleCloseModal, handleInputChange } = props;

  const { successAlert, errAlert } = useSnackbarAlert();

  const handleCloseModalReset = () => {
    handleCloseModal();
    setUploadImages([]);
  }

  /* 이미지 */
  const [uploadImages, setUploadImages] = useState<FileType[]>([]);
  const [thumbnails, setThumbnails] = useState<(FileType | FileData)[]>(feed.fileList);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (uploadImages.length + feed.fileList.length + files.length > 5) {
        alert('이미지는 5개까지 등록 가능합니다.');
        return;
      }

      const newImages = Array.from(files)
        .map((f, idx) => (
          { seq: thumbnails.length + idx + 1, file: f }
        ));

      setUploadImages([...uploadImages, ...newImages]);
      setThumbnails([...thumbnails, ...newImages]);
    }
  };

  const handleClickAddImage = () => {
    if (fileInputRef.current) {
      if (uploadImages.length + feed.fileList.length                                                                                                                       >= 5) {
        alert('이미지는 5개까지 등록 가능합니다.');
        return;
      }

      fileInputRef.current.click();  // 버튼 클릭 시 input 파일 요소 클릭을 트리거
    }
  };

  const handleClickRemoveImage = (id: number, seq: number) => {
    setUploadImages(uploadImages.filter(image => image.seq !== seq));
    setThumbnails(thumbnails.filter(t => t.seq !== seq));

    if (id) {
      setFeed(
        {
          ...feed,
          deleteFiles: [ ...(feed?.deleteFiles), { id: id }]
        }
      );
    }
  }

  // insert / update (s)
  const handleClickSaveButton = () => {
    // validate
    if (!hasText(feed.title)) {
      alert('제목을 입력하세요.');
      return;
    } else if (!hasText(feed.content)) {
      alert('내용을 입력하세요.');
      return;
    } else if (uploadImages.length === 0) {
      alert('이미지를 등록하세요.');
      return;
    }

    setEditLoading(true);

    // convert
    const formData = new FormData();

    uploadImages.forEach(image => {
      formData.append('uploadFiles', image.file);
    }); // image

    // save
    if (modalState.isNew) {
      formData.append('feed', new Blob([JSON.stringify(feed)], { type: 'application/json' })); // feed

      setInsertFeed(formData)
        .then(
          () => {
            successAlert('등록을 완료하였습니다.');
            setEditLoading(false);
            handleCloseModal();
            fetchFeedList();
          },
          () => {
            errAlert('등록 중 오류가 발생하였습니다.');
            setEditLoading(false);
          }
        );
    } else {
      const insertFiles = thumbnails.filter(f => !f.id);
      const updateFiles = thumbnails.filter(f => f.id);

      const data = {
        ...feed,
        insertFiles: insertFiles,
        updateFiles: updateFiles
      }

      formData.append('feed', new Blob([JSON.stringify(data)], { type: 'application/json' })); // feed

      setUpdateFeed(feed.id, formData)
        .then(
          () => {
            successAlert('수정을 완료하였습니다.');
            setEditLoading(false);
            handleCloseModal();
            fetchFeedList();
          },
          () => {
            errAlert('수정 중 오류가 발생하였습니다.');
            setEditLoading(false);
          }
        );
    }
  }
  // insert / update (e)

  // table column size
  const cellSize = ["20%", "80%"];

  return (
    <DialogModal
      fullWidth
      maxWidth="lg"
      scroll="body"
      onClose={handleCloseModalReset}
      open={modalState.isOpen}
      closeAfterTransition={false}>
      <DialogTitle gutterBottom>
        {modalState.isNew ? "Add New Feed" : "Edit Feed"}
      </DialogTitle>
      {editLoading && <LoadingProgress />}

      {!editLoading &&
      <>
        <Table style={{ tableLayout: "fixed", width: "100%" }}>
          <TableBody>
            <TableRow>
              <TableCellWrapper width={cellSize[0]}>
                <Typography variant="h4" component="h4">
                  title
                </Typography>
              </TableCellWrapper>
              <TableCellWrapper width={cellSize[1]}>
                <OutlinedInputWrapper
                  name="title"
                  type="text"
                  placeholder="Title"
                  value={feed.title}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{
                    maxLength: 50
                  }}
                />
                <Typography align="right">
                  {feed.title.length}/50
                </Typography>
              </TableCellWrapper>
            </TableRow>
            <TableRow>
              <TableCellWrapper width={cellSize[0]}>
                <Typography variant="h4" component="h4">
                  content
                </Typography>
              </TableCellWrapper>
              <TableCellWrapper width={cellSize[1]}>
                <OutlinedInputWrapper
                  name="content"
                  type="text"
                  placeholder="Content"
                  value={feed.content}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={4}
                  inputProps={{
                    maxLength: 400
                  }}
                />
                <Typography align="right">
                  {feed.content.length}/400
                </Typography>
              </TableCellWrapper>
            </TableRow>
            <TableRow>
              <TableCellWrapper width={cellSize[0]}>
                <Typography variant="h4" component="h4">
                  place
                </Typography>
              </TableCellWrapper>
              <TableCellWrapper width={cellSize[1]}>
                <OutlinedInputWrapper
                  name="place"
                  type="text"
                  placeholder="place"
                  value={feed.place}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{
                    maxLength: 30
                  }}
                />
                <Typography align="right">
                  {feed.place ? feed.place.length : 0}/30
                </Typography>
              </TableCellWrapper>
            </TableRow>
            <TableRow>
              <TableCellWrapper width={cellSize[0]}>
                <Typography variant="h4" component="h4">
                  link
                </Typography>
              </TableCellWrapper>
              <TableCellWrapper width={cellSize[1]}>
                <OutlinedInputWrapper
                  name="link"
                  type="text"
                  placeholder="link"
                  value={feed.link}
                  onChange={handleInputChange}
                  fullWidth
                  inputProps={{
                    maxLength: 200
                  }}
                />
                <Typography align="right">
                  {feed.link ? feed.link.length : 0}/200
                </Typography>
              </TableCellWrapper>
            </TableRow>
            <TableRow>
              <TableCellWrapper width={cellSize[0]}>
                <Typography variant="h4" component="h4">
                  images
                </Typography>
              </TableCellWrapper>
              <TableCellWrapper width={cellSize[1]}>
                <ImageBox>
                  {thumbnails.map((image, idx) => (
                    <ImageItem key={idx}>
                      <FeedImage
                        key={idx}
                        src={
                          image.id
                            ? CONSTANTS.API_V1_BASE_URL + URL_INFO.API_V1.FILE + "/image/" + image.id
                            : URL.createObjectURL(image.file)
                        }
                        alt={`Thumbnail ${idx + 1}`}
                      />
                      <RemoveImageButton onClick={() => handleClickRemoveImage(image.id, image.seq)}>X</RemoveImageButton>
                    </ImageItem>
                  ))}
                </ImageBox>
                <Button onClick={handleClickAddImage}>
                  ADD IMAGE
                </Button>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} hidden multiple />
              </TableCellWrapper>
            </TableRow>
          </TableBody>
        </Table>
        <ListItemEndWrapper>
          <Button color="inherit" onClick={handleCloseModalReset}>
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
  );
}

export default FeedModal;
