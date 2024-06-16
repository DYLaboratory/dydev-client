import apiClient from "src/services/lib/dylaboAxios";
import { URL_INFO } from "src/utils/constants";
import { SiteData } from "src/models/data/dataModels";

export const getWebSiteList = () => {
  return apiClient.get(URL_INFO.API_V1.WEB_SITE.concat("/list"));
}

export const setInsertWebSite = (data: SiteData) => {
  return apiClient.post(URL_INFO.API_V1.ADMIN_WEB_SITE, data);
}

export const setUpdateWebSite = (data: SiteData) => {
  return apiClient.put(URL_INFO.API_V1.ADMIN_WEB_SITE.concat("/", String(data.id)), data);
}

export const setDeleteWebSite = (id: number) => {
  return apiClient.delete(URL_INFO.API_V1.ADMIN_WEB_SITE.concat("/", String(id)));
}

export const setDeleteWebSiteList = (idList: number[]) => {
  return apiClient.delete(URL_INFO.API_V1.ADMIN_WEB_SITE.concat("/list"), { params: { list: idList.join(",") } });
}