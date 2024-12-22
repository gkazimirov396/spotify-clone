import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 5000,
});

export default axios;
