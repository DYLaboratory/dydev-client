import { ChangeEvent, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import { NoticeData, NoticeTypes } from "src/models/data/dataModels";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { noticeTypeOptions } from "src/content/pages/Introduction/Notice/index";

interface Filters {
  type?: NoticeTypes;
}

const TableBottomBox = styled(Box)(
  `
    display: flex;
    justify-content: space-between;
  `
)

const applyFilters = (notices: NoticeData[], filters: Filters): NoticeData[] => {
  return notices.filter(notice => {
    let matches = true;

    if (filters.type && notice.noticeType !== filters.type) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  notices: NoticeData[],
  page: number,
  limit: number
): NoticeData[] => {
  return notices.slice(page * limit, page * limit + limit);
};

interface RecentOrdersTableProps {
  notices: NoticeData[];
}

function NoticeTable(props: RecentOrdersTableProps) {
  const { notices } = props;

  const navigate = useNavigate();

  // paging
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'ALL') {
      value = e.target.value;
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      type: value
    }));
  };

  const handlePageChange = (event, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredCryptoOrders = applyFilters(notices, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );

  return (
    <Card>
      <CardHeader
        action={
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Type</InputLabel>
              <Select
                value={filters.type || 'ALL'}
                onChange={handleStatusChange}
                label="Status"
                autoWidth>
                <MenuItem key="ALL" value="ALL">
                  All
                </MenuItem>
                {noticeTypeOptions.map(typeOption => (
                  <MenuItem key={typeOption.id} value={typeOption.id}>
                    {typeOption.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        title="Notice"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="5%">#</TableCell>
              <TableCell width="10%">Type</TableCell>
              <TableCell>Title</TableCell>
              <TableCell width="20%">Date</TableCell>
              <TableCell width="15%">Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    variant="body1"
                    color="text.primary"
                    gutterBottom
                    noWrap>
                    No Data
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {paginatedCryptoOrders.map((notice, idx) => {
              return (
                <TableRow hover key={notice.id} onClick={() => navigate("/introduction/notice/" + notice.id)}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {idx + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
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
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {notice.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {notice.createDateTime.substring(0, 10)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {notice.createUserId}
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableBottomBox p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </TableBottomBox>
    </Card>
  );
}

export default NoticeTable;
