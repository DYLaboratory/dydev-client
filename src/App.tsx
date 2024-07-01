import { useRoutes } from "react-router-dom";
import router from "src/router";

import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import ThemeProvider from "./theme/ThemeProvider";
import { SnackbarProvider } from "notistack";

function App() {
  const content = useRoutes(router);

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
