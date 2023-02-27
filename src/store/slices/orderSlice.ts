import {createSlice} from '@reduxjs/toolkit';

interface OrderState {
  addingOrder: boolean;
  addedOrder: boolean;
  gettingOrder: boolean;
  gotOrder: boolean;
  order: {
    id?: string;
    status: number;
    driverIds: [];
    drivers: any[];
    recipient: any;
    fee: number;
    isDirectPickup: boolean;
    isDirectDelivery: boolean;
    description: string;
    paymentSide: number;
    paymentStatus: number;
    totalWeight: number;
    userId: string;
    recipientId: string;
    value: number;
    srcWarehouseId: string;
    destWarehouseId: string;
    subOrders: any[];
  };
  gettingOrders: boolean;
  gotOrders: boolean;
  orderList: any[];
  error: any;
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    addingOrder: false,
    addedOrder: false,
    gettingOrder: false,
    gotOrder: false,
    order: {},
    gettingOrders: false,
    gotOrders: false,
    orderList: [] as any[],
    error: {},
  } as OrderState,

  reducers: {
    addOrder(state, action) {
      state.addingOrder = true;
      state.addedOrder = false;
    },
    addOrderSuccess(state, action) {
      state.order = Object.assign(state.order, action.payload);
      state.addingOrder = false;
      state.addedOrder = true;
    },
    addOrderError(state, action) {
      state.addingOrder = false;
      state.addedOrder = false;
      state.error = action.payload;
    },

    getOrders(state) {
      state.gettingOrders = true;
      state.gotOrders = false;
    },
    getOrdersSuccess(state, action) {
      const ids = new Set(state.orderList.map(o => o.id));
      state.orderList = [...state.orderList, ...action.payload.filter((n: any) => !ids.has(n.id))];
      state.gettingOrders = false;
      state.gotOrders = true;
    },
    getOrdersError(state, action) {
      state.gettingOrders = false;
      state.gotOrders = false;
      state.error = action.payload;
    },

    getOrder(state, action) {
      state.gettingOrder = true;
      state.gotOrder = false;
    },
    getOrderSuccess(state, action) {
      state.order = action.payload;
      state.gettingOrder = false;
      state.gotOrder = true;
    },
    getOrderError(state, action) {
      state.gettingOrder = false;
      state.gotOrder = false;
      state.error = action.payload;
    },
  },
});

export const {
  addOrder,
  addOrderSuccess,
  addOrderError,
  getOrders,
  getOrdersSuccess,
  getOrdersError,
  getOrder,
  getOrderSuccess,
  getOrderError,
} = orderSlice.actions;
export default orderSlice.reducer;
