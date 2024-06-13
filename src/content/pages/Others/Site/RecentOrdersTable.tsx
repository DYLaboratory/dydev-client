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
import PropTypes from "prop-types";
import BulkActions from "./BulkActions";
import { useAppSelector } from "src/app/hooks";
import { SiteData, SiteTypes } from "src/models/data/dataModels";

interface RecentOrdersTableProps {
  // className?: string;
  sites: SiteData[];
}

interface Filters {
  type?: SiteTypes;
}

const applyFilters = (sites: SiteData[], filters: Filters): SiteData[] => {
  return sites.filter(site => {
    let matches = true;

    if (filters.type && site.type !== filters.type) {
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

function RecentOrdersTable({ sites }: RecentOrdersTableProps) {
  const isLogin = useAppSelector(state => state.user).isLogin;

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    type: null
  });

  const typeOptions: { id: SiteTypes | 'all'; name: string }[] = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'develop',
      name: 'Develop'
    },
    {
      id: 'reference',
      name: 'Reference'
    },
    {
      id: 'useful',
      name: 'Useful'
    },
    {
      id: 'entertain',
      name: 'Entertain'
    },
    {
      id: 'etc',
      name: 'etc'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
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
                  value={filters.type || 'all'}
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
                <TableCell colSpan={6} align="center">
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
                      {site.type}
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
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
}

RecentOrdersTable.propTypes = {
  sites: PropTypes.array.isRequired
};

export default RecentOrdersTable;
