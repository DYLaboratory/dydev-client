import { Button, Grid, Typography } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import AvatarIcon from "src/components/AvatarIcon";
import LinkTwoToneIcon from "@mui/icons-material/LinkTwoTone";

interface PageHeaderProps {
  isAdmin: boolean;
  onOpenModal: (modalState: { isNew: boolean, isOpen: boolean }) => void;
}

function PageHeader(props: PageHeaderProps) {
  const { isAdmin, onOpenModal } = props;

  const title = {
    title: 'Web Site List',
    subTitle: 'These are the useful websites'
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item display="flex" alignItems="center">
        <Grid item>
          <AvatarIcon alt={title.title}>
            <LinkTwoToneIcon fontSize="large" />
          </AvatarIcon>
        </Grid>
        <Grid item justifyContent="space-between" alignItems="center">
          <Typography variant="h3" component="h3">
            {title.title}
          </Typography>
          <Typography variant="subtitle2">{title.subTitle}</Typography>
        </Grid>
      </Grid>
      {isAdmin &&
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => onOpenModal({ isNew: true, isOpen: true })}
          >
            ADD WEB SITE
          </Button>
        </Grid>
      }
    </Grid>
  );
}

export default PageHeader;
