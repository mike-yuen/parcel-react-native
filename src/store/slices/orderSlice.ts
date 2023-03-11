import {createSlice} from '@reduxjs/toolkit';

export interface IOrder {
  id?: string;
  status: number;
  driverIds: [];
  drivers: any[];
  recipient: any;
  fee: number;
  isExpress: boolean;
  description: string;
  paymentSide: number;
  paymentStatus: number;
  totalWeight: number;
  userId: string;
  recipientId: string;
  source: any;
  destination: any;
  subOrders: any[];
}

interface OrderState {
  creatingIntentOrder: boolean;
  createdIntentOrder: boolean;
  intentOrder: Partial<IOrder>;
  addingOrder: boolean;
  addedOrder: boolean;
  gettingOrder: boolean;
  gotOrder: boolean;
  order: IOrder;
  gettingOrders: boolean;
  gotOrders: boolean;
  orderList: IOrder[];
  error: any;
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    creatingIntentOrder: false,
    createdIntentOrder: false,
    intentOrder: {} as IOrder,
    addingOrder: false,
    addedOrder: false,
    gettingOrder: false,
    gotOrder: false,
    order: {} as IOrder,
    gettingOrders: false,
    gotOrders: false,
    orderList: [] as IOrder[],
    error: {},
  } as OrderState,

  reducers: {
    createIntentOrder(state, action) {
      state.creatingIntentOrder = true;
      state.createdIntentOrder = false;
    },
    createIntentOrderSuccess(state, action) {
      state.intentOrder = Object.assign(state.intentOrder, action.payload);
      state.creatingIntentOrder = false;
      state.createdIntentOrder = true;
    },
    createIntentOrderError(state, action) {
      state.creatingIntentOrder = false;
      state.createdIntentOrder = false;
      state.error = action.payload;
    },

    // addOrder
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

    // getOrders
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

    // getOrder
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
  createIntentOrder,
  createIntentOrderSuccess,
  createIntentOrderError,
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
