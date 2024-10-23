import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import CommentTwoToneIcon from '@mui/icons-material/CommentTwoTone';
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone';
import Text from 'src/components/Text';
import { FeedData } from "src/models/data/dataModels";
import { convertDatePattern } from "src/utils/stringUtils";
import URL_INFO from "../../../../utils/constants/urlInfo";
import { CONSTANTS } from "src/utils/constants";

const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(3)};
`
);

const ImageBox = styled(Box)(`
  display: flex;
  scroll-behavior: smooth;
  white-space: nowrap;
  padding: 20px;
`);

const ImageContainer = styled('img')(() => ({
  width: "260px",
  height: "260px",
  marginRight: "20px"
}));

interface FeedActivityProps {
  feed: FeedData
}

function Activity(props: FeedActivityProps) {
  const { feed } = props;

  return (
    <Card>
      <CardHeader
        avatar={<Avatar src="/static/images/avatars/me.jpg" />}
        action={
          <IconButton color="primary">
            <MoreHorizTwoToneIcon fontSize="medium" />
          </IconButton>
        }
        titleTypographyProps={{ variant: 'h4' }}
        subheaderTypographyProps={{ variant: 'subtitle2' }}
        title="DY Lee"
        subheader={
          <>
            Project Manager,{' '}
            <Link href="#" underline="hover">
              #developer
            </Link>
          </>
        }
      />
      <Box px={3} pb={2}>
        <Typography variant="h4" fontWeight="normal">
          {feed.title}
        </Typography>
      </Box>
      {/*<CardMedia*/}
      {/*  sx={{ minHeight: 280 }}*/}
      {/*  image="/static/images/placeholders/covers/6.jpg"*/}
      {/*  title="Card Cover"*/}
      {/*/>*/}
      <ImageBox>
        {feed.fileList.map(file =>
          <ImageContainer key={file.id} src={CONSTANTS.API_V1_BASE_URL + URL_INFO.API_V1.FILE + "/image/" + file.id} alt="" />
        )}
      </ImageBox>
      <Box p={3}>
        <Typography variant="h2" sx={{ pb: 1 }}>
          {feed.content}
        </Typography>
        <Typography variant="subtitle2">
          <Link href="#" underline="hover">
            {feed.link}
          </Link>{' '}
          • {convertDatePattern("dateTime", feed.createDateTime)}
        </Typography>
      </Box>
      <Divider />
      <CardActionsWrapper
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Box>
          <Button startIcon={<ThumbUpAltTwoToneIcon />} variant="contained">
            Like
          </Button>
          <Button
            startIcon={<CommentTwoToneIcon />}
            variant="outlined"
            sx={{ mx: 2 }}>
            Comment
          </Button>
          <Button startIcon={<ShareTwoToneIcon />} variant="outlined">
            Share
          </Button>
        </Box>
        <Box sx={{ mt: { xs: 2, md: 0 } }}>
          <Typography variant="subtitle2" component="span">
            <Text color="black">
              <b>485</b>
            </Text>{' '}
            reactions •{' '}
            <Text color="black">
              <b>63</b>
            </Text>{' '}
            comments
          </Typography>
        </Box>
      </CardActionsWrapper>
    </Card>
  );
}

export default Activity;
