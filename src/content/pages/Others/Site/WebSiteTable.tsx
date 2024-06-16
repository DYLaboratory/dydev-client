import { ChangeEvent, useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
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
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import { SiteData, SiteTypes } from "src/models/data/dataModels";
import { styled } from "@mui/material/styles";

interface Filters {
  type?: SiteTypes;
}

const TableBottomBox = styled(Box)(
  `
    display: flex;
    justify-content: space-between;
  `
)

const applyFilters = (sites: SiteData[], filters: Filters): SiteData[] => {
  return sites.filter(site => {
    let matches = true;

    if (filters.type && site.webSiteType !== filters.type) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  sites: SiteData[],
  page: number,
  limit: number
): SiteData[] => {
  return sites.slice(page * limit, page * limit + limit);
};

interface RecentOrdersTableProps {
  isAdmin: boolean;
  onOpenModal: (modalState: { isNew: boolean, isOpen: boolean }) => void;
  setWebSite: (webSite: SiteData) => void;
  sites: SiteData[];
  handleDeleteSite: (id: number) => void;
  handleDeleteSiteList: (idList: number[]) => void;
}

function WebSiteTable(props: RecentOrdersTableProps) {
  const { isAdmin, onOpenModal, setWebSite, sites, handleDeleteSite, handleDeleteSiteList } = props;

  const [selectedWebSiteList, setSelectedWebSiteList] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedWebSiteList.length > 0;

  // paging
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });

  // filter
  const typeOptions: { id: SiteTypes | 'ALL'; name: string }[] = [
    {
      id: 'ALL',
      name: 'All'
    },
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

  const handleSelectAllWebSiteList = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedWebSiteList(
      event.target.checked ? sites.map(site => site.id) : []
    );
  };

  const handleSelectOneWebSite = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: number
  ): void => {
    if (!selectedWebSiteList.includes(cryptoOrderId)) {
      setSelectedWebSiteList(prevSelected => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedWebSiteList(prevSelected =>
        prevSelected.filter(id => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value, 10));
  };

  const filteredWebSiteList = applyFilters(sites, filters);
  const paginatedWebSiteList = applyPagination(
    filteredWebSiteList,
    page,
    limit
  );
  const selectedSomeWebSiteList =
    selectedWebSiteList.length > 0 &&
    selectedWebSiteList.length < sites.length;
  const selectedAllWebSiteList = selectedWebSiteList.length === sites.length;
  const theme = useTheme();

  // update (s)
  const handleOpenEditModal = site => {
    onOpenModal({ isNew: false, isOpen: true });
    setWebSite(site);
  }
  // update (e)

  // delete (s)
  const handleClickDeleteListButton = async () => {
    await handleDeleteSiteList(selectedWebSiteList);
    setSelectedWebSiteList([]);
  }
  // delete (e)

  return (
    <Card>
      {isAdmin && selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions onClickDeleteButton={handleClickDeleteListButton} />
        </Box>
      )}
      {!selectedBulkActions && (
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
                  {typeOptions.map(typeOption => (
                    <MenuItem key={typeOption.id} value={typeOption.id}>
                      {typeOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Web Sites"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {isAdmin &&
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllWebSiteList}
                    indeterminate={selectedSomeWebSiteList}
                    onChange={handleSelectAllWebSiteList}
                  />
                </TableCell>
              }
              <TableCell>#</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>URL</TableCell>
              {isAdmin &&
                <TableCell align="right">Actions</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWebSiteList.length === 0 && (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7 : 6} align="center">
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
            {paginatedWebSiteList.map((site, idx) => {
              const isCryptoOrderSelected = selectedWebSiteList.includes(
                site.id
              );
              return (
                <TableRow hover key={site.id} selected={isCryptoOrderSelected}>
                  {isAdmin &&
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isCryptoOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneWebSite(event, site.id)
                        }
                        value={isCryptoOrderSelected}
                      />
                    </TableCell>
                  }
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
                      {site.webSiteType}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {site.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      {site.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer">
                        {site.url}
                      </a>
                    </Typography>
                  </TableCell>
                  {isAdmin &&
                    <TableCell align="right">
                      <Tooltip title="Edit Order" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleOpenEditModal(site)}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteSite(site.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TableBottomBox p={2}>
        <TablePagination
          component="div"
          count={filteredWebSiteList.length}
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

export default WebSiteTable;
