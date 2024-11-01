import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";
import { SystemSettingsData } from "src/models/data/dataModels";

export const getSystemSettings = () => {
  return apiClient.get(URL_INFO.API_V1.SETTINGS);
}

export const setInsertSystemSettings = (data: SystemSettingsData) => {
  return apiClient.post(URL_INFO.API_V1.SYSTEM_SETTINGS, data);
}
