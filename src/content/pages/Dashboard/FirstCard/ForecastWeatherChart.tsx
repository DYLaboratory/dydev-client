import { Box, Divider, Stack, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

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

function ForecastWeatherChart(props: { weatherList: WeatherTypes[] }) {
  const { weatherList } = props;
  const theme = useTheme();

  const Box1Options: ApexOptions = {
    chart: {
      background: 'transparent',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: true
      },
      zoom: {
        enabled: true
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
        show: true
      },
      axisTicks: {
        show: true
      }
    },
    yaxis: {
      show: false
    },
    grid: {
      padding: {
        top: 10,
        right: 5,
        bottom: 10,
        left: 5
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

  const Box1Data = [
    {
      name: '',
      data: weatherList.map(w => w.main.temp)
    }
  ];

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="stretch"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={0}>
      <Box p={3}>
        <Chart
          options={Box1Options}
          series={Box1Data}
          type="line"
          width="500"
          height="200"
        />
      </Box>
    </Stack>
  )
}

export default ForecastWeatherChart;