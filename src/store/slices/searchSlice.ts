import {createSlice} from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searching: false,
    searched: false,
    searchData: {},

    selectingLocation: false,
    selectedLocation: false,
    selectedLocationData: {},

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
  },
});

export const {search, searchSuccess, searchError, selectLocation, selectLocationSuccess, selectLocationError} =
  searchSlice.actions;
export default searchSlice.reducer;
