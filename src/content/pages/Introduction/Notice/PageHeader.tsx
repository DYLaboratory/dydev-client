import { Button, Grid, Typography } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useNavigate } from "react-router";
import { URL_INFO } from "src/utils/constants";
import AvatarIcon from "src/components/AvatarIcon";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";
import { useTranslation } from "react-i18next";

interface PageHeaderProps {
  isAdmin: boolean;
}

function PageHeader(props: PageHeaderProps) {
  const { isAdmin } = props;

  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item display="flex" alignItems="center">
        <Grid item>
          <AvatarIcon alt={t(`notice.title`)}>
            <CampaignTwoToneIcon fontSize="large" />
          </AvatarIcon>
        </Grid>
        <Grid item justifyContent="space-between" alignItems="center">
          <Typography variant="h3" component="h3">
            {t(`notice.title`)}
          </Typography>
          <Typography variant="subtitle2">{t(`notice.subtitle`)}</Typography>
        </Grid>
      </Grid>
      {isAdmin &&
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
            onClick={() => navigate(URL_INFO.PAGE.NOTICE.concat("/add"))}
          >
            ADD NOTICE
          </Button>
        </Grid>
      }
    </Grid>
  );
}

export default PageHeader;
