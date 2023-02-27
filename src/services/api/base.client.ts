import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getClient = (baseURL: string) => {
  const instance = axios.create({
    baseURL: baseURL,
    timeout: 10000,
  });

  instance.interceptors.request.use(
    async function (config) {
      const jt = await AsyncStorage.getItem('jt');
      // const rjt = await AsyncStorage.getItem('rjt');

      if (jt) {
        config.headers!.Authorization = jt;
      }
      config.headers!['Cache-Control'] = 'no-cache';
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response: any) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error: any) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );

  return instance;
};
