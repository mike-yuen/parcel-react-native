import AsyncStorage from '@react-native-async-storage/async-storage';
import {getClient} from './base.client';

const parcelClient = getClient('http://app.pandamaster.club:8443');
const goongClient = getClient('https://rsapi.goong.io');
const GOONG_API_KEY = 'mjXPVzvQKJmyp6HbVDlczUVpYD59CHXmOShWJdeC';

export const parcelApi = {
  async signUp(body: any) {
    try {
      const res = await parcelClient.post('/authentication/register', body);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  // verifyEmail: async (body: any) => await post('/api/auth/verify-email', body),

  async signIn(body: any) {
    try {
      const res = await parcelClient.post('/authentication/log-in', body);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async setStore(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  },

  async signOut() {
    try {
      const res = await parcelClient.post('/authentication/log-out');
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async removeStore(key: string) {
    await AsyncStorage.removeItem(key);
  },
};

export const goongApi = {
  async placeAutocomplete(input: string) {
    try {
      const res = await goongClient.get('/Place/AutoComplete', {
        params: {api_key: GOONG_API_KEY, limit: 4, input: encodeURI(input)},
      });
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async placeDetail(placeId: string) {
    try {
      const res = await goongClient.get('/Place/Detail', {
        params: {api_key: GOONG_API_KEY, place_id: placeId},
      });
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },
};
