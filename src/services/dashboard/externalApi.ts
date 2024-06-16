import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";

export const getWeather = city => {
  return apiClient.get(URL_INFO.API_V1.EXTERNAL.concat("/weather"), { params: { city: city } });
}