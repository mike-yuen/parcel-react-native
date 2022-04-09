import AsyncStorage from '@react-native-async-storage/async-storage';
import baseAxios from './_base.instance';

async function post(path: string, body: any = null) {
  try {
    const res = await baseAxios.post(path, body);
    console.log('api-result', res.data);
    const resBody = await res.data;
    return resBody;
  } catch (err) {
    console.log('api-error: ', JSON.stringify(err));
    throw err;
  }
}

export const user = {
  signIn: async (body: any) => await post('/authentication/log-in', body),
  signUp: async (body: any) => await post('/authentication/register', body),
  verifyEmail: async (body: any) => await post('/api/auth/verify-email', body),
  signOut: async (body: any) => await post('/api/auth/signout', body),
  setStore: async (key: string, value: string) => await AsyncStorage.setItem(key, value),
};
