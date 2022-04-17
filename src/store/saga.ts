import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {parcelApi, goongApi} from '~/services/api';
import {RootState} from '.';
import {
  search,
  searchError,
  searchSuccess,
  selectLocation,
  selectLocationError,
  selectLocationSuccess,
} from './slices/searchSlice';
import {
  signIn,
  signInSuccess,
  signInError,
  signOutSuccess,
  signOut,
  localSignIn,
  setSignUpData,
  setSignUpDataSuccess,
  setSignUpDataError,
  signUpSuccess,
  signUpError,
  signUp,
} from './slices/userSlice';

export function* signInSaga(action: any) {
  try {
    const {accessToken} = yield call(parcelApi.signIn, action.payload);
    yield call(parcelApi.setStore, 'jt', accessToken);
    yield put(signInSuccess());
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

export function* signUpSaga(action: any) {
  try {
    const {email} = yield call(parcelApi.signUp, action.payload);
    yield put(signUpSuccess());

    const getUser = (state: RootState) => state.user;
    const {signUpData} = yield select(getUser);
    const {accessToken} = yield call(parcelApi.signIn, {email, password: signUpData.password});
    yield call(parcelApi.setStore, 'jt', accessToken);
    yield put(signInSuccess());
  } catch (error) {
    yield put(signUpError(error));
  }
}

export function* signOutSaga() {
  try {
    yield call(parcelApi.signOut);
    yield call(parcelApi.removeStore, 'jt');
    yield put(signOutSuccess());
  } catch (error) {}
}

/**
 * Search Saga
 */
export function* searchSaga(action: any) {
  try {
    const {status, predictions} = yield call(goongApi.placeAutocomplete, action.payload);
    if (status === 'OK') {
      yield put(searchSuccess(predictions));
    } else {
      yield put(searchError(status));
    }
  } catch (error) {
    yield put(searchError(error));
  }
}

export function* selectLocationSaga(action: any) {
  try {
    const {status, result} = yield call(goongApi.placeDetail, action.payload);
    if (status === 'OK') {
      const {place_id, name, formatted_address, geometry} = result;
      const store = {placeId: place_id, name, address: formatted_address, location: geometry.location};
      yield put(selectLocationSuccess(store));
    } else {
      yield put(selectLocationError(status));
    }
  } catch (error) {
    yield put(selectLocationError(error));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(signIn.type, signInSaga),
    takeLatest(localSignIn.type, localSignInSaga),
    takeLatest(setSignUpData.type, setSignUpDataSaga),
    takeLatest(signUp.type, signUpSaga),
    takeLatest(signOut.type, signOutSaga),

    takeLatest(search.type, searchSaga),
    takeLatest(selectLocation.type, selectLocationSaga),
  ]);
}

export default rootSaga;
