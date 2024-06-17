import { Avatar, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface AvatarIconTypes {
  alt: string,
  image?: string,
  children?: ReactNode
}

function AvatarIcon(props: AvatarIconTypes) {
  const { alt, image, children } = props;

  const theme = useTheme();

  if (image) {
    return (
      <Avatar
        sx={{
          mr: 2,
          width: theme.spacing(8),
          height: theme.spacing(8)
        }}
        variant="rounded"
        alt={alt}
        src={image}
      />
    );
  } else {
    return (
      <Avatar
        sx={{
          mr: 2,
          width: theme.spacing(8),
          height: theme.spacing(8)
        }}
        variant="rounded"
        alt={alt}
      >
        {children}
      </Avatar>
    )
  }
}

export default AvatarIcon;