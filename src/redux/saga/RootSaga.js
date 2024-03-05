import { all } from 'redux-saga/effects';
import CmsSaga from './CmsSaga';
import AuthSaga from './AuthSaga';
import PatientSaga from './PatientSaga';
import DashboardSaga from './DashboardSaga';

const combinedSaga = [...CmsSaga, ...AuthSaga, ...PatientSaga, ...DashboardSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
