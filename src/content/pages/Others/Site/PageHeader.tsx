import { Button, Grid, OutlinedInput, Typography } from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useAppSelector } from "src/app/hooks";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { SiteData } from "src/models/data/dataModels";

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
    margin-left: 20px;
    background-color: ${theme.colors.alpha.white[100]};
`
);

function PageHeader() {
  const title = {
    title: 'Web Site List',
    subTitle: 'These are reference web sites'
  };

  const isLogin = useAppSelector(state => state.user).isLogin;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [webSite, setWebSite] = useState<SiteData>();

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h3" gutterBottom>
            {title.title}
          </Typography>
          <Typography variant="subtitle2">{title.subTitle}</Typography>
        </Grid>
        <Grid item>
          <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => setOpenModal(true)}
          >
            Add WebSite
          </Button>
        </Grid>
        {isLogin &&
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              startIcon={<AddTwoToneIcon fontSize="small" />}
              onClick={() => setOpenModal(true)}
            >
              Add WebSite
            </Button>
          </Grid>
        }
      </Grid>
      <Dialog onClose={() => setOpenModal(false)} open={openModal}>
        <DialogTitle>
          <Typography variant="h3" component="h3" gutterBottom>
            Add New Web Site
          </Typography>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <Typography variant="h4" component="h3" gutterBottom>
              type
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site Name"
            />
          </ListItem>

          <ListItem>
            <Typography variant="h4" component="h3" gutterBottom>
              name
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site Name"
            />
          </ListItem>

          <ListItem>
            <Typography variant="h4" component="h3" gutterBottom>
              description
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site Name"
            />
          </ListItem>

          <ListItem>
            <Typography variant="h4" component="h3" gutterBottom>
              url
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site Name"
            />
          </ListItem>

          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default PageHeader;
