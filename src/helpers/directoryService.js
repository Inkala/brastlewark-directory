import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://raw.githubusercontent.com/rrafols/mobile_test/master'
});

export default axiosInstance;
