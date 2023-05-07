import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searching: false,
    searched: false,
    searchData: {},

    selectingLocation: false,
    selectedLocation: false,
    selectedLocationData: {
      placeId: '',
      name: '',
      address: '',
      location: {
        lat: '',
        lng: '',
      },
    },

    error: {},
  },
  reducers: {
    search(state, action) {
      state.searching = true;
      state.searched = false;
    },
    searchSuccess(state, action) {
      state.searching = false;
      state.searched = true;
      state.searchData = action.payload;
    },
    searchError(state, action) {
      state.searching = false;
      state.searched = false;
      state.error = action.payload;
    },

    selectLocation(state, action) {
      state.selectingLocation = true;
      state.selectedLocation = false;
    },
    selectLocationSuccess(state, action) {
      state.selectingLocation = false;
      state.selectedLocation = true;
      state.selectedLocationData = action.payload;
    },
    selectLocationError(state, action) {
      state.selectingLocation = false;
      state.selectedLocation = false;
      state.error = action.payload;
    },

    resetSelectedLocation(state) {
      state.selectedLocationData = {
        placeId: '',
        name: '',
        address: '',
        location: {lat: '', lng: ''},
      };
    },
  },
});

export const {
  search,
  searchSuccess,
  searchError,
  selectLocation,
  selectLocationSuccess,
  selectLocationError,
  resetSelectedLocation,
} = searchSlice.actions;
export default searchSlice.reducer;
