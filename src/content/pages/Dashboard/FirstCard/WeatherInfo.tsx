import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getWeather } from "src/services/dashboard/externalApi";
import { toDatePattern, toTimePattern } from "src/utils/stringUtils";

interface DailyWeather {
  main: string;
  description: string;
  icon: string;
}

interface CurrentWeather {
  id: number;
  name: string;
  dt: number | string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: DailyWeather[];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  }
  sys: {
    country: string;
    sunrise: number | string;
    sunset: number | string;
  }
}

const cityTypes = [
  {
    id: "Seoul",
    name: "Seoul"
  },
  {
    id: "Daegu",
    name: "Daegu"
  }
]

function WeatherInfo() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );

  const [dailyWeather, setDailyWeather] = useState<DailyWeather>(null);

  const [dateTime, setDateTime] = useState<{ date: string; time: string; }>({
    date: '',
    time: ''
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [city, setCity] = useState<string>('Seoul');

  useEffect(() => {
    const fetchCurrentWeather = async () => {
      setLoading(true);

      await getWeather(city)
        .then(
          res => {
            setCurrentWeather(res.data);
            setDailyWeather(res.data.weather[0]);

            const dt = new Date(res.data.dt * 1000);
            setDateTime({
              date: toDatePattern(dt),
              time: toTimePattern(dt)
            });

            setLoading(false);
          },
          () => {
            setError("날씨 정보를 불러오지 못하였습니다.");
            setLoading(false);
          }
        );
    };

    fetchCurrentWeather();
  }, [city]);

  // 에러
  if (error) {
    return (
      <Box p={4}>
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4">
          Weather
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h4" gutterBottom>
            {error}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4">
          Weather
        </Typography>
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4">
          {dateTime.date}
        </Typography>
      </Box>
      {loading &&
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height={200}
        >
          <CircularProgress size={64} disableShrink thickness={3} />
        </Box>
      }
      {!loading &&
        <>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h1" gutterBottom>
              {currentWeather?.sys.country + " " + currentWeather?.name}
            </Typography>
            <FormControl variant="outlined">
              <InputLabel>City</InputLabel>
              <Select
                value={city}
                onChange={e => setCity(e.target.value)}
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
          <Box
            display="flex"
            sx={{
              py: 4
            }}
            alignItems="center">
            <Box>
              {dailyWeather && <img src={"https://openweathermap.org/img/wn/" + dailyWeather.icon + ".png"} alt={dailyWeather.description} />}
            </Box>
            <Box>
              <Typography variant="h4">
                {currentWeather?.main.temp}°C
              </Typography>
              <Typography variant="subtitle2" noWrap>
                기준시간 {dateTime.time}
              </Typography>
            </Box>
          </Box>
        </>
      }
    </Box>
  );
}

export default WeatherInfo;
