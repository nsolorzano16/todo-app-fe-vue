import axios from 'axios';
// create an axios instance
const todosApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL ?? '',
});

todosApi.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return config;
  },
  (error) => {
    // do something with request error
    return Promise.reject(error);
  }
);

export default todosApi;
