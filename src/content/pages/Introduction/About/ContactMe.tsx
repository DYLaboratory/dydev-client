import { Avatar, Box, Card, CardHeader, Divider, Link, styled, Typography, useTheme } from "@mui/material";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import ContentCopyTwoToneIcon from "@mui/icons-material/ContentCopyTwoTone";
import GitHubIcon from "@mui/icons-material/GitHub";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
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

  const content = {
    email: "ldy033000@gmail.com",
    github: "https://github.com/leedy-dev",
    linkedIn: "https://www.linkedin.com/in/lee-dy"
  }

  const copyToClipboard = async text => {
    try {
      await navigator.clipboard.writeText(text);

      enqueueSnackbar(
        '클립보드에 복사하였습니다.',
        {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 2000
        }
      );
    } catch (err) {
      enqueueSnackbar(
        '클립보드에 저장하지 못하였습니다.',
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          autoHideDuration: 2000
        }
      );
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
          <Typography variant="h3">Email</Typography>
          <Typography gutterBottom display="flex" alignItems="center">
            Gmail&nbsp;
            <ContentCopyTwoToneIcon fontSize="small" cursor="pointer" onClick={() => copyToClipboard(content.email)}/>
          </Typography>
        </Box>
      </Box>
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <GitHubIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1} >
          <Typography variant="h3">Github</Typography>
          <Typography gutterBottom display="flex" alignItems="center">
            <Link href={content.github} target="_blank" rel="noopener noreferrer">Github Profile</Link>&nbsp;
            <ContentCopyTwoToneIcon fontSize="small" cursor="pointer" onClick={() => copyToClipboard(content.github)}/>
          </Typography>
        </Box>
      </Box>
      <Box px={2} py={4} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <TableChartTwoToneIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1} >
          <Typography variant="h3">LinkedIn</Typography>
          <Typography gutterBottom display="flex" alignItems="center">
            <Link href={content.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn Profile</Link>&nbsp;
            <ContentCopyTwoToneIcon fontSize="small" cursor="pointer" onClick={() => copyToClipboard(content.linkedIn)}/>
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default ContactMe;
