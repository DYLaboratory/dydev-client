import PropTypes from "prop-types";
import { Avatar, Box, Card, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

function ProfileCover({ user }) {
  return (
    <>
      <Box display="flex" mb={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Profile for {user.nameEng}
          </Typography>
          <Typography variant="subtitle2">
            발전과 성장을 지향하는 개발자 이동엽입니다.
          </Typography>
        </Box>
      </Box>
      <CardCover>
        <CardMedia image={user.coverImg} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.name} src={user.avatar} />
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.name}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user.jobtitle} | {user.location}
        </Typography>
      </Box>
    </>
  );
}

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileCover;
