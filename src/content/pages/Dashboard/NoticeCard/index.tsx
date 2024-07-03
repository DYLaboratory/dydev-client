import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import { getNoticeList } from "src/services/introduction/noticeApi";
import { NoticeData } from "src/models/data/dataModels";
import { useSnackbarAlert } from "src/utils/errUtils";
import DashboardCard from "src/content/pages/Dashboard/DashboardCard";

const PointerTableRow = styled(TableRow)`
  cursor: pointer;
`

function NoticeCard() {
  const navigate = useNavigate();

  const theme = useTheme();

  const { errAlert } = useSnackbarAlert();

  const [loading, setLoading] = useState<boolean>(true);

  const [notices, setNotices] = useState<NoticeData[]>([]);

  const paging = {
    page: 0,
    size: 3,
    sort: 'createDateTime,desc'
  }

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

  useEffect(() => {
    fetchNoticeList();
  }, []);

  return (
    <DashboardCard title="공지사항" loading={loading} url="/introduction/notice">
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="10%" align="center">Type</TableCell>
              <TableCell>Title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notices.length === 0 &&
            <TableRow>
              <TableCell colSpan={2} align="center">
                <Typography
                  variant="body1"
                  color="text.primary"
                  gutterBottom
                  noWrap>
                  No Data
                </Typography>
              </TableCell>
            </TableRow>
            }
            {notices.map(notice => {
              return (
                <PointerTableRow hover onClick={() => navigate("/introduction/notice/" + notice.id)}>
                  <TableCell align="center">
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {notice.noticeType}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}{notice.title}
                    </Typography>
                  </TableCell>
                </PointerTableRow>
              )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  )
}

export default NoticeCard;