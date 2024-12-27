import Axios, { AxiosHeaders } from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 8000,
});

export const formDataHeaders = new AxiosHeaders();
formDataHeaders.setContentType('multipart/form-data');

export const updateApiToken = (token: string | null) => {
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axios.defaults.headers.common['Authorization'];
};

export default axios;
