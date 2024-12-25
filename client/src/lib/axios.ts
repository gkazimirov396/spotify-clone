import Axios, { AxiosHeaders } from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 5000,
});

export const formDataHeaders = new AxiosHeaders();
formDataHeaders.setContentType('multipart/form-data');

export default axios;
