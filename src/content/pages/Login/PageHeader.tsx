import { Box, Typography } from "@mui/material";
import Logo from "src/components/LogoSign";

function PageHeader() {
  const title = {
    title: 'DYLABO'
  };

  return (
    <Box
      mx={2}
      sx={{
        width: 52
      }}>
      <Logo />
    </Box>
  );
}

export default PageHeader;
