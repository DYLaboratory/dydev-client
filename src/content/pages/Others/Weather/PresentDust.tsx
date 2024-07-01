import { Box, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';
import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone';
import SentimentNeutralTwoToneIcon from '@mui/icons-material/SentimentNeutralTwoTone';
import SentimentSatisfiedAltTwoToneIcon from '@mui/icons-material/SentimentSatisfiedAltTwoTone';

const DustGrid = (props: { grade: string, text: string; pm: string }) => {
  const { grade, text, pm } = props;

  const theme = useTheme();

  const isGrade = pm === grade;

  let bgcolor;
  let icon;
  let name;

  switch (grade) {
    case "1":
      bgcolor = isGrade ? theme.colors.success[theme.palette.mode] : theme.colors.success.lighter;
      icon = <SentimentSatisfiedAltTwoToneIcon />;
      name = "좋음";
      break;
    case "2":
      bgcolor = isGrade ? theme.colors.info[theme.palette.mode] : theme.colors.info.lighter;
      icon = <SentimentNeutralTwoToneIcon />;
      name = "보통"
      break;
    case "3":
      bgcolor = isGrade ? theme.colors.warning[theme.palette.mode] : theme.colors.warning.lighter;
      icon = <SentimentDissatisfiedTwoToneIcon />;
      name = "나쁨"
      break;
    case "4": default:
      bgcolor = isGrade ? theme.colors.error[theme.palette.mode] : theme.colors.error.lighter;
      icon = <SentimentVeryDissatisfiedTwoToneIcon />;
      name = "매우 나쁨"
  }

  return (
    <Grid item xs={12} md={3} textAlign="center" bgcolor={bgcolor}>
      <Typography variant={isGrade ? "h5" : "subtitle2"} display="flex" justifyContent="center" alignItems="center">
        <Tooltip title={name} arrow>
          {icon}
        </Tooltip>
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