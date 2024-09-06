import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, getApiWithUrlParam, postApi} from '../../utils/ApiRequest';

import {
  getDashboardSuccess,
  getDashboardFailure,
  patientEnrolmentSuccess,
  patientEnrolmentFailure,
  EvaluationEnrolmentSuccess,
  EvaluationEnrolmentFailure,
  getInactivePatientSuccess,
  getInactivePatientFailure,
  getActivePatientFailure,
  getActivePatientSuccess,
  getCompletedEvaulationFailure,
  getCompletedEvaulationSuccess,
  getPendingEvaulationSuccess,
  getPendingEvaulationFailure,
  getActivePatientSessionSuccess,
  getActivePatientSessionFailure,
  getEvaluationReviewSuccess,
  getEvaluationReviewFailure,
} from '../reducer/DashboardReducer';

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
     console.log(response.data,">>>>>>?????Sss")
    if (response?.data?.status == 200) {
      yield put(getDashboardSuccess(response?.data));
    } else {
      yield put(getDashboardFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getDashboardFailure(error?.response));
    // console.log('error: ', error);
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
    // console.log(response.data, '>>>>>>?????Sss>>>>>>');
    if (response?.data?.status == 200) {
      yield put(patientEnrolmentSuccess(response?.data));
    } else {
      yield put(patientEnrolmentFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(patientEnrolmentFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getActivePatientSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(getApi, 'dashboard-active-patients', header);
    if (response?.data?.status == 200) {
      yield put(getActivePatientSuccess(response?.data));
    } else {
      yield put(getActivePatientFailure(response?.data));
    }
  } catch (error) {
    yield put(getActivePatientFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getActivePatientSessionSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: item?.token,
  };

  try {
    let response = yield call(
      postApi,
      'dashboard-active-patients-session',
      action?.payload,
      header,
    );
    if (response?.data?.status == 200) {
      yield put(getActivePatientSessionSuccess(response?.data));
    } else {
      yield put(getActivePatientSessionSuccess(response?.data));
    }
  } catch (error) {
    yield put(getActivePatientSessionFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getInactivePatientSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(getApi, 'dashboard-inactive-patients', header);
    if (response?.data?.status == 200) {
      yield put(getInactivePatientSuccess(response?.data));
    } else {
      yield put(getInactivePatientFailure(response?.data));
    }
  } catch (error) {
    yield put(getInactivePatientFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getPendingEvaulationSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(getApi, 'dashboard-pending-evaluations', header);
    if (response?.data?.status == 200) {
      yield put(getPendingEvaulationSuccess(response?.data));
    } else {
      yield put(getPendingEvaulationFailure(response?.data));
    }
  } catch (error) {
    yield put(getPendingEvaulationFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getCompletedEvaulationSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(
      getApi,
      'dashboard-completed-evaluations',
      header,
    );
    if (response?.data?.status == 200) {
      yield put(getCompletedEvaulationSuccess(response?.data));
    } else {
      yield put(getCompletedEvaulationFailure(response?.data));
    }
  } catch (error) {
    yield put(getCompletedEvaulationFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* EvaluationEnrolmentSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  // console.log(header, '>>>>>>????');

  try {
    let response = yield call(getApi, 'graph-data', header);
    // console.log(response.data, '>>>>>>?????Sss>>>>>> evaluation');
    if (response?.data?.status == 200) {
      yield put(EvaluationEnrolmentSuccess(response?.data));
    } else {
      yield put(EvaluationEnrolmentFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(EvaluationEnrolmentFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getEvaluationReviewSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(
      getApiWithUrlParam,
      'evaluation-list',
      header,
      action?.payload?.param,
    );
    if (response?.data?.status == 200) {
      yield put(getEvaluationReviewSuccess(response?.data?.data));
    } else {
      yield put(getEvaluationReviewFailure(response?.data));
    }
  } catch (error) {
    yield put(getEvaluationReviewFailure(error?.response));
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Dashboard/getDashboardReq', getDashboardSaga);
  })(),
  (function* () {
    yield takeLatest('Dashboard/getInactivePatientReq', getInactivePatientSaga);
  })(),
  (function* () {
    yield takeLatest('Dashboard/getActivePatientReq', getActivePatientSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Dashboard/getActivePatientSessionReq',
      getActivePatientSessionSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Dashboard/getPendingEvaulationReq',
      getPendingEvaulationSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Dashboard/getCompletedEvaulationReq',
      getCompletedEvaulationSaga,
    );
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
  (function* () {
    yield takeLatest(
      'Dashboard/getEvaluationReviewReq',
      getEvaluationReviewSaga,
    );
  })(),
];

export default watchFunction;
