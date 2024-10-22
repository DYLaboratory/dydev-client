import DialogTitle from "@mui/material/DialogTitle";
import LoadingProgress from "src/components/LoadingProgress";
import {
  Box,
  Button,
  DialogContent,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import DialogModal from "src/components/DialogModal";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import { FeedData } from "src/models/data/dataModels";
import { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";

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

const ImageItem = styled("img")(() => ({
    width: "180px",
    height: "180px",
    objectFit: "cover",
    margin: "5px",
    flexShrink: 0
  }
));

interface ModalType {
  isNew: boolean;
  isOpen: boolean;
}

interface FeedModalProps {
  modalState: ModalType;
  editLoading: boolean;
  feed: FeedData;
  handleCloseModal: () => void;
  handleInputChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleClickSaveButton: () => void;
}

function FeedModal(props: FeedModalProps) {
  const { handleCloseModal, handleInputChange, handleClickSaveButton, modalState, editLoading, feed } = props;

  const handleCloseModalReset = () => {
    handleCloseModal();
    setImages([]);
  }

  /* 이미지 */
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (images.length + files.length > 5) {
        alert('이미지는 5개까지 등록 가능합니다.');
        return;
      }

      const fileArray = Array.from(files); // 파일들을 배열로 변환
      const newImage: string[] = [];

      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImage.push(reader.result as string);  // 파일의 URL을 배열에 추가
          if (newImage.length === fileArray.length) {
            setImages((prev) => [...prev, ...newImage]); // 모든 파일이 로드되면 상태 업데이트
          }
        };
        reader.readAsDataURL(file);  // 파일을 Data URL로 읽기
      });
    }
  };

  const handleClickAddImage = () => {
    if (fileInputRef.current) {
      if (images.length >= 5) {
        alert('이미지는 5개까지 등록 가능합니다.');
        return;
      }

      fileInputRef.current.click();  // 버튼 클릭 시 input 파일 요소 클릭을 트리거
    }
  };

  const cellSize = ["20%", "80%"];

  return (
    <DialogModal fullWidth maxWidth="lg" scroll="body" onClose={handleCloseModalReset} open={modalState.isOpen}>
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
                  {images.map((image, idx) => (
                    <ImageItem
                      key={idx}
                      src={image}
                      alt={`Thumbnail ${idx + 1}`}
                    />
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
