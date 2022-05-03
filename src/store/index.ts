import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import recipientReducer from './slices/recipientSlice';
import searchReducer from './slices/searchSlice';
import userReducer from './slices/userSlice';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  order: orderReducer,
  product: productReducer,
  recipient: recipientReducer,
  search: searchReducer,
  user: userReducer,
});

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false, thunk: false}).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof reducer>;

export default store;
