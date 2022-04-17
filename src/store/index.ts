import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import userReducer from './slices/userSlice';
import searchReducer from './slices/searchSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false, thunk: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof reducer>;

export default store;
