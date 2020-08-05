import axios from 'axios';
import { STATUS_CODES } from '@/enums';
import { PAGES } from '@/router/pages';
import history from '@router/history';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use((config) => config, async (error) => {
  const { response } = error;
  if (response.status === STATUS_CODES.UNAUTHORIZED) {
    history.push(PAGES.LOGIN_PAGE);
  }
  throw error;
});

export default axiosInstance;
