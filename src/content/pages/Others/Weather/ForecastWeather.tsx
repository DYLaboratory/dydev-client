import { Box, Grid, useTheme } from "@mui/material";
import ForecastWeatherChart from "src/content/pages/Others/Weather/ForecastWeatherChart";
import { epochToDate, toDatePattern, toTimePattern } from "src/utils/stringUtils";

interface WeatherMainTypes {
  city: {
    id: number,
    name: string,
    country: string,
    sunrise: number,
    sunset: number
  },
  cnt: number, // list 수
  list: WeatherTypes[]
}

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

interface ForecastWeatherProps {
  forecast: WeatherMainTypes;
}

function ForecastWeather(props: ForecastWeatherProps) {
  const { forecast } = props;

  const theme = useTheme();

  const weatherList: WeatherTypes[] = forecast.list
    .map(w => {
      const dt = epochToDate(w.dt);

      w.date = toDatePattern(dt);
      w.time = toTimePattern(dt);

      return w;
    });

  return (
    <Box p={4}>
      <Grid container>
        <ForecastWeatherChart weatherList={weatherList} />
      </Grid>
    </Box>
  )
}

export default ForecastWeather;