import { Avatar, Box, Card, CardHeader, Divider, styled, Typography, useTheme } from "@mui/material";

import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import { useSnackbar } from "notistack";

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function ContactMe() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const email = "ldy033000@gmail.com";

  const copyToClipboard = async type => {
    let text;

    try {
      switch(type) {
        case 'email':
          text = email;
          break;
        default:
          text = '';
      }

      await navigator.clipboard.writeText(text);

      enqueueSnackbar(
        '클립보드에 복사하였습니다.',
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 1000
        }
      );
    } catch (err) {
      alert('클립보드에 저장하지 못하였습니다.');
    }
  }

  return (
    <Card>
      <CardHeader title="Contact Me" />
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <EmailTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1} >
          <Typography variant="h3">EMAIL</Typography>
          <Typography gutterBottom display="flex" alignItems="center">
            {email}&nbsp;
            <ContentCopyTwoToneIcon fontSize="small" cursor="pointer" onClick={() => copyToClipboard("email")}/>
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <FavoriteTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Favourites</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}>
                Products
              </Typography>
              <Typography variant="h2">64</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}>
                Lists
              </Typography>
              <Typography variant="h2">15</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <StarTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography variant="h3">Reviews</Typography>

          <Box pt={2} display="flex">
            <Box pr={8}>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}>
                Total
              </Typography>
              <Typography variant="h2">654</Typography>
            </Box>
            <Box>
              <Typography
                gutterBottom
                variant="caption"
                sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}>
                Useful
              </Typography>
              <Typography variant="h2">21</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default ContactMe;
