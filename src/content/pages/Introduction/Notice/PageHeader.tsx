import { Button, Grid, Typography } from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useNavigate } from "react-router";
import { URL_INFO } from "src/utils/constants";
import AvatarIcon from "src/components/AvatarIcon";
import CampaignTwoToneIcon from "@mui/icons-material/CampaignTwoTone";

interface PageHeaderProps {
  isAdmin: boolean;
}

function PageHeader(props: PageHeaderProps) {
  const { isAdmin } = props;

  const navigate = useNavigate();

  const title = {
    title: 'Notice',
    subTitle: 'This is the notice page'
  };

  return (
    <Grid container>
      <Grid item>
        <AvatarIcon alt={title.title}>
          <CampaignTwoToneIcon fontSize="large" />
        </AvatarIcon>
      </Grid>
      <Grid justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3">
            {title.title}
          </Typography>
          <Typography variant="subtitle2">{title.subTitle}</Typography>
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
    </Grid>
  );
}

export default PageHeader;
