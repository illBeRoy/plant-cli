import axios from 'axios';

const axiosInstance = axios.create();

export const httpGet = (url: string) =>
  axios.get(url).then(res => res.data);
