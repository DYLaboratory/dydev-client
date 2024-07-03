import { Box, Card, Container, Grid, Typography } from "@mui/material";
import PresentWeather from "src/content/pages/Others/Weather/PresentWeather";
import { useEffect, useState } from "react";
import { getWeatherDust } from "src/services/dashboard/externalApi";
import { diffTime, epochToDate, toDatePattern, toTimePattern } from "src/utils/stringUtils";
import ForecastWeather from "src/content/pages/Others/Weather/ForecastWeather";
import LoadingProgress from "src/components/LoadingProgress";
import PresentDust from "src/content/pages/Others/Weather/PresentDust";
import { Helmet } from "react-helmet-async";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import PageHeader from "src/components/PageHeader";
import Footer from "src/components/Footer";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import { useTranslation } from "react-i18next";

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

interface DustResponse {
  response: {
    body: DustBody,
    header: {
      resultMsg: string,
      resultCode: string
    }
  }
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

function Weather() {
  const { t } = useTranslation();

  const [city, setCity] = useState<{ id: string, name: string }>({
    id: "Seoul",
    name: "서울"
  });

  const [search, setSearch] = useState<{ city: string, weather: boolean, dust: boolean, refresh?: boolean }>({
    city: city.id,
    weather: true,
    dust: true,
    refresh: false
  });

  const [present, setPresent] = useState<WeatherTypes>(null);
  const [forecast, setForecast] = useState<WeatherMainTypes>(null);
  const [dust, setDust] = useState<DustBody>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentWeather = async () => {
    if (search.weather || search.dust) {
      await getWeatherDust(search)
        .then(
          res => {
            const data = res.data;

            const p: WeatherTypes = JSON.parse(data.present);
            const f: WeatherMainTypes = JSON.parse(data.forecast);
            const dRes: DustResponse = data.dust && JSON.parse(data.dust);
            const d: DustBody = dRes && dRes.response.body;

            const dt = epochToDate(p.dt);
            p.date = toDatePattern(dt);
            p.time = toTimePattern(dt).substring(0, 5);

            const nowDate = new Date();

            if (search.weather) {
              sessionStorage.setItem("weather", JSON.stringify({
                lastAsync: nowDate,
                city: city,
                present: p,
                forecast: f
              }));

              setPresent(p);
              setForecast(f);
            }

            if (search.dust) {
              sessionStorage.setItem("dust", JSON.stringify({
                lastAsync: nowDate,
                city: city,
                dust: d
              }));

              setDust(d);
            }

            setLoading(false);
          },
          () => {
            setError("날씨 정보를 불러오지 못하였습니다.");
            setLoading(false);
          }
        );
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    // 스토리지에서 데이터 가져오기
    const weather = JSON.parse(sessionStorage.getItem("weather"));
    const dust = JSON.parse(sessionStorage.getItem("dust"));

    let callWeather: boolean;
    let callDust: boolean;

    const nowDate = new Date();

    // 날씨
    if (weather) {
      // 동기화 10분이상 지났으면 재호출
      const diff = diffTime(nowDate, weather.lastAsync, 'm');

      if (diff >= 10 || weather.city.id !== city.id) {
        callWeather = true;
      } else {
        callWeather = false;
        setPresent(weather.present);
        setForecast(weather.forecast);
        setLoading(false);
      }
    } else {
      callWeather = true;
    }

    // 미세먼지
    if (dust) {
      // 동기화 3시간 이상 지났으면 재호출
      const diff = diffTime(nowDate, dust.lastAsync, 'h');

      if (diff >= 3 || dust.city.id !== city.id) {
        callDust = true;
      } else {
        callDust = false;
        setDust(dust);
        setLoading(false);
      }
    } else {
      callDust = true;
    }

    setSearch({ ...search, weather: callWeather, dust: callDust });

    fetchCurrentWeather();
  }, [city]);

  useEffect(() => {
    if (search.refresh) {
      fetchCurrentWeather();
      setSearch({ ...search, refresh: false });
    }
  }, [search.refresh]);

  // city 변경
  const handleChangeCity = ct => {
    setSearch({ ...search, city: ct.id, weather: true, dust: true });
    setCity(ct);
  }

  // refresh 버튼
  const handleRefresh = async () => {
    setSearch({...search, weather: true, dust: true, refresh: true});
  }

  return (
    <>
      <Helmet>
        <title>DYLABO Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader
          title={t(`weather.title`)}
          subTitle={t(`weather.subtitle`)}
          icon={<DashboardTwoToneIcon fontSize="large" />}
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}>
          <Grid item xs={12}>
            <Card>
              {loading && <LoadingProgress />}
              {!loading &&
              <Grid spacing={0} container>
                {error &&
                  <Box p={4}>
                    <Typography
                      sx={{
                        pb: 3
                      }}
                      variant="h4">
                      날씨 정보
                    </Typography>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h4" gutterBottom>
                        {error}
                      </Typography>
                    </Box>
                  </Box>
                }
                {!error && present &&
                <>
                  <Grid item xs={12} md={6}>
                    <PresentWeather present={present} city={city} setCity={handleChangeCity} handleRefresh={handleRefresh} />
                    {dust && dust.items && dust.items.length > 0
                      ? <PresentDust dust={dust} />
                      :
                      <Typography p={4} variant="h4">
                        미세먼지 정보를 불러오지 못하였습니다
                      </Typography>

                    }
                  </Grid>
                  {forecast &&
                  <Grid item xs={12} md={6}>
                    <ForecastWeather forecast={forecast} />
                    <Box pl={4} pr={4} pb={4}>
                      <Typography variant="subtitle2">
                        데이터는 실시간 관측자료이며 상황에 따라 수집되지 않을 수 있습니다.
                      </Typography>
                      <Box pt={1} textAlign="right">
                        <Typography variant="h5">[정보제공]</Typography>
                        <Typography>
                          날씨: <a href="https://api.openweathermap.org" target="_blank"
                                 rel="noopener noreferrer">OpenWeather</a>
                        </Typography>
                        <Typography>
                          미세먼지: <a href="https://www.data.go.kr/index.do" target="_blank" rel="noopener noreferrer">한국환경공단
                          에어코리아</a>
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  }
                </>
                }
              </Grid>
              }
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Weather;
