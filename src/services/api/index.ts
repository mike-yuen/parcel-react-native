import AsyncStorage from '@react-native-async-storage/async-storage';
import {getClient} from './base.client';

const parcelClient = getClient('https://ce2d-2402-800-63b6-ce3a-25ed-1bf-87a6-aad5.ap.ngrok.io');
// http://app.pandamaster.club:8443
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

  async signIn(body: any) {
    try {
      const res = await parcelClient.post('/authentication/log-in', body);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
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

  async currentUser() {
    try {
      const res = await parcelClient.get('/authentication/current-user');
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async createRecipient(body: any) {
    try {
      const res = await parcelClient.post('/recipient', body);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async createOrder(body: any) {
    try {
      const res = await parcelClient.post('/order', body);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async createSubOrder(body: any) {
    try {
      const res = await parcelClient.post('/suborder', body);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getOrder() {
    try {
      const res = await parcelClient.get('/order');
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async setStore(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
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
