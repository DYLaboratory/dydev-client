import {
  Box,
  Card,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  styled,
  Typography,
  useTheme
} from "@mui/material";

import DnsTwoToneIcon from '@mui/icons-material/DnsTwoTone';
import LaptopTwoToneIcon from "@mui/icons-material/LaptopTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import DeveloperBoardTwoToneIcon from '@mui/icons-material/DeveloperBoardTwoTone';
import BuildTwoToneIcon from '@mui/icons-material/BuildTwoTone';

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function SkillGroup() {
  const backendSkills = ["JAVA / Spring Boot", "Spring MVC / Batch / Data JPA", "Mybatis"];
  const dbSkills = ["PostgreSQL", "MySQL", "SQL Server (MSSQL)", "Tibero"];
  const frontendSkills = ["HTML5 / CSS", "Javascript / Typescript", "ReactJS"];
  const osSkills = ["Windows", "Linux"];
  const etcSkills = ["Github / SVN", "Jenkins"];

  const theme = useTheme();

  return (
    <Card>
      <CardHeader title="Skills" />
      <Divider />
      <Box p={3}>
        <Grid container spacing={3}>
          {/* backend */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={
                <Typography display="flex" alignItems="center">
                  <DnsTwoToneIcon />&nbsp;Backend
                </Typography>
              } />
              <Divider />
              <ListWrapper disablePadding>
                {backendSkills.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem
                        sx={{
                          color: `${theme.colors.primary.main}`,
                          '&:hover': { color: `${theme.colors.primary.dark}` }
                        }}>
                        <ListItemText primary={"- " + item} />
                      </ListItem>
                      {index !== backendSkills.length-1 && <Divider />}
                    </Box>
                  )
                })}
              </ListWrapper>
            </Card>
          </Grid>
          {/* frontend */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={
                <Typography display="flex" alignItems="center">
                  <LaptopTwoToneIcon />&nbsp;Frontend
                </Typography>
              } />
              <Divider />
              <ListWrapper disablePadding>
                {frontendSkills.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem
                        sx={{
                          color: `${theme.colors.primary.main}`,
                          '&:hover': { color: `${theme.colors.primary.dark}` }
                        }}>
                        <ListItemText primary={"- " + item} />
                      </ListItem>
                      {index !== frontendSkills.length-1 && <Divider />}
                    </Box>
                  )
                })}
              </ListWrapper>
            </Card>
          </Grid>
          {/* database */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={
                <Typography display="flex" alignItems="center">
                  <StorageTwoToneIcon />&nbsp;Database
                </Typography>
              } />
              <Divider />
              <ListWrapper disablePadding>
                {dbSkills.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem
                        sx={{
                          color: `${theme.colors.primary.main}`,
                          '&:hover': { color: `${theme.colors.primary.dark}` }
                        }}>
                        <ListItemText primary={"- " + item} />
                      </ListItem>
                      {index !== dbSkills.length-1 && <Divider />}
                    </Box>
                  )
                })}
              </ListWrapper>
            </Card>
          </Grid>
          {/* OS */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={
                <Typography display="flex" alignItems="center">
                  <DeveloperBoardTwoToneIcon />&nbsp;OS
                </Typography>
              } />
              <Divider />
              <ListWrapper disablePadding>
                {osSkills.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem
                        sx={{
                          color: `${theme.colors.primary.main}`,
                          '&:hover': { color: `${theme.colors.primary.dark}` }
                        }}>
                        <ListItemText primary={"- " + item} />
                      </ListItem>
                      {index !== osSkills.length-1 && <Divider />}
                    </Box>
                  )
                })}
              </ListWrapper>
            </Card>
          </Grid>
          {/* etcSkills */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title={
                <Typography display="flex" alignItems="center">
                  <BuildTwoToneIcon />&nbsp;ETC
                </Typography>
              } />
              <Divider />
              <ListWrapper disablePadding>
                {etcSkills.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem
                        sx={{
                          color: `${theme.colors.primary.main}`,
                          '&:hover': { color: `${theme.colors.primary.dark}` }
                        }}>
                        <ListItemText primary={"- " + item} />
                      </ListItem>
                      {index !== etcSkills.length-1 && <Divider />}
                    </Box>
                  )
                })}
              </ListWrapper>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}

export default SkillGroup;
