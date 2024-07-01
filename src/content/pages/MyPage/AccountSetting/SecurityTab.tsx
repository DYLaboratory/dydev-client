import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import { getLoginHistoryList } from "src/services/mypage/accoutApi";
import DialogTitle from "@mui/material/DialogTitle";
import DialogModal from "src/components/DialogModal";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { hasText } from "src/utils/stringUtils";


function SecurityTab() {
  const theme = useTheme();

  // password
  const [pwdModal, setPwdModal] = useState<boolean>(false);
  const [pwd, setPwd] = useState<{
    password: string,
    newPassword: string,
    confirmPassword: string
  }>({
    password: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [visible, setVisible] = useState<{
    pwd: boolean,
    new: boolean,
    confirm: boolean
  }>({
    pwd: false,
    new: false,
    confirm: false
  });

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [pagingParams, setPagingParams] = useState<{
    page: number,
    size: number,
    sort?: string
  }>({
    page: 0,
    size: 5
  });

  const [loginHistoryList, setLoginHistoryList] = useState<{
    id: number,
    accessIp: string,
    history: string,
    historyMessage: string,
    createDateTime: string
  }[]>([]);

  useEffect(() => {
    getLoginHistoryList(pagingParams)
      .then(
        res => {
          setLoginHistoryList(res.data.content);
        },
        err => {
          alert('로그인 내역을 불러오지 못하였습니다.');
        });
  }, []);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleInputChange = e => {
    const changeValue = {};
    changeValue[e.target.name] = e.target.value;
    setPwd({ ...pwd, ...changeValue });
  }

  const handleMouseDownPassword = e => {
    e.preventDefault();
  }

  const handleCloseModal = () => {
    setPwdModal(false);
    setPwd({ password: '', newPassword: '', confirmPassword: '' });
    setVisible({ pwd: false, new: false, confirm: false });
  }

  const handleSavePasswordButton = () => {
    if (!hasText(pwd.password)) {
      alert('Check your password');
      return;
    }

    if (!hasText(pwd.newPassword)) {
      alert('Check new password');
      return;
    }

    if (!hasText(pwd.confirmPassword)) {
      alert('Check confirm password');
      return;
    }
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box pb={2}>
            <Typography variant="h3">Security</Typography>
            <Typography variant="subtitle2">
              Change your security preferences below
            </Typography>
          </Box>
          <Card>
            <List>
              <ListItem sx={{ p: 3 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Change Password"
                  secondary="You can change your password here"
                />
                <Button size="large" variant="outlined" onClick={() => setPwdModal(true)}>
                  Change password
                </Button>
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{ p: 3 }}>
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                  secondaryTypographyProps={{
                    variant: 'subtitle2',
                    lineHeight: 1
                  }}
                  primary="Two-Factor Authentication"
                  secondary="Enable PIN verification for all sign in attempts"
                />
                <Switch color="primary" />
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              subheaderTypographyProps={{}}
              titleTypographyProps={{}}
              title="Access Logs"
              subheader="Recent sign in activity logs"
            />
            <Divider />
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>유형</TableCell>
                    <TableCell>내역</TableCell>
                    <TableCell>접근IP</TableCell>
                    <TableCell>접근일시</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loginHistoryList.map(hist => (
                    <TableRow key={hist.id} hover>
                      <TableCell>{hist.history}</TableCell>
                      <TableCell>{hist.historyMessage}</TableCell>
                      <TableCell>{hist.accessIp}</TableCell>
                      <TableCell>{hist.createDateTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box p={2}>
              <TablePagination
                component="div"
                count={100}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Modal */}
      <DialogModal onClose={handleCloseModal} open={pwdModal}>
        <DialogTitle gutterBottom>
          Change password
        </DialogTitle>
        <ListItem>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">your password</InputLabel>
            <OutlinedInput
              name="password"
              type={visible.pwd ? 'text' : 'password'}
              placeholder="your password"
              fullWidth
              value={pwd.password}
              onChange={handleInputChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible({ ...visible, pwd: !visible.pwd })}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {visible.pwd ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="your password"
            />
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">new password</InputLabel>
            <OutlinedInput
              name="newPassword"
              type={visible.new ? 'text' : 'password'}
              placeholder="new password"
              fullWidth
              value={pwd.newPassword}
              onChange={handleInputChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible({ ...visible, new: !visible.new })}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {visible.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="new password"
            />
          </FormControl>
        </ListItem>

        <ListItem>
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="outlined-adornment-password">confirm password</InputLabel>
            <OutlinedInput
              name="confirmPassword"
              type={visible.confirm ? 'text' : 'password'}
              placeholder="confirm password"
              fullWidth
              value={pwd.confirmPassword}
              onChange={handleInputChange}
              autoComplete="off"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setVisible({ ...visible, confirm: !visible.confirm })}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {visible.confirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirm password"
            />
          </FormControl>
        </ListItem>

        <ListItem>
          <Button color="inherit" onClick={handleCloseModal}>
            <ListItemAvatar>
              <Avatar>
                <CancelIcon/>
              </Avatar>
            </ListItemAvatar>
            <Typography variant="h4">
              CANCEL
            </Typography>
          </Button>
          <Button color="inherit" onClick={handleSavePasswordButton}>
            <ListItemAvatar>
              <Avatar>
                <SaveIcon/>
              </Avatar>
            </ListItemAvatar>
            <Typography variant="h4">
              SAVE
            </Typography>
          </Button>
        </ListItem>
      </DialogModal>
    </>
  );
}

export default SecurityTab;
