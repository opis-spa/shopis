import axios from 'axios';
import { auth } from './firebase';

// ----------------------------------------------------------------------

const urlApi = process.env.REACT_APP_URL_API || 'https://apis.opis.cl';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (response) => {
  try {
    const token = await auth.currentUser.getIdToken();
    response.headers.Authorization = `Bearer ${token}`;
    response.headers['Access-Control-Allow-Origin'] = '*';
  } catch (error) {
    response.headers.Authorization = '';
  }
  response.baseURL = urlApi;
  return response;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
