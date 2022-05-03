import {createSlice} from '@reduxjs/toolkit';

interface OrderState {
  addingOrder: boolean;
  addedOrder: boolean;
  order: {
    id?: string;
    status: number;
    driverIds: [];
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
  };
  gettingOrder: boolean;
  gotOrder: boolean;
  orderList: any[];
  error: any;
}

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    addingOrder: false,
    addedOrder: false,
    order: {},
    gettingOrder: false,
    gotOrder: false,
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

    getOrder(state) {
      state.gettingOrder = true;
      state.gotOrder = false;
    },
    getOrderSuccess(state, action) {
      const ids = new Set(state.orderList.map(o => o.id));
      state.orderList = [...state.orderList, ...action.payload.filter((n: any) => !ids.has(n.id))];
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

export const {addOrder, addOrderSuccess, addOrderError, getOrder, getOrderSuccess, getOrderError} = orderSlice.actions;
export default orderSlice.reducer;
