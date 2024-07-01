import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";

export const getLoginHistoryList = pagingParams => {
  return apiClient.get(URL_INFO.API_V1.LOGIN_HISTORY.concat("/list"), { params: { ...pagingParams } });
}