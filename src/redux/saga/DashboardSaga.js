import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, postApi, postApiNew, putApi} from '../../utils/ApiRequest';

import {
  getDashboardSuccess,
  getDashboardFailure,
  patientEnrolmentSuccess,
  patientEnrolmentFailure,
  EvaluationEnrolmentSuccess,
  EvaluationEnrolmentFailure,
} from '../reducer/DashboardReducer';
import CustomToast from '../../utils/Toast';

let getItem = state => state.AuthReducer;

export function* getDashboardSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: item?.token,
  };

  try {
    let response = yield call(postApi, 'dashboard', action.payload, header);
    //  console.log(response.data,">>>>>>?????Sss")
    if (response?.data?.status == 200) {
      yield put(getDashboardSuccess(response?.data));
    } else {
      yield put(getDashboardFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getDashboardFailure(error?.response));
    console.log('error: ', error);
  }
}

export function* patientEnrolmentSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(getApi, 'barchat-data', header);
    console.log(response.data, '>>>>>>?????Sss>>>>>>');
    if (response?.data?.status == 200) {
      yield put(patientEnrolmentSuccess(response?.data));
    } else {
      yield put(patientEnrolmentFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(patientEnrolmentFailure(error?.response));
    console.log('error: ', error);
  }
}

export function* EvaluationEnrolmentSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  console.log(header, '>>>>>>????');

  try {
    let response = yield call(getApi, 'graph-data', header);
    console.log(response.data, '>>>>>>?????Sss>>>>>> evaluation');
    if (response?.data?.status == 200) {
      yield put(EvaluationEnrolmentSuccess(response?.data));
    } else {
      yield put(EvaluationEnrolmentFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(EvaluationEnrolmentFailure(error?.response));
    console.log('error: ', error);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Dashboard/getDashboardReq', getDashboardSaga);
  })(),
  (function* () {
    yield takeLatest('Dashboard/patientEnrolmentReq', patientEnrolmentSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Dashboard/EvaluationEnrolmentReq',
      EvaluationEnrolmentSaga,
    );
  })(),
];

export default watchFunction;
