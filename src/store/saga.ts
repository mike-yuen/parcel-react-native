import {all, call, put, takeLatest} from 'redux-saga/effects';
import * as api from '~/services/api';
import {signIn, signInSuccess, signInError} from './slices/userSlice';

export function* signInSaga(action: any) {
  try {
    const response: {data: any} = yield call(api.user.signIn, action.payload);
    const {data} = response;
    yield put(signInSuccess());
  } catch (error) {
    yield put(signInError(error));
  }
}

function* rootSaga() {
  yield all([
    takeLatest(signIn.type, signInSaga),
    // takeLatest(actions.userLoad.type, userLoadSaga),
    // takeLatest(actions.userSignUp.type, userSignUpSaga),
    // takeLatest(actions.userSignUpReset.type, userSignUpResetSaga),
    // takeLatest(actions.userVerifyEmail.type, userVerifyEmailSaga),
    // takeLatest(actions.userSignOut.type, userSignOutSaga),
    // takeLatest(actions.loadPokerRooms.type, loadPokerRoomsSaga),
  ]);
}

export default rootSaga;
