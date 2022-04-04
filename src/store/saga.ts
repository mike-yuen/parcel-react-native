import {createAction} from '@reduxjs/toolkit';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import * as api from '~/services/api';
import {
  signIn,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOut,
  localSignIn,
  setSignUpData,
  signUpError,
  setSignUpDataSuccess,
  setSignUpDataError,
} from './slices/userSlice';

export function* signInSaga(action: any) {
  try {
    const response: {data: any} = yield call(api.user.signIn, action.payload);
    const {data} = response;
    yield put(signInSuccess());
    yield call(api.user.setStore, 'jt', 'abc');
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* localSignInSaga() {
  try {
    yield put(signInSuccess());
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* setSignUpDataSaga(action: any) {
  try {
    yield put(setSignUpDataSuccess(action.payload));
  } catch (error) {
    yield put(setSignUpDataError(error));
  }
}

export function* signOutSaga() {
  try {
    yield put(signOutSuccess());
  } catch (error) {}
}

export function* rootSignInSaga() {
  yield takeLatest(signIn.type, signInSaga);
}
function* rootSaga() {
  yield all([
    rootSignInSaga(),
    takeLatest(localSignIn.type, localSignInSaga),
    takeLatest(setSignUpData.type, setSignUpDataSaga),
    // takeLatest(actions.userSignUp.type, userSignUpSaga),
    takeLatest(signOut.type, signOutSaga),
    // takeLatest(actions.userLoad.type, userLoadSaga),
    // takeLatest(actions.userSignUpReset.type, userSignUpResetSaga),
    // takeLatest(actions.userVerifyEmail.type, userVerifyEmailSaga),
    // takeLatest(actions.loadPokerRooms.type, loadPokerRoomsSaga),
  ]);
}

export default rootSaga;
