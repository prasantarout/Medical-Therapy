import { all } from 'redux-saga/effects';
import CmsSaga from './CmsSaga';
import AuthSaga from './AuthSaga';
import PatientSaga from './PatientSaga';
// import AssignmentsSaga from './AssignmentsSaga';

const combinedSaga = [...CmsSaga, ...AuthSaga, ...PatientSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
