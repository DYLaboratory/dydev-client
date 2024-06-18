import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import PresentWeather from "src/content/pages/Dashboard/FirstCard/PresentWeather";
import { useEffect, useState } from "react";
import { getWeather } from "src/services/dashboard/externalApi";
import { diffTime, epochToDate, toDatePattern, toTimePattern } from "src/utils/stringUtils";
import ForecastWeather from "src/content/pages/Dashboard/FirstCard/ForecastWeather";
import LoadingProgress from "src/components/LoadingProgress";

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

function FirstCard() {
  const [present, setPresent] = useState<WeatherTypes>(null);
  const [forecast, setForecast] = useState<WeatherMainTypes>(null);

  const [city, setCity] = useState<string>('Seoul');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentWeather = async () => {
    setLoading(true);

    await getWeather(city)
      .then(
        res => {
          const data = res.data;

          const p: WeatherTypes = JSON.parse(data.present);
          const f: WeatherMainTypes = JSON.parse(data.forecast);

          const dt = epochToDate(p.dt);
          p.date = toDatePattern(dt);
          p.time = toTimePattern(dt).substring(0, 5);

          sessionStorage.setItem("weather", JSON.stringify({
            lastAsync: new Date(),
            city: city,
            present: p,
            forecast: f
          }));

          setPresent(p);
          setForecast(f);

          setLoading(false);
        },
        () => {
          setError("날씨 정보를 불러오지 못하였습니다.");
          setLoading(false);
        }
      );
  };

  useEffect(() => {
    const weather = JSON.parse(sessionStorage.getItem("weather"));

    if (weather) {
      const diff = diffTime(new Date(), weather.lastAsync, 'm');

      if (diff >= 10 || weather.city !== city) {
        fetchCurrentWeather();
      } else {
        setPresent(weather.present);
        setForecast(weather.forecast);
        setLoading(false);
      }
    } else {
      fetchCurrentWeather();
    }
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
    <Card>
      {loading
        ?
          <LoadingProgress />
        :
          <Grid spacing={0} container>
            <Grid item xs={12} md={6}>
              <PresentWeather present={present} city={city} setCity={setCity} />
            </Grid>
            <Divider absolute orientation="vertical" />
            <Grid item xs={12} md={6}>
              <ForecastWeather forecast={forecast} />
            </Grid>
          </Grid>
      }
    </Card>
  );
}

export default FirstCard;
