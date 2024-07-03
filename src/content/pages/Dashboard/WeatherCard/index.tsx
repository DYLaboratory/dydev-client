import { Box, Card, Grid, Tooltip, Typography } from "@mui/material";
import { getPresentWeather } from "src/services/dashboard/externalApi";
import { ReactNode, useEffect, useState } from "react";
import { diffTime, epochToDate, toDatePattern, toTimePattern } from "src/utils/stringUtils";
import LoadingProgress from "src/components/LoadingProgress";
import SouthTwoToneIcon from "@mui/icons-material/SouthTwoTone";
import SouthWestTwoToneIcon from "@mui/icons-material/SouthWestTwoTone";
import WestTwoToneIcon from "@mui/icons-material/WestTwoTone";
import NorthWestTwoToneIcon from "@mui/icons-material/NorthWestTwoTone";
import NorthTwoToneIcon from "@mui/icons-material/NorthTwoTone";
import NorthEastTwoToneIcon from "@mui/icons-material/NorthEastTwoTone";
import EastTwoToneIcon from "@mui/icons-material/EastTwoTone";
import SouthEastTwoToneIcon from "@mui/icons-material/SouthEastTwoTone";
import AirTwoToneIcon from "@mui/icons-material/AirTwoTone";
import OpacityTwoToneIcon from "@mui/icons-material/OpacityTwoTone";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import { useNavigate } from "react-router";

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

function WeatherCard() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [country, setCountry] = useState<{ id: string, name: string }>({
    id: "",
    name: ""
  });
  const [city, setCity] = useState<{ id: string, name: string }>({
    id: "",
    name: ""
  });

  const [search, setSearch] = useState<{ city: string }>({
    city: "Seoul"
  });

  const [present, setPresent] = useState<WeatherTypes>(null);

  const [wind, setWind] = useState<{ name: string, icon: ReactNode }>();

  const fetchCurrentWeather = async () => {
    await getPresentWeather(search)
      .then(
        res => {
          const data: WeatherTypes = res?.data;

          if (data) {
            const dt = epochToDate(data.dt);
            data.date = toDatePattern(dt);
            data.time = toTimePattern(dt).substring(0, 5);

            const countryType = countryTypes.find(c => c.id === data.sys.country);
            const cityType = cityTypes.find(c => c.id === data.name);

            setCountry(countryType);
            setCity(cityType);
            setPresent(data);

            const nowDate = new Date();

            sessionStorage.setItem("main-weather", JSON.stringify({
              lastAsync: nowDate,
              city: city,
              data: data
            }));
          }

          setLoading(false);
        },
        () => {
          setError("날씨 정보를 불러오지 못하였습니다.");
          setLoading(false);
        }
      );
  }

  useEffect(() => {
    setLoading(true);

    const mainWeather = sessionStorage.getItem("main-weather");

    const nowDate = new Date();

    if (mainWeather) {
      const weather = JSON.parse(mainWeather);

      // 동기화 10분이상 지났으면 재호출
      const diff = diffTime(nowDate, weather.lastAsync, 'm');

      if (diff >= 10) {
        fetchCurrentWeather();
      } else {
        setPresent(weather.data);
        setLoading(false);
      }
    } else {
      fetchCurrentWeather();
    }
  }, []);

  useEffect(() => {
    if (present) {
      setWind(convertDegToDir(present.wind.deg));
    }
  }, [present]);

  return (
    <Card
      sx={{
        textAlign: 'center',
        p: 3
      }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            pb: 3
          }}
          display="flex"
          justifyContent="space-between"
          variant="h4">
          날씨 정보&nbsp;
          <Tooltip title="자세히보기">
            <LoginTwoToneIcon fontSize="small" cursor="pointer" onClick={() => navigate("/others/weather")} />
          </Tooltip>
        </Typography>
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4"
        >
          <Typography display="flex" alignItems="center">
            {present && present.date + " "  + present.time}
          </Typography>
        </Typography>
      </Box>

      {loading && <LoadingProgress />}
      {!loading && !present &&
        <Typography p={4} variant="h4">
          날씨 정보를 불러오지 못하였습니다.
        </Typography>
      }
      {!loading && present &&
        <>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h3" gutterBottom>
              {country.name + " " + city.name}
            </Typography>
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
            <Grid item xs={8} md={8}>
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
            <Grid item xs={4} md={4}>
              <Box>
                <Grid item>
                  <Box display="flex" alignItems="center" justifyContent="flex-start">
                    <AirTwoToneIcon fontSize="large" />
                    <Box>
                      <Typography variant="h4" display="flex" alignItems="center">
                        {present.wind.speed}m/s
                      </Typography>
                      {wind &&
                        <Typography variant="subtitle2" display="flex" alignItems="center">
                          {wind.icon} {wind.name}
                        </Typography>
                      }
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
              </Box>
            </Grid>
          </Grid>
        </>
      }
    </Card>
  )
}

export const convertDegToDir = (deg: number): { name: string, icon: ReactNode } => {
  if (337.5 <= deg && deg < 22.5) {
    return {
      name: "북풍",
      icon: <SouthTwoToneIcon fontSize="small" />
    };
  } else if (22.5 <= deg && deg < 67.5) {
    return {
      name: "북동풍",
      icon: <SouthWestTwoToneIcon fontSize="small" />
    };
  } else if (67.5 <= deg && deg < 112.5) {
    return {
      name: "동풍",
      icon: <WestTwoToneIcon fontSize="small" />
    };
  } else if (112.5 <= deg && deg < 157.5) {
    return {
      name: "남동풍",
      icon: <NorthWestTwoToneIcon fontSize="small" />
    };
  } else if (157.5 <= deg && deg < 202.5) {
    return {
      name: "남풍",
      icon: <NorthTwoToneIcon fontSize="small" />
    };
  } else if (202.5 <= deg && deg < 247.5) {
    return {
      name: "동풍",
      icon: <NorthEastTwoToneIcon fontSize="small" />
    };
  } else if (247.5 <= deg && deg < 292.5) {
    return {
      name: "서풍",
      icon: <EastTwoToneIcon fontSize="small" />
    };
  } else {
    return {
      name: "북서풍",
      icon: <SouthEastTwoToneIcon fontSize="small" />
    };
  }
}

export default WeatherCard;