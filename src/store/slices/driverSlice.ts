import {createSlice} from '@reduxjs/toolkit';

interface DriverState {
  gettingDrivers: boolean;
  gotDrivers: boolean;
  drivers: {
    data: {id: string; user: any; vehicle: any; licenses: any; status: number}[];
  };
  error: any;
}

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    gettingDrivers: false,
    gotDrivers: false,
    drivers: {
      data: [],
    },

    error: {},
  } as DriverState,
  reducers: {
    getDrivers(state) {
      state.gettingDrivers = true;
      state.gotDrivers = false;
    },
    getDriversSuccess(state, action) {
      state.drivers = action.payload;
      state.gettingDrivers = false;
      state.gotDrivers = true;
    },
    getDriversError(state, action) {
      state.gettingDrivers = false;
      state.gotDrivers = false;
      state.error = action.payload;
    },
  },
});

export const {getDrivers, getDriversSuccess, getDriversError} = driverSlice.actions;
export default driverSlice.reducer;
