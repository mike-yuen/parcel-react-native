import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signingIn: false,
    signedIn: false,
    loadingUser: false,
    loadedUser: false,
    user: {},
    error: {},
  },
  reducers: {
    /**
     * signIn
     */
    signIn(state, action) {
      state.signingIn = true;
      state.signedIn = false;
    },
    signInSuccess(state) {
      state.signingIn = false;
      state.signedIn = true;
    },
    signInError(state, action) {
      state.signingIn = false;
      state.signedIn = false;
      state.error = action.payload;
    },
    localSignIn() {},
    /**
     * signOut
     */
    signOut() {},
    signOutSuccess(state) {
      state.signedIn = false;
    },

    getUser() {},
    setUser(state, action) {
      const userData = action.payload;
      return {...state, ...userData};
    },
  },
});

export const {signIn, signInSuccess, signInError, localSignIn, signOut, signOutSuccess, getUser, setUser} =
  userSlice.actions;
export default userSlice.reducer;
