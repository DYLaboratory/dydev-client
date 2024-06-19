import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";

export const getWeatherDust = (search: { city: string, weather: boolean, dust: boolean }) => {
  return apiClient.get(URL_INFO.API_V1.EXTERNAL.concat("/weather-dust"), { params: { city: search.city, weather: search.weather, dust: search.dust } });
}