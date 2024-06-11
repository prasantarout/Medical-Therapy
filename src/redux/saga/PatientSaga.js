import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getApi,
  getApiWithParam,
  postApi,
  postApiNew,
} from '../../utils/ApiRequest';

import {
  getPatientSuccess,
  getPatientFailure,
  getPatientSessionSuccess,
  getPatientSessionFailure,
  storeServiceEnrolmentSuccess,
  storeServiceEnrolmentFailure,
  getListOfTherapiesSuccess,
  getListOfTherapiesFailure,
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
    let response = yield call(postApi, 'my-patients', {}, header);
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
  try {
    let response = yield call(
      getApiWithParam,
      'sessions',
      header,
      action?.payload,
    );
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

export function* storeEnrolmentSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };
  // console.log(header,">>>>")
  try {
    let response = yield call(
      postApiNew,
      'store-service-enrolment',
      action?.payload,
      header,
    );
    if (response?.data?.status == 200) {
      yield put(storeServiceEnrolmentSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(storeServiceEnrolmentFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(storeServiceEnrolmentFailure(error?.response));
    CustomToast(error?.response?.data?.message);
  }
}

export function* getListOfTherapiesSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      getApi,
      'services',
      // action?.payload,
      header,
    );
    if (response?.data?.status == 200) {
      yield put(getListOfTherapiesSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getListOfTherapiesFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getListOfTherapiesFailure(error?.response));
    CustomToast(error?.response?.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('PATIENT/getPatientReq', getPatientSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/getPatientSessionReq', getPatientSessionSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/storeServiceEnrolmentReq', storeEnrolmentSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/getListOfTherapiesReq', getListOfTherapiesSaga);
  })(),
];

export default watchFunction;
