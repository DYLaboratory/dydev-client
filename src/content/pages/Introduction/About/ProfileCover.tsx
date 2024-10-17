import PropTypes from "prop-types";
import { Avatar, Box, Card, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactElement } from "react";

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

interface ProfileCoverProps {
  coverImg: string;
  avatar: string;
  name: string;
  fullName: string;
  description: ReactElement;
  jobTitle: string;
  location: string;
}

function ProfileCover(props: ProfileCoverProps) {
  const { coverImg, avatar, name, fullName, description, jobTitle, location } = props;

  return (
    <>
      <CardCover>
        <CardMedia image={coverImg} />
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={name} src={avatar} />
      </AvatarWrapper>
      <Box py={2} pl={2}>
        <Typography gutterBottom variant="h4">
          {fullName}
        </Typography>
        <Typography variant="subtitle2">{description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {jobTitle} | {location}
        </Typography>
      </Box>
    </>
  );
}

export default ProfileCover;
