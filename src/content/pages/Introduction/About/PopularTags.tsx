import { Card, CardHeader, Divider, List, ListItem, ListItemText, styled, useTheme } from "@mui/material";

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function PopularTags() {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Popular Tags" />
      <Divider />
      <ListWrapper disablePadding>
        <ListItem
          sx={{
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}>
          <ListItemText primary="#Development" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}>
          <ListItemText primary="#Responsibility" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}>
          <ListItemText primary="#Persistence" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}>
          <ListItemText primary="#Communication" />
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            '&:hover': { color: `${theme.colors.primary.dark}` }
          }}>
          <ListItemText primary="#Cooperation" />
        </ListItem>
      </ListWrapper>
    </Card>
  )
}

export default PopularTags;