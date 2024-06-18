import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import AirTwoToneIcon from "@mui/icons-material/AirTwoTone";

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
  city: string;
  setCity: (city: string) => void;
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

function PresentWeather(props: PresentWeatherProps) {
  const { present, city, setCity } = props;

  return (
    <Box p={4}>
      <Box display="flex" justifyContent="space-between">
        <Typography
          sx={{
            pb: 3
          }}
          display="flex"
          justifyContent="space-between"
          variant="h4">
          Weather
        </Typography>
        <Typography
          sx={{
            pb: 3
          }}
          variant="h4">
          {present && present.date}
        </Typography>
      </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h1" gutterBottom>
            {present?.sys.country + " " + present?.name}
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
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            {present && <img src={"/static/images/weathers/100/" + present.weather[0].icon + "@2x.png"} alt={present.weather[0].description} />}
            <Box>
              <Typography variant="h4">
                {present.main.temp}°C
              </Typography>
              <Typography variant="subtitle2" noWrap>
                체감온도 {present.main.feels_like}°C
              </Typography>
            </Box>
          </Box>
          <Box display="flex" alignItems="center">
            <AirTwoToneIcon fontSize="large" />
            <Box>
              <Typography variant="h4">
                {present.wind.speed} m/s
              </Typography>
              <Typography variant="subtitle2" noWrap>
                {present.wind.deg}°
              </Typography>
            </Box>
          </Box>
        </Box>
    </Box>
  );
}

export default PresentWeather;
