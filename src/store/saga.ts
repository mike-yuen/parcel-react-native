import {all, call, put, takeLatest} from 'redux-saga/effects';
import * as api from '~/services/api';
import {signIn, signInSuccess, signInError, signOutSuccess, signOut, localSignIn} from './slices/userSlice';

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
  yield put(signInSuccess());
}

export function* signOutSaga() {
  yield put(signOutSuccess());
}

function* rootSaga() {
  yield all([
    takeLatest(signIn.type, signInSaga),
    takeLatest(localSignIn.type, localSignInSaga),
    takeLatest(signOut.type, signOutSaga),
    // takeLatest(actions.userLoad.type, userLoadSaga),
    // takeLatest(actions.userSignUp.type, userSignUpSaga),
    // takeLatest(actions.userSignUpReset.type, userSignUpResetSaga),
    // takeLatest(actions.userVerifyEmail.type, userVerifyEmailSaga),
    // takeLatest(actions.loadPokerRooms.type, loadPokerRoomsSaga),
  ]);
}

export default rootSaga;
