import { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { useAppSelector } from "src/app/hooks";
import { SiteData, SiteTypes } from "src/models/data/dataModels";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import { getWebSiteList, setDeleteWebSite, setInsertWebSite, setUpdateWebSite } from "src/services/others/webSiteApi";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

interface Filters {
  type?: SiteTypes;
}

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

const TableBottomBox = styled(Box)(
  `
    display: flex;
    justify-content: space-between;
  `
)

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

function RecentOrdersTable() {
  const isLogin = useAppSelector(state => state.user).isLogin;

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;

  const [sites, setSites] = useState<SiteData[]>([]);

  const getSiteList = () => {
    getWebSiteList()
      .then(
        res => setSites(res.data)
      );
  }

  useEffect(() => {
    getSiteList();
  }, []);

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

  // modal
  const initialModalState: { isNew: boolean, isOpen: boolean } = {
    isNew: true,
    isOpen: false
  }
  const [modalState, setModalState] = useState<{ isNew: boolean, isOpen: boolean }>(initialModalState);

  // insert (s)
  const initialWebSite: SiteData = {
    webSiteType: "DEVELOP",
    name: null,
    description: null,
    url: null
  };

  const [webSite, setWebSite] = useState<SiteData>(initialWebSite);

  const handleTypeChange = e => {
    setWebSite({ ...webSite, webSiteType: e.target.value });
  }

  const handleClickSaveButton = () => {
    if (modalState.isNew) {
      setInsertWebSite(webSite)
        .then(
          () => {
            alert('등록을 완료하였습니다.');
            setModalState(initialModalState);
            getSiteList();
          },
          () => {
            alert('등록 중 오류가 발생하였습니다.');
          }
        );
    } else {
      setUpdateWebSite(webSite)
        .then(
          () => {
            alert('수정을 완료하였습니다.');
            setModalState(initialModalState);
            getSiteList();
          },
          () => {
            alert('수정 중 오류가 발생하였습니다.')
          }
        );
    }
  }
  // insert (e)

  // update (s)
  const handleOpenEditModal = site => {
    setModalState({ isNew: false, isOpen: true });
    setWebSite(site);
  }
  // update (e)

  // delete (s)
  const handleDeleteButton = id => {
    if (confirm('해당 웹사이트를 삭제하시겠습니까?')) {
      setDeleteWebSite(id)
        .then(
          () => {
            alert('삭제를 완료 하였습니다.');
            getSiteList();
          },
          () => alert('삭제 중 오류가 발생하였습니다.')
        );
    }
  }
  // delete (e)

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
                          onClick={() => handleDeleteButton(site.id)}
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
        {isLogin &&
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => setModalState({ ...modalState, isOpen: true })}
          >
            Add WebSite
          </Button>
        }
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

      {/* modal */}
      <Dialog onClose={() => setModalState({ ...modalState, isOpen: false })} open={modalState.isOpen}>
        <DialogTitle gutterBottom>
          {modalState.isNew ? "Add New Web Site" : "Edit Web Site"}
        </DialogTitle>
        <List sx={{ pt: 0 }}>
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
              type="text"
              placeholder="Web Site Name"
              value={webSite.name}
              onChange={e => setWebSite({ ...webSite, name: e.target.value })}
            />
          </ListItemWrapper>

          <ListItemWrapper>
            <Typography variant="h4" component="h4">
              description
            </Typography>
            <OutlinedInputWrapper
              type="text"
              placeholder="Web Site Description"
              value={webSite.description}
              onChange={e => setWebSite({ ...webSite, description: e.target.value })}
            />
          </ListItemWrapper>

          <ListItemWrapper>
            <Typography variant="h4" component="h4">
              url
            </Typography>
            <OutlinedInputWrapper
              type="text"
              placeholder="Web Site URL"
              value={webSite.url}
              onChange={e => setWebSite({ ...webSite, url: e.target.value })}
            />
          </ListItemWrapper>

          <ListItemEndWrapper>
            <Button color={"inherit"} onClick={handleClickSaveButton}>
              <ListItemAvatar>
                <Avatar>
                  <SaveIcon />
                </Avatar>
              </ListItemAvatar>
              <Typography variant="h4">
                SAVE
              </Typography>
            </Button>
          </ListItemEndWrapper>
        </List>
      </Dialog>
    </Card>
  );
}

export default RecentOrdersTable;
