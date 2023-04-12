import {createSlice} from '@reduxjs/toolkit';

interface WareHouseState {
  gettingWarehouses: boolean;
  gotWarehouses: boolean;
  warehouses: {
    data: {id: string; name: string; location: any; address: string}[];
  };
  error: any;
}

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState: {
    gettingWarehouses: false,
    gotWarehouses: false,
    warehouses: {
      data: [],
    },

    error: {},
  } as WareHouseState,
  reducers: {
    getWarehouses(state) {
      state.gettingWarehouses = true;
      state.gotWarehouses = false;
    },
    getWarehousesSuccess(state, action) {
      state.warehouses = action.payload;
      state.gettingWarehouses = false;
      state.gotWarehouses = true;
    },
    getWarehousesError(state, action) {
      state.gettingWarehouses = false;
      state.gotWarehouses = false;
      state.error = action.payload;
    },
  },
});

export const {getWarehouses, getWarehousesSuccess, getWarehousesError} = warehouseSlice.actions;
export default warehouseSlice.reducer;
