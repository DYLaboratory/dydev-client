import axios from 'axios';
import { CONSTANTS } from 'src/utils/constants';
import { apiErrorResponse } from 'src/services/lib/axiosInterceptor';
import { useErrAlert } from "src/utils/errUtils";

const apiClient = axios.create();

apiClient.defaults.baseURL = CONSTANTS.API_V1_BASE_URL;
apiClient.defaults.headers['Accept'] = 'application/json';
apiClient.defaults.withCredentials = true;

apiClient.interceptors.response.use(
  response => response,
  async err => {
    const { errNetworkAlert, errAuthAlert } = useErrAlert();

    console.log(err);

    await apiErrorResponse(err, errNetworkAlert, errAuthAlert);
  }
);

export default apiClient;
