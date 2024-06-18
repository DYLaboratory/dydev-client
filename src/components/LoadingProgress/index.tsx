import { Box, CircularProgress } from "@mui/material";

function LoadingProgress() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={200}
    >
      <CircularProgress size={64} disableShrink thickness={3} />
    </Box>
  )
}

export default LoadingProgress;