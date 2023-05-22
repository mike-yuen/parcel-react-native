import {createSlice} from '@reduxjs/toolkit';
import {SUB_ORDER_TYPE} from '~/constants/status';

export interface IOrder {
  id?: string;
  status: number;
  driverIds: [];
  drivers: any[];
  recipient: any;
  fee: number;
  isExpress: boolean;
  description: string;
  packageType: SUB_ORDER_TYPE;
  paymentSide: number;
  paymentStatus: number;
  totalWeight: number;
  userId: string;
  recipientId: string;
  source: any;
  destination: any;
  subOrders: any[];
  createdAt: string;
  warehouse?: any;
  pickupImageUrl?: string;
  deliverImageUrl?: string;
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
  orderList: {data: IOrder[]};
  gettingOrdersInStock: boolean;
  gotOrdersInStock: boolean;
  orderListInStock: {data: IOrder[]};
  processingOrder: boolean;
  processedOrder: boolean;
  importingOrder: boolean;
  importedOrder: boolean;
  exportingOrder: boolean;
  exportedOrder: boolean;
  cancelingOrder: boolean;
  canceledOrder: boolean;
  assigningDriverToOrders: boolean;
  assignedDriverToOrders: boolean;
  trackingOrder: boolean;
  trackedOrder: boolean;
  trackingOrderData: {orderId: string; email: string};
  verifyingTrackingOrder: boolean;
  verifiedTrackingOrder: boolean;
  verifiedData: {orderId: string};
  uploadingImage: boolean;
  uploadedImage: boolean;
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
    orderList: {data: []},
    gettingOrdersInStock: false,
    gotOrdersInStock: false,
    orderListInStock: {data: []},
    processingOrder: false,
    processedOrder: false,
    importingOrder: false,
    importedOrder: false,
    exportingOrder: false,
    exportedOrder: false,
    cancelingOrder: false,
    canceledOrder: false,
    assigningDriverToOrders: false,
    assignedDriverToOrders: false,
    trackingOrder: false,
    trackedOrder: false,
    trackingOrderData: {} as {orderId: string; email: string},
    verifyingTrackingOrder: false,
    verifiedTrackingOrder: false,
    verifiedData: {} as {orderId: string},
    uploadingImage: false,
    uploadedImage: false,
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
    getOrders(state, action) {
      state.gettingOrders = true;
      state.gotOrders = false;
    },
    getOrdersSuccess(state, action) {
      // const ids = new Set(state.orderList.map(o => o.id));
      // state.orderList = [...state.orderList, ...action.payload.filter((n: any) => !ids.has(n.id))];
      state.orderList = action.payload;
      state.gettingOrders = false;
      state.gotOrders = true;
    },
    getOrdersError(state, action) {
      state.gettingOrders = false;
      state.gotOrders = false;
      state.error = action.payload;
    },

