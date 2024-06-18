import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface WeatherTypes {
  dt: number;
  dt_txt: string;
  year?: string;
  date?: string;
  time?: string;
  isFirstDate?: boolean;
  dateCount?: number;

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

function ForecastWeatherChart(props: { weatherList: WeatherTypes[] }) {
  const { weatherList } = props;
  const theme = useTheme();

  let cnt = weatherList.length;

  const tableList = weatherList.map((w, i) => {
    w.date = w.date.substring(5, 10);
    w.time = w.time.substring(0, 2);

    const hours = Number(w.time);

    if (i === 0) {
      w.isFirstDate = true;
      w.dateCount = (24 - hours) / 3;
    }

    if (hours === 0 || hours === 24) {
      w.isFirstDate = true;
      w.dateCount = 24 / 3;
      if (cnt > w.dateCount) {
        cnt -= w.dateCount;
      } else {
        w.dateCount = cnt;
      }
    }

    w.time += '시';

    return w;
  });

  const chartOption: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: false
      }
    },
    markers: {
      size: 3,
      colors: theme.palette.text.primary,
      strokeColors: theme.palette.text.primary,
      strokeWidth: 2,
      hover: {
        size: 5
      }
    },
    colors: [theme.colors.primary.main],
    theme: {
      mode: theme.palette.mode
    },
    labels: weatherList.map(w => {
      return w.date + " " + w.time;
    }),
    stroke: {
      curve: 'smooth',
      colors: [theme.colors.primary.main],
      width: 3
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      padding: {
        top: 10,
        right: 30,
        bottom: 10,
        left: 25
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: true
      },
      y: {
        formatter(val: number, opts?: string): string {
          return val + "°C";
        }
      },
      marker: {
        show: true
      }
    }
  };

  const chartData = [
    {
      name: '',
      data: weatherList.map(w => w.main.temp)
    }
  ];

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                tableList
                  .filter(w => w.isFirstDate)
                  .map(w => (
                      <TableCell key={w.dt} colSpan={w.dateCount}>
                        <Typography variant="h5">{w.date}</Typography>
                      </TableCell>
                    )
                  )
              }
            </TableRow>
            <TableRow>
              {
                weatherList.map(w => (
                  <TableCell key={w.dt} align="center">{w.time}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {
                weatherList.map(w => (
                  <TableCell key={w.dt} align="center">
                    <img src={"/static/images/weathers/50/" + w.weather[0].icon + ".png"} alt={w.weather[0].description} />
                    <Typography variant="h5">
                      {w.main.temp}°C
                    </Typography>
                  </TableCell>
                ))
              }
            </TableRow>
            <TableRow>
              <TableCell align="center" colSpan={weatherList.length}>
                <Chart
                  options={chartOption}
                  series={chartData}
                  type="line"
                  height={50}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default ForecastWeatherChart;