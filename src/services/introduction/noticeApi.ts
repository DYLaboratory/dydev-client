import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";
import { NoticeData } from "src/models/data/dataModels";

export const getNoticeById = id => {
  return apiClient.get(URL_INFO.API_V1.NOTICE.concat("/", id));
}

export const getNoticeList = () => {
  return apiClient.get(URL_INFO.API_V1.NOTICE.concat("/list"));
}

export const setInsertNotice = (data: NoticeData) => {
  return apiClient.post(URL_INFO.API_V1.ADMIN_NOTICE, data);
}

export const setUpdateNotice = (data: NoticeData) => {
  return apiClient.put(URL_INFO.API_V1.ADMIN_NOTICE.concat("/", String(data.id)), data);
}

export const setDeleteNotice = (id: number) => {
  return apiClient.delete(URL_INFO.API_V1.ADMIN_NOTICE.concat("/", String(id)));
}