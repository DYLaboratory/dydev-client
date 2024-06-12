import { LoginData } from 'src/models/data/dataModels';
import { AxiosPromise } from 'axios';
import apiClient from 'src/services/lib/dylaboAxios';
import { URL_INFO } from 'src/utils/constants';

export const signIn = (data: LoginData): AxiosPromise => {
  return apiClient.post(URL_INFO.API_V1.LOGIN_URL, data);
};

export const signOut = () => {
  return apiClient.post(URL_INFO.API_V1.LOGOUT_URL);
};

export const getLoginUser = (): AxiosPromise => {
  return apiClient.get('/session/user');
};
