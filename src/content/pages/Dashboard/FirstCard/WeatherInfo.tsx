import { Avatar, Box, Button, Grid, styled, Typography } from '@mui/material';
import TrendingUp from '@mui/icons-material/TrendingUp';
import { useEffect, useState } from 'react';
import { CONSTANTS } from 'src/utils/constants';
import axios from 'axios';

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

interface CurrentWeather {
  coord: {
    lat: number;
    lon: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
  main: {
    temp: number;
  };
  name: string;
}

interface DailyWeather {
  dt: number;
  temp: {
    day: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
}

interface Weather {
  current: {
    temp: number;
    weather: {
      description: string;
      main: string;
    }[];
  };
  daily: DailyWeather[];
}

function WeatherInfo() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [weeklyWeather, setWeeklyWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [city, setCity] = useState<string>('Seoul');

  const API_KEY = CONSTANTS.OPENWEATHER_API_KEY;
  const CURRENT_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      try {
        const response = await axios.get<CurrentWeather>(CURRENT_WEATHER_URL);
        setCurrentWeather(response.data);

        console.log(response.data);

        const { lat, lon } = response.data.coord;
        const WEEKLY_WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`;

        const weeklyResponse = await axios.get<Weather>(WEEKLY_WEATHER_URL);
        setWeeklyWeather(weeklyResponse.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCurrentWeather();
  }, []);

  const getBackgroundColor = (main: string) => {
    switch (main) {
      case 'Clear':
        return 'linear-gradient(to right, #56CCF2, #2F80ED)';
      case 'Clouds':
        return 'linear-gradient(to right, #bdc3c7, #2c3e50)';
      case 'Rain':
        return 'linear-gradient(to right, #00c6ff, #0072ff)';
      case 'Snow':
        return 'linear-gradient(to right, #e0eafc, #cfdef3)';
      default:
        return 'linear-gradient(to right, #6a11cb, #2575fc)';
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentWeatherMain = currentWeather?.weather[0].main;

  return (
    <Box p={4}>
      <Typography
        sx={{
          pb: 3
        }}
        variant="h4"
      >
        Account Balance
      </Typography>
      <Box>
        <Typography variant="h1" gutterBottom>
          {currentWeather?.name}
        </Typography>
        <Typography
          variant="h4"
          fontWeight="normal"
          color="text.secondary"
        >
          {currentWeather?.main.temp}°C
        </Typography>
        <Box
          display="flex"
          sx={{
            py: 4
          }}
          alignItems="center"
        >
          <AvatarSuccess
            sx={{
              mr: 2
            }}
            variant="rounded"
          >
            <TrendingUp fontSize="large" />
          </AvatarSuccess>
          <Box>
            <Typography variant="h4">+ $3,594.00</Typography>
            <Typography variant="subtitle2" noWrap>
              this month
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid sm item>
          <Button fullWidth variant="outlined">
            Send
          </Button>
        </Grid>
        <Grid sm item>
          <Button fullWidth variant="contained">
            Receive
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default WeatherInfo;