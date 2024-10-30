import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";

export const getFeedList = () => {
  return apiClient.get(URL_INFO.API_V1.FEED.concat("/list"));
}

export const setInsertFeed = (data: FormData) => {
  return apiClient.post(URL_INFO.API_V1.ADMIN_FEED, data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export const setUpdateFeed = (id: number, data: FormData) => {
  return apiClient.put(URL_INFO.API_V1.ADMIN_FEED, data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export const setDeleteFeed = (id: number) => {
  return apiClient.delete(URL_INFO.API_V1.ADMIN_FEED.concat("/", String(id)));
}
