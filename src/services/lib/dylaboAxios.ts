import axios from 'axios';
import { CONSTANTS } from 'src/utils/constants';

const apiClient = axios.create();

apiClient.defaults.baseURL = CONSTANTS.API_V1_BASE_URL;
apiClient.defaults.headers["Accept"] = "application/json";
apiClient.defaults.withCredentials = true;

export default apiClient;