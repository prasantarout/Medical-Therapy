import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getApi, getApiWitPayload, getApiWithParam, postApi, putApi } from '../../utils/ApiRequest';

import {
  getPatientSuccess,
  getPatientFailure,

  getPatientSessionSuccess,
  getPatientSessionFailure,
} from '../reducer/PatientReducer';
import CustomToast from '../../utils/Toast';

let getItem = state => state.AuthReducer;

export function* getPatientSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(
      postApi,
      'my-patients',
      {},
      header,
    );
    console.log('response: ', response);
    if (response?.data?.status == 200) {
      yield put(getPatientSuccess(response?.data));
    } else {
      yield put(getPatientFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getPatientFailure(error?.response));
    console.log('error: ', error);
  }
}

export function* getPatientSessionSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  console.log("getPatientSessionSagaHeader", header, action?.payload)
  try {
    let response = yield call(
      getApiWithParam,
      'sessions',
       action?.payload,
      header,
     
    );
    console.log('response: ', response);
    if (response?.data?.status == 200) {
      yield put(getPatientSessionSuccess(response?.data));
    } else {
      yield put(getPatientSessionFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getPatientSessionFailure(error?.response));
    console.log('error: ', error);
  }
}


const watchFunction = [
  (function* () {
    yield takeLatest('PATIENT/getPatientReq', getPatientSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/getPatientSessionReq', getPatientSessionSaga);
  })(),
];



export default watchFunction;
