import AsyncStorage from '@react-native-async-storage/async-storage';
import {getClient} from './base.client';
import qs from 'qs';
import axios from 'axios';

const parcelClient = getClient('http://10.0.2.2:8443');
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
      console.log('currentUser:', resBody);
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

  async estimateFee(body: any) {
    try {
      const res = await parcelClient.post('/order/intentOrder', body);
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

  async getOrders(statusIds?: any[]) {
    const params: {[x: string]: any} = {
      pageSize: 100,
      pageNumber: 0,
    };
    if (statusIds) params.statusIds = statusIds;
    console.log('orders statusIds: ', statusIds);
    try {
      const res = await parcelClient.get('/order', {
        params,
        paramsSerializer: params => {
          return qs.stringify(params);
        },
      });
      const resBody = res.data;
      console.log('orders: ', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getOrdersByWarehouse(warehouseId: string) {
    const params: {[x: string]: any} = {
      pageSize: 100,
      pageNumber: 0,
      warehouseId,
      sortBy: 'createdAt',
      sortDirection: -1,
    };

    try {
      const res = await parcelClient.get('/order/order-by-warehouse', {
        params,
        paramsSerializer: params => {
          return qs.stringify(params);
        },
      });
      const resBody = res.data;
      console.log('order-by-warehouse: ', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getOrder(id: string) {
    try {
      const res = await parcelClient.get(`/order/${id}`);
      const resBody = res.data;
      console.log('order: ', JSON.stringify(resBody));
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async processOrder(orderId: string, nextStatusId: number) {
    try {
      const res = await parcelClient.post('/order/submit-next', {
        orderId,
        nextStatusId,
      });
      const resBody = res.data;
      console.log('processOrder', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async cancelOrder(orderId: string, comment?: string) {
    try {
      const res = await parcelClient.post('/order/cancel', {
        orderId,
        comment,
      });
      const resBody = res.data;
      console.log('cancelOrder', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async assignDriverToOrders(userId: string, orderId: string) {
    try {
      const res = await parcelClient.post('/order/process-orders', {
        userId,
        warehouseId: '',
        orderIds: [orderId],
        // vehicleId,
      });
      const resBody = res.data;
      console.log('assignDriverToOrders', resBody);
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

  async trackOrder(orderId: string) {
    try {
      const res = await parcelClient.post('/email/send-order-verfication-code', {orderId});
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async verifyTrackingOrder(orderId: string, code: string) {
    try {
      const res = await parcelClient.post('/email/code-verification', {orderId, code});
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getTrackingOrderDetail(id: string) {
    try {
      const res = await parcelClient.get(`/order/tracking/${id}`);
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async createIntentPayment(orderId: string, fee: number) {
    try {
      const res = await parcelClient.post('/order/create-intent-payment', {
        orderId,
        fee,
      });
      const resBody = res.data;
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getWarehouses() {
    try {
      const res = await parcelClient.get('/warehouse', {
        params: {
          pageSize: 100,
          pageNumber: 0,
        },
      });
      const resBody = res.data;
      console.log('warehouse: ', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async getDrivers() {
    try {
      const res = await parcelClient.get('/driver', {
        params: {
          pageSize: 100,
          pageNumber: 0,
        },
      });
      const resBody = res.data;
      console.log('drivers: ', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async uploadOrderImage(formData: any) {
    try {
      const response = await axios({
        method: 'POST',
        url: `http://10.0.2.2:8443/order/order-image`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: () => {
          return formData;
        },
      });

      if (response) {
        const resBody = response.data;
        return resBody;
      }
    } catch (err) {
      throw err;
    }
  },

  async import(orderId: string, warehouseId: string) {
    try {
      const res = await parcelClient.post('/import', {
        orderId,
        warehouseId,
      });
      const resBody = res.data;
      console.log('import: ', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
  },

  async export(orderId: string, userId: string) {
    try {
      const res = await parcelClient.post('/export', {
        orderId,
        userId,
      });
      const resBody = res.data;
      console.log('export: ', resBody);
      return resBody;
    } catch (err) {
      throw err;
    }
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
