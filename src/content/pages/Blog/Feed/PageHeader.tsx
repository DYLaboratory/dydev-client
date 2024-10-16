import { Button, Grid, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import AvatarIcon from "src/components/AvatarIcon";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import DynamicFeedTwoToneIcon from '@mui/icons-material/DynamicFeedTwoTone';

interface PageHeaderProps {
  isAdmin: boolean;
  onOpenModal: (modalState: { isNew: boolean, isOpen: boolean }) => void;
}

function PageHeader(props: PageHeaderProps) {
  const { isAdmin, onOpenModal } = props;

  const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item display="flex" alignItems="center">
        <Grid item>
          <AvatarIcon alt={t(`feed.title`)}>
            <DynamicFeedTwoToneIcon fontSize="large" />
          </AvatarIcon>
        </Grid>
        <Grid item justifyContent="space-between" alignItems="center">
          <Typography variant="h3" component="h3">
            {t(`feed.title`)}
          </Typography>
          <Typography variant="subtitle2">{t(`feed.subtitle`)}</Typography>
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
          ADD FEED
        </Button>
      </Grid>
      }
    </Grid>
  );
}

export default PageHeader;
