import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";
import { FeedData } from "src/models/data/dataModels";

export const getFeedList = () => {
  return apiClient.get(URL_INFO.API_V1.FEED.concat("/list"));
}

export const setInsertFeed = (data: FeedData) => {
  return apiClient.post(URL_INFO.API_V1.ADMIN_FEED, data);
}

export const setDeleteFeed = (id: number) => {
  return apiClient.delete(URL_INFO.API_V1.ADMIN_FEED.concat("/", String(id)));
}
