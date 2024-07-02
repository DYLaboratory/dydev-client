import { Box } from "@mui/material";
import HeaderTheme from "./Theme";
import HeaderLanguage from "src/layouts/SidebarLayout/Header/Buttons/Language";

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      {/*<HeaderSearch />*/}
      {/*<Box sx={{ mx: 0.5 }} component="span">*/}
      {/*  <HeaderNotifications />*/}
      {/*</Box>*/}
      <HeaderLanguage />
      <HeaderTheme />
    </Box>
  );
}

export default HeaderButtons;
