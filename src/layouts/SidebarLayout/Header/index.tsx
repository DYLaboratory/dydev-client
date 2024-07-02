import { useContext } from "react";

import { alpha, Box, Button, Divider, IconButton, lighten, Stack, styled, Tooltip, useTheme } from "@mui/material";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { SidebarContext } from "src/contexts/SidebarContext";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { useAppSelector } from "src/app/hooks";
import HeaderUserbox from "./Userbox";
import HeaderButtons from "./Buttons";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        background-color: ${alpha(theme.header.background, 0.95)};
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: 100%;
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            left: ${theme.sidebar.width};
            width: auto;
        }
`
);

function Header() {
  const isLogin = useAppSelector(state => state.user).isLogin;

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const theme = useTheme();

  const handleClickSignIn = () => {
    navigate('/login');
  }

  return (
    <HeaderWrapper
      display="flex"
      alignItems="center"
      sx={{
        boxShadow:
          theme.palette.mode === 'dark'
            ? `0 1px 0 ${alpha(
                lighten(theme.colors.primary.main, 0.7),
                0.15
              )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
            : `0px 2px 8px -3px ${alpha(theme.colors.alpha.black[100], 0.2)}, 0px 5px 22px -4px ${alpha(
                theme.colors.alpha.black[100],
                0.1
              )}`
      }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        alignItems="center"
        spacing={2}>
        {/* <HeaderMenu /> */}
      </Stack>
      <Box display="flex" alignItems="center">
        <HeaderButtons />
        {isLogin
          ? <HeaderUserbox />
          :
          <Box sx={{ m: 1 }}>
            <Button color="primary" fullWidth onClick={handleClickSignIn}>
              <LockTwoToneIcon sx={{ mr: 1 }} />
              {t(`header.signIn`)}
            </Button>
          </Box>
        }
        <Box
          component="span"
          sx={{
            ml: 2,
            display: { lg: 'none', xs: 'inline-block' }
          }}>
          <Tooltip arrow title="Toggle Menu">
            <IconButton color="primary" onClick={toggleSidebar}>
              {!sidebarToggle ? (
                <MenuTwoToneIcon fontSize="small" />
              ) : (
                <CloseTwoToneIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
