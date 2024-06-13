import {Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Typography} from "@mui/material";

import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import { useAppSelector } from "src/app/hooks";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {SiteData, SiteTypes} from "src/models/data/dataModels";

const ListItemWrapper = styled(ListItem)(`
  display: flex;
  justify-content: space-between;
`);

const FormControlWrapper = styled(FormControl)(
  `margin-left: 20px;`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
    margin-left: 20px;
    background-color: ${theme.colors.alpha.white[100]};
`
);

const typeOptions: { id: SiteTypes; name: string; }[] = [
  {
    id: 'develop',
    name: 'Develop'
  },
  {
    id: 'reference',
    name: 'Reference'
  },
  {
    id: 'useful',
    name: 'Useful'
  },
  {
    id: 'entertain',
    name: 'Entertain'
  },
  {
    id: 'etc',
    name: 'etc'
  }
];

function PageHeader() {
  const title = {
    title: 'Web Site List',
    subTitle: 'These are reference web sites'
  };

  const isLogin = useAppSelector(state => state.user).isLogin;

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [webSite, setWebSite] = useState<SiteData>({
    type: "develop",
    name: null,
    description: null,
    url: null
  });

  const handleTypeChange = e => {
    setWebSite({ ...webSite, type: e.target.value });
  }

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
          <ListItemWrapper>
            <Typography variant="h4" component="h3" gutterBottom>
              type
            </Typography>
            <FormControlWrapper fullWidth variant="outlined">
              <InputLabel>Type</InputLabel>
              <Select
                  value={webSite.type}
                  onChange={handleTypeChange}
                  label="Status"
                  autoWidth>
                {typeOptions.map(typeOption => (
                    <MenuItem key={typeOption.id} value={typeOption.id}>
                      {typeOption.name}
                    </MenuItem>
                ))}
              </Select>
            </FormControlWrapper>
          </ListItemWrapper>

          <ListItemWrapper>
            <Typography variant="h4" component="h3" gutterBottom>
              name
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site Name"
            />
          </ListItemWrapper>

          <ListItemWrapper>
            <Typography variant="h4" component="h3" gutterBottom>
              description
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site Description"
            />
          </ListItemWrapper>

          <ListItemWrapper>
            <Typography variant="h4" component="h3" gutterBottom>
              url
            </Typography>
            <OutlinedInputWrapper
                type="text"
                placeholder="Web Site URL"
            />
          </ListItemWrapper>

          <ListItem button>
            <ListItemAvatar>
              <Avatar>
                <SaveIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography variant="h4">
              SAVE
            </Typography>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}

export default PageHeader;
