import { useEffect, useState } from 'react';
import axios from 'axios';
import { CONSTANTS } from 'src/utils/constants';
import styled from '@emotion/styled';

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
    <Container background={getBackgroundColor(currentWeatherMain || '')}>
      <WeatherCard>
        <City>{currentWeather?.name}</City>
        <Temperature>{currentWeather?.main.temp}°C</Temperature>
        <Description>{currentWeather?.weather[0].description}</Description>
      </WeatherCard>
      <WeekWeather>
        {weeklyWeather && weeklyWeather.daily && weeklyWeather?.daily.map((day, index) => (
          <DayCard key={index}>
            <Day>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</Day>
            <Temp>{day.temp.day}°C</Temp>
            <WeatherDesc>{day.weather[0].description}</WeatherDesc>
          </DayCard>
        ))}
      </WeekWeather>
    </Container>
  );
};

export default WeatherInfo;

const Container = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: ${(props: { background: string }) => props.background};
  color: #fff;
  font-family: 'Arial', sans-serif;
  transition: background 0.5s ease;
`;

const WeatherCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin: 20px 0;
`;

const City = styled.h1`
  font-size: 2em;
  margin: 0;
`;

const Temperature = styled.p`
  font-size: 3em;
  margin: 10px 0;
`;

const Description = styled.p`
  font-size: 1em;
  margin: 5px 0;
  text-transform: capitalize;
`;

const WeekWeather = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const DayCard = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  margin: 10px;
  border-radius: 10px;
  text-align: center;
  flex: 1 1 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Day = styled.p`
  font-size: 1.2em;
  margin: 0;
`;

const Temp = styled.p`
  font-size: 2em;
  margin: 10px 0;
`;

const WeatherDesc = styled.p`
  font-size: 1em;
  text-transform: capitalize;
  margin: 5px 0;
`;