import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import userReducer from './slices/userSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof reducer>;

export default store;
