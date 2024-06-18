import { Box, Grid, Typography, useTheme } from "@mui/material";

const DustGrid = (props: { grade: string, text: string; pm: string }) => {
  const { grade, text, pm } = props;

  const theme = useTheme();

  const isGrade = pm === grade;

  let bgcolor;

  if (theme.palette.mode === "light") {
    switch (grade) {
      case "1":
        bgcolor = isGrade ? theme.colors.info.light : theme.colors.info.lighter;
        break;
      case "2":
        bgcolor = isGrade ? theme.colors.success.light : theme.colors.success.lighter;
        break;
      case "3":
        bgcolor = isGrade ? theme.colors.warning.light : theme.colors.warning.lighter;
        break;
      case "4": default:
        bgcolor = isGrade ? theme.colors.error.light : theme.colors.error.lighter;
    }
  } else {
    switch (grade) {
      case "1":
        bgcolor = isGrade ? theme.colors.info.dark : theme.colors.info.lighter;
        break;
      case "2":
        bgcolor = isGrade ? theme.colors.success.dark : theme.colors.success.lighter;
        break;
      case "3":
        bgcolor = isGrade ? theme.colors.warning.dark : theme.colors.warning.lighter;
        break;
      case "4": default:
        bgcolor = isGrade ? theme.colors.error.dark : theme.colors.error.lighter;
    }
  }

  return (
    <Grid item xs={12} md={3} textAlign="center" bgcolor={bgcolor}>
      <Typography variant={isGrade ? "h5" : "subtitle2"} display="flex" justifyContent="center" alignItems="center">
        {text}
      </Typography>
    </Grid>
  )
}

interface DustBody {
  items: {
    dateTime: string;
    pm10Grade: string;
    pm10Value: string;
    pm25Grade: string;
    pm25Value: string;
    sidoName: string;
    stationName: string;
  }[];
  totalCount: number;
  numOfRows: number;
}

interface PresentDustProps {
  dust: DustBody;
}

function PresentDust(props: PresentDustProps) {
  const { dust } = props;

  const item = dust.items && dust.items.length > 0
    ? dust.items[0]
    :
      {
        dateTime: "",
        pm10Grade: "",
        pm10Value: "",
        pm25Grade: "",
        pm25Value: "",
        sidoName: "",
        stationName: ""
      };

  return (
    <Box pl={4} pr={4} pb={4}>
      <Typography
        sx={{
          p: 1
        }}
        display="flex"
        justifyContent="space-between"
        variant="h4">
        미세먼지
      </Typography>
      <Grid spacing={0} p={1} container>
        <DustGrid grade="4" text="매우 나쁨" pm={item.pm10Grade} />
        <DustGrid grade="3" text="나쁨" pm={item.pm10Grade} />
        <DustGrid grade="2" text="보통" pm={item.pm10Grade} />
        <DustGrid grade="1" text="좋음" pm={item.pm10Grade} />
      </Grid>
      <Typography
        sx={{
          p: 1
        }}
        display="flex"
        justifyContent="space-between"
        variant="h4">
        초미세먼지
      </Typography>
      <Grid spacing={0} p={1} container>
        <DustGrid grade="4" text="매우 나쁨" pm={item.pm25Grade} />
        <DustGrid grade="3" text="나쁨" pm={item.pm25Grade} />
        <DustGrid grade="2" text="보통" pm={item.pm25Grade} />
        <DustGrid grade="1" text="좋음" pm={item.pm25Grade} />
      </Grid>
    </Box>
  )
}

export default PresentDust;