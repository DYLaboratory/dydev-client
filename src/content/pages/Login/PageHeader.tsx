import { Box } from "@mui/material";
import Logo from "src/components/LogoSign";

function PageHeader() {
  return (
    <Box
      mx={2}
      sx={{
        width: 52
      }}>
      <Logo isTheme />
    </Box>
  );
}

export default PageHeader;
