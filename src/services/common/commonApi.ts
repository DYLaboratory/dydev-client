import { AxiosPromise } from "axios";
import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";

export const saveAccess = (): AxiosPromise => {
  return apiClient.post(URL_INFO.API_V1.ACCESS_HISTORY);
};