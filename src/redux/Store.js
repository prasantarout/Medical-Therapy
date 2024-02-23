import {combineReducers, configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {logger} from 'redux-logger';
import RootSaga from './saga/RootSaga';
import CmsReducer from './reducer/CmsReducer';
import AuthReducer from './reducer/AuthReducer';
import PatientReducer from './reducer/PatientReducer';
// import AssignmentsReducer from './reducer/AssignmentsReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  CmsReducer: CmsReducer,
  PatientReducer: PatientReducer,
  // AssignmentsReducer: AssignmentsReducer,
});

let SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware, logger];
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(middleware),
});
export const persistor = persistStore(Store);
SagaMiddleware.run(RootSaga);
