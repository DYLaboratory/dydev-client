import { useRoutes } from "react-router-dom";
import router from "src/router";

import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import ThemeProvider from "./theme/ThemeProvider";
import { SnackbarProvider } from "notistack";
import { saveAccess } from "src/services/common/commonApi";
import { useEffect } from "react";

function App() {
  const content = useRoutes(router);

  useEffect(() => {
    saveAccess();
  }, [])

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CssBaseline />
          {content}
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;