    // getOrdersInStock
    getOrdersInStock(state, action) {
      state.gettingOrdersInStock = true;
      state.gotOrdersInStock = false;
    },
    getOrdersInStockSuccess(state, action) {
      state.orderListInStock = action.payload;
      state.gettingOrdersInStock = false;
      state.gotOrdersInStock = true;
    },
    getOrdersInStockError(state, action) {
      state.gettingOrdersInStock = false;
      state.gotOrdersInStock = false;
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

    // getTrackingOrderDetail
    getTrackingOrderDetail(state, action) {
      state.gettingOrder = true;
      state.gotOrder = false;
    },

    // processOrder
    processOrder(state, action) {
      state.processingOrder = true;
      state.processedOrder = false;
    },
    processOrderSuccess(state, action) {
      state.order = Object.assign(state.order, action.payload);
      state.processingOrder = false;
      state.processedOrder = true;
    },
    processOrderError(state, action) {
      state.processingOrder = false;
      state.processedOrder = false;
      state.error = action.payload;
    },

    // import
    importParcel(state, action) {
      state.importingOrder = true;
      state.importedOrder = false;
    },
    importParcelSuccess(state, action) {
      state.order = Object.assign(state.order, action.payload);
      state.importingOrder = false;
      state.importedOrder = true;
    },
    importParcelError(state, action) {
      state.importingOrder = false;
      state.importedOrder = false;
      state.error = action.payload;
    },

    // export
    exportParcel(state, action) {
      state.exportingOrder = true;
      state.exportedOrder = false;
    },
    exportParcelSuccess(state, action) {
      state.order = Object.assign(state.order, action.payload);
      state.exportingOrder = false;
      state.exportedOrder = true;
    },
    exportParcelError(state, action) {
      state.exportingOrder = false;
      state.exportedOrder = false;
      state.error = action.payload;
    },

    // cancelOrder
    cancelOrder(state, action) {
      state.cancelingOrder = true;
      state.canceledOrder = false;
    },
    cancelOrderSuccess(state, action) {
      state.order = Object.assign(state.order, action.payload);
      state.cancelingOrder = false;
      state.canceledOrder = true;
    },
    cancelOrderError(state, action) {
      state.cancelingOrder = false;
      state.canceledOrder = false;
      state.error = action.payload;
    },

    // assignDriverToOrders
    assignDriverToOrders(state, action) {
      state.assigningDriverToOrders = true;
      state.assignedDriverToOrders = false;
    },
    assignDriverToOrdersSuccess(state, action) {
      state.order = Object.assign(state.order, action.payload[0]);
      state.assigningDriverToOrders = false;
      state.assignedDriverToOrders = true;
    },
    assignDriverToOrdersError(state, action) {
      state.assigningDriverToOrders = false;
      state.assignedDriverToOrders = false;
      state.error = action.payload;
    },

    // trackOrder
    trackOrder(state, action) {
      state.trackingOrder = true;
      state.trackedOrder = false;
    },
    trackOrderSuccess(state, action) {
      state.trackingOrderData = action.payload;
      state.trackingOrder = false;
      state.trackedOrder = true;
    },
    trackOrderError(state, action) {
      state.trackingOrder = false;
      state.trackedOrder = false;
      state.error = action.payload;
    },

    // verifyTrackingOrder
    verifyTrackingOrder(state, action) {
      state.verifyingTrackingOrder = true;
      state.verifiedTrackingOrder = false;
    },
    verifyTrackingOrderSuccess(state, action) {
      state.verifiedData = action.payload;
      state.verifyingTrackingOrder = false;
      state.verifiedTrackingOrder = true;
    },
    verifyTrackingOrderError(state, action) {
      state.verifyingTrackingOrder = false;
      state.verifiedTrackingOrder = false;
      state.error = action.payload;
    },

    // uploadImage
    uploadImage(state, action) {
      state.uploadingImage = true;
      state.uploadedImage = false;
    },
    uploadImageSuccess(state, action) {
      state.uploadingImage = false;
      state.uploadedImage = true;
    },
    uploadImageError(state, action) {
      state.uploadingImage = false;
      state.uploadedImage = false;
      state.error = action.payload;
    },

    resetOrder(state) {
      state.intentOrder = {} as Partial<IOrder>;
      state.order = {} as IOrder;
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
  getOrdersInStock,
  getOrdersInStockSuccess,
  getOrdersInStockError,
  getOrder,
  getOrderSuccess,
  getOrderError,
  getTrackingOrderDetail,
  processOrder,
  processOrderSuccess,
  processOrderError,
  importParcel,
  importParcelSuccess,
  importParcelError,
  exportParcel,
  exportParcelSuccess,
  exportParcelError,
  cancelOrder,
  cancelOrderSuccess,
  cancelOrderError,
  assignDriverToOrders,
  assignDriverToOrdersSuccess,
  assignDriverToOrdersError,
  trackOrder,
  trackOrderSuccess,
  trackOrderError,
  verifyTrackingOrder,
  verifyTrackingOrderSuccess,
  verifyTrackingOrderError,
  uploadImage,
  uploadImageSuccess,
  uploadImageError,
  resetOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
