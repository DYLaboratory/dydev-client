import { ReactNode, useEffect } from "react";
import { alpha, Box, CircularProgress, lighten, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import { getUserAsync } from "src/features/user/userSlice";
import { setLoading } from "src/features/loading/loadingSlice";
import { useNavigate } from "react-router";

const LoadingComponent = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%'
      }}
      display="flex"
      alignItems="center"
      justifyContent="center">
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  )
}

interface WithAuthComponentProps {
  isAdmin: boolean;
}

function WithAuthComponent({ isAdmin }: WithAuthComponentProps) {
  if (isAdmin) {
    return <Outlet />;
  } else {
    return <LoadingComponent />;
  }
}

interface SidebarLayoutProps {
  withAuth?: boolean;
  children?: ReactNode;
}

function SidebarLayout({ withAuth, children }: SidebarLayoutProps) {
  const theme = useTheme();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const isAdmin = useAppSelector(state => state.user).isAdmin;
  const isLoading = useAppSelector(state => state.loading).isLoading;

  useEffect(() => {
    dispatch(getUserAsync())
      .then(() => {
        dispatch(setLoading(true));
      });
  }, []);

  useEffect(() => {
    if (isLoading && withAuth && !isAdmin) {
      alert('비정상적인 접근입니다.');
      navigate('/');
    }
  }, [isLoading]);

  return (
    <Box
      sx={{
        flex: 1,
        height: '100%',

        '.MuiPageTitle-wrapper': {
          background:
            theme.palette.mode === 'dark'
              ? theme.colors.alpha.trueWhite[5]
              : theme.colors.alpha.white[50],
          marginBottom: `${theme.spacing(4)}`,
          boxShadow:
            theme.palette.mode === 'dark'
              ? `0 1px 0 ${alpha(
                  lighten(theme.colors.primary.main, 0.7),
                  0.15
                )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
              : `0px 2px 4px -3px ${alpha(
                  theme.colors.alpha.black[100],
                  0.1
                )}, 0px 5px 12px -4px ${alpha(
                  theme.colors.alpha.black[100],
                  0.05
                )}`
        }
      }}>
      <Header />
      <Sidebar />
      <Box
        sx={{
          position: 'relative',
          zIndex: 5,
          display: 'block',
          flex: 1,
          pt: `${theme.header.height}`,
          [theme.breakpoints.up('lg')]: {
            ml: `${theme.sidebar.width}`
          }
        }}>
        <Box display="block">
          {isLoading
            ? withAuth
              ? <WithAuthComponent isAdmin={isAdmin} />
              : <Outlet />
            : <LoadingComponent />
          }
        </Box>
      </Box>
    </Box>
  );
}

export default SidebarLayout;
