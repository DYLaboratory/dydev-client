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
  isLogin: boolean;
  onOpenModal: (modalState: { isNew: boolean, isOpen: boolean }) => void;
  setWebSite: (webSite: SiteData) => void;
  sites: SiteData[];
  handleDeleteSite: (id: number) => void;
}

function RecentOrdersTable(props: RecentOrdersTableProps) {
  const { isLogin, onOpenModal, setWebSite, sites, handleDeleteSite } = props;

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;

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

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked ? sites.map(site => site.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: number
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders(prevSelected => [...prevSelected, cryptoOrderId]);
    } else {
      setSelectedCryptoOrders(prevSelected =>
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

  const filteredCryptoOrders = applyFilters(sites, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < sites.length;
  const selectedAllCryptoOrders = selectedCryptoOrders.length === sites.length;
  const theme = useTheme();

  // update (s)
  const handleOpenEditModal = site => {
    onOpenModal({ isNew: false, isOpen: true });
    setWebSite(site);
  }
  // update (e)

  return (
    <Card>
      {isLogin && selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
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
              {isLogin &&
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={selectedAllCryptoOrders}
                    indeterminate={selectedSomeCryptoOrders}
                    onChange={handleSelectAllCryptoOrders}
                  />
                </TableCell>
              }
              <TableCell>#</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>URL</TableCell>
              {isLogin &&
                <TableCell align="right">Actions</TableCell>
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={isLogin ? 7 : 6} align="center">
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
            {paginatedCryptoOrders.map((site, idx) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                site.id
              );
              return (
                <TableRow hover key={site.id} selected={isCryptoOrderSelected}>
                  {isLogin &&
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isCryptoOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneCryptoOrder(event, site.id)
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
                  {isLogin &&
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

export default RecentOrdersTable;
