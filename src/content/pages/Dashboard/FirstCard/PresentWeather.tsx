import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from "@mui/material";
import RefreshTwoToneIcon from "@mui/icons-material/RefreshTwoTone";
import NorthTwoToneIcon from "@mui/icons-material/NorthTwoTone";
import SouthTwoToneIcon from "@mui/icons-material/SouthTwoTone";
import AirTwoToneIcon from "@mui/icons-material/AirTwoTone";
import OpacityTwoToneIcon from "@mui/icons-material/OpacityTwoTone";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

const RotatingIcon = styled(RefreshTwoToneIcon)(({ theme, rotate }) => ({
  transition: 'transform 1s linear',
  transform: rotate ? 'rotate(540deg)' : 'rotate(0deg)',
}));

interface WeatherTypes {
  dt: number;
  dt_txt: string;
  date?: string;
  time?: string;

  name?: string;
  sys?: {
    type: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  wind: {
    speed: number;
    deg: number;
  };

  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };
  weather: DailyWeather[];
}

interface DailyWeather {
  main: string;
  description: string;
  icon: string;
}

interface PresentWeatherProps {
  present: WeatherTypes;
  city: {
    id: string,
    name: string
  };
  setCity: (city: {
    id: string,
    name: string
  }) => void;
  handleRefresh: () => void;
}

const countryTypes = [
  {
    id: "KR",
    name: "대한민국"
  }
]

const cityTypes = [
  {
    id: "Seoul",
    name: "서울"
  },
  {
    id: "Daegu",
    name: "대구"
  }
]

function PresentWeather(props: PresentWeatherProps) {
  const { present, city, setCity, handleRefresh } = props;

  const [rotate, setRotate] = useState<boolean>(false);

  const countryType = countryTypes.find(c => c.id === present.sys.country);
  const cityType = cityTypes.find(c => c.id === present.name);

  const handleChangeCity = e => {
    const ct = cityTypes.find(c => c.id === e.target.value);

    setCity(ct);
  }

  const handleRefreshButton = () => {
    if (rotate) {
      alert("정보를 불러오는 중입니다.");
      return;
    }

    setRotate(true);
    handleRefresh();
  }

  useEffect(() => {
    setRotate(false);
  }, [present]);

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            pb: 3
          }}
          display="flex"
          justifyContent="space-between"
          variant="h4">
          날씨 정보
        </Typography>
        {present &&
          <Typography
            sx={{
              pb: 3
            }}
            variant="h4"
          >
            <Typography display="flex" alignItems="center">
              {present.date} {present.time}
              <IconButton onClick={handleRefreshButton}>
                <RotatingIcon fontSize="small" rotate={rotate ? 1 : 0} />
              </IconButton>
            </Typography>
          </Typography>
        }
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h1" gutterBottom>
          {countryType.name + " " + cityType.name}
        </Typography>
        <FormControl variant="outlined">
          <InputLabel>지역</InputLabel>
          <Select
            value={city.id}
            onChange={handleChangeCity}
            label="City"
          >
            {cityTypes.map(typeOption => (
              <MenuItem key={typeOption.id} value={typeOption.id}>
                {typeOption.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid spacing={0} container alignItems="center">
        <Grid item>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            {present &&
              <Tooltip title={present.weather[0].description} arrow>
                <img src={"/static/images/weathers/100/" + present.weather[0].icon + "@2x.png"} alt={present.weather[0].description} />
              </Tooltip>
            }
            <Box>
              <Typography variant="h3">
                {present.main.temp}°C
              </Typography>
              <Typography variant="subtitle2" noWrap>
                체감온도 {present.main.feels_like}°C
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid spacing={0} container alignItems="center">
        <Grid item xs={6} md={6}>
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Box>
              <Typography variant="h5" display="flex" alignItems="center" color="default">
                <NorthTwoToneIcon fontSize="small" /> 최고기온 {present.main.temp_max}°C
              </Typography>
              <Typography variant="h5" display="flex" alignItems="center" color="secondary">
                <SouthTwoToneIcon fontSize="small" /> 최저기온 {present.main.temp_min}°C
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={3} md={3}></Grid>
        <Grid item xs={3} md={3}>
          <Grid item>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <AirTwoToneIcon fontSize="large" />
              <Box>
                <Typography variant="h4" display="flex" alignItems="center">
                  {present.wind.speed}m/s
                </Typography>
                <Typography variant="subtitle2" display="flex" alignItems="center">
                  {present.wind.deg}°
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <OpacityTwoToneIcon fontSize="large" />
              <Typography variant="h5" display="flex" alignItems="center">
                {present.main.humidity}%
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PresentWeather;
