import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BASE_API = 'http://app.pandamaster.club:8443'; // process.env.RN_BASE_API;

const baseAxios = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
});

baseAxios.interceptors.request.use(
  async function (config) {
    const jt = await AsyncStorage.getItem('jt');
    const rjt = await AsyncStorage.getItem('rjt');

    if (jt && rjt) {
      const token = `${jt}:${rjt}`;
      config.headers!.Authorization = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default baseAxios;
