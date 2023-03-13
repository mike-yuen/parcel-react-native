import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {parcelApi, goongApi} from '~/services/api';
import {RootState} from '.';
import {
  addOrder,
  addOrderError,
  addOrderSuccess,
  getOrders,
  getOrdersSuccess,
  getOrdersError,
  getOrder,
  getOrderError,
  getOrderSuccess,
  createIntentOrder,
  createIntentOrderSuccess,
  createIntentOrderError,
  IOrder,
  processOrderSuccess,
  processOrderError,
  processOrder,
} from './slices/orderSlice';
import {
  addProduct,
  addProductError,
  addProductSuccess,
  updateProduct,
  updateProductSuccess,
} from './slices/productSlice';
import {addRecipient, addRecipientError, addRecipientSuccess, saveRecipient} from './slices/recipientSlice';
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
  getUserSuccess,
  getUserError,
  getUser,
} from './slices/userSlice';

export function* signInSaga(action: any) {
  try {
    const {accessToken} = yield call(parcelApi.signIn, action.payload);
    yield call(parcelApi.setStore, 'jt', accessToken);
    yield put(signInSuccess());
    yield call(getUserSaga);
  } catch (error) {
    yield put(signInError(error));
  }
}

export function* localSignInSaga() {
  try {
    yield put(signInSuccess());
    yield call(getUserSaga);
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
    yield call(signInSaga, {payload: {email, password: signUpData.password}});
  } catch (error) {
    yield put(signUpError(error));
  }
}

export function* signOutSaga() {
  try {
    yield call(parcelApi.removeStore, 'jt');
    yield put(signOutSuccess());
    yield call(parcelApi.signOut);
  } catch (error) {}
}

export function* getUserSaga() {
  try {
    const {id, displayName, email, phone, address, location} = yield call(parcelApi.currentUser);
    yield put(getUserSuccess({id, displayName, email, phone, address, location}));
  } catch (error) {
    yield put(getUserError(error));
  }
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

/**
 * Product Saga
 */
export function* addProductSaga(action: any) {
  try {
    yield put(addProductSuccess(action.payload));
  } catch (error) {
    yield put(addProductError(error));
  }
}
export function* updateProductSaga(action: any) {
  try {
    yield put(updateProductSuccess(action.payload));
  } catch (error) {}
}

/**
 * Recipient Saga
 */
export function* addRecipientSaga(action: any) {
  try {
    yield put(addRecipientSuccess(action.payload));
  } catch (error) {
    yield put(addRecipientError(error));
  }
}

export function* saveRecipientSaga(action: any) {
  try {
    const {id, name, address} = yield call(parcelApi.createRecipient, action.payload);
    yield put(addRecipientSuccess({id, name, address}));
  } catch (error) {
    yield put(addRecipientError(error));
  }
}

/**
 * Order Saga
 */
export function* createIntentOrderSaga(action: any) {
  try {
    const intentOrder: Partial<IOrder> = yield call(parcelApi.estimateFee, action.payload);
    yield put(createIntentOrderSuccess(intentOrder));
  } catch (error) {
    yield put(createIntentOrderError(error));
  }
}

export function* addOrderSaga(action: any) {
  try {
    console.log('---------------- addOrderSaga: ', action.payload.data);
    const {id} = yield call(parcelApi.createOrder, action.payload.data);
    console.log('================ id: ', id);
    if (id) {
      yield put(addOrderSuccess({id}));
    }
    action.payload.navigation.navigate('Home');
  } catch (error) {
    yield put(addOrderError(error));
  }
}

export function* getOrdersSaga(action: any) {
  try {
    const data: any[] = yield call(parcelApi.getOrders);
    if (data) yield put(getOrdersSuccess(data));
  } catch (error) {
    yield put(getOrdersError(error));
  }
}

export function* getOrderSaga(action: any) {
  try {
    const data: {id: string} = yield call(parcelApi.getOrder, action.payload);
    if (data) yield put(getOrderSuccess(data));
  } catch (error) {
    yield put(getOrderError(error));
  }
}

export function* processOrderSaga(action: any) {
  try {
    const {orderId, nextStatusId} = action.payload;
    const data: {id: string} = yield call(parcelApi.processOrder, orderId, nextStatusId);
    if (data) yield put(processOrderSuccess(data));
  } catch (error) {
    yield put(processOrderError(error));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(signIn.type, signInSaga),
    takeLatest(localSignIn.type, localSignInSaga),
    takeLatest(setSignUpData.type, setSignUpDataSaga),
    takeLatest(signUp.type, signUpSaga),
    takeLatest(signOut.type, signOutSaga),
    takeLatest(getUser.type, getUserSaga),

    takeLatest(search.type, searchSaga),
    takeLatest(selectLocation.type, selectLocationSaga),

    takeLatest(addProduct.type, addProductSaga),
    takeLatest(updateProduct.type, updateProductSaga),

    takeLatest(addRecipient.type, addRecipientSaga),
    takeLatest(saveRecipient.type, saveRecipientSaga),

    takeLatest(createIntentOrder.type, createIntentOrderSaga),
    takeLatest(addOrder.type, addOrderSaga),
    takeLatest(getOrders.type, getOrdersSaga),
    takeLatest(getOrder.type, getOrderSaga),
    takeLatest(processOrder.type, processOrderSaga),
  ]);
}

export default rootSaga;
