import { all } from 'redux-saga/effects';
import CmsSaga from './CmsSaga';
import AuthSaga from './AuthSaga';

const combinedSaga = [...CmsSaga, ...AuthSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
