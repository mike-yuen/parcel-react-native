import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    signingIn: false,
    signedIn: false,

    settingSignUpData: false,
    setSignUpData: false,
    signUpData: {} as any,

    signingUp: false,
    signedUp: false,

    loadingUser: false,
    loadedUser: false,
    user: {
      id: '',
      displayName: '',
      email: '',
      phone: '',
      address: '',
      location: {} as any,
      roles: [] as any[],
    },

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
     * setSignUpData
     */
    setSignUpData(state, action) {
      state.settingSignUpData = true;
      state.setSignUpData = false;
    },
    setSignUpDataSuccess: (state, action) => {
      state.signUpData = Object.assign(state.signUpData, action.payload);
      state.settingSignUpData = false;
      state.setSignUpData = true;
    },
    setSignUpDataError: (state, action) => {
      state.settingSignUpData = false;
      state.setSignUpData = false;
      state.error = action.payload;
    },
    /**
     * signUp
     */
    signUp(state, action) {
      state.signingUp = true;
      state.signedUp = false;
    },
    signUpSuccess(state) {
      state.signingUp = false;
      state.signedUp = true;
    },
    signUpError(state, action) {
      state.signingUp = false;
      state.signedUp = false;
      state.error = action.payload;
    },
    /**
     * signOut
     */
    signOut() {},
    signOutSuccess(state) {
      state.signedIn = false;
    },
    /**
     * getUser
     */
    getUser(state) {
      state.loadingUser = true;
      state.loadedUser = false;
    },
    getUserSuccess(state, action) {
      state.user = Object.assign(state.user, action.payload);
      state.loadingUser = false;
      state.loadedUser = true;
    },
    getUserError(state, action) {
      state.loadingUser = false;
      state.loadedUser = false;
      state.error = action.payload;
    },
  },
});

export const {
  signIn,
  signInSuccess,
  signInError,
  localSignIn,
  setSignUpData,
  setSignUpDataSuccess,
  setSignUpDataError,
  signUp,
  signUpSuccess,
  signUpError,
  signOut,
  signOutSuccess,
  getUser,
  getUserSuccess,
  getUserError,
} = userSlice.actions;
export default userSlice.reducer;
