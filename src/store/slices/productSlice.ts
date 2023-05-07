import {createSlice} from '@reduxjs/toolkit';
import {SUB_ORDER_TYPE} from '~/constants/status';

interface ProductState {
  addingProduct: boolean;
  addedProduct: boolean;
  products: {
    id: string;
    name: string;
    weight: string;
    dimension: string;
    type: SUB_ORDER_TYPE;
    l: string;
    h: string;
    w: string;
  }[];
  error: any;
}

const productSlice = createSlice({
  name: 'product',
  initialState: {
    addingProduct: false,
    addedProduct: false,
    products: [],

    error: {},
  } as ProductState,
  reducers: {
    addProduct(state, action) {
      state.addingProduct = true;
      state.addedProduct = false;
    },
    addProductSuccess(state, action) {
      state.products.push(action.payload);
      state.addingProduct = false;
      state.addedProduct = true;
    },
    addProductError(state, action) {
      state.addingProduct = false;
      state.addedProduct = false;
      state.error = action.payload;
    },

    updateProduct(state, action) {},
    updateProductSuccess(state, action) {
      const id = state.products.findIndex(product => product.id === action.payload.id);
      state.products[id] = action.payload;
    },

    resetProducts(state) {
      state.products = [];
    },
  },
});

export const {addProduct, addProductSuccess, addProductError, updateProduct, updateProductSuccess, resetProducts} =
  productSlice.actions;
export default productSlice.reducer;
