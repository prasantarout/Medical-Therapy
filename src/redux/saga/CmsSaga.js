import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, postApi, postApiNew, putApi} from '../../utils/ApiRequest';

import {
  getCategorySuccess,
  getCategoryFailure,
  helpAndSupportSuccess,
  helpAndSupportFailure,
  helpSupportTypeSuccess,
  helpSupportTypeFailure,
  contactUsForSupportSuccess,
  contactUsForSupportFailure,
  getUpcomingAssignmentsSuccess,
  getUpcomingAssignmentsFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
} from '../reducer/CmsReducer';
import CustomToast from '../../utils/Toast';

let getItem = state => state.AuthReducer;

export function* getCategorySaga(action) {
  // let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      getApi,
      'category/list',
      // action.payload,
      header,
    );
    // console.log('response: ', response);
    if (response?.data?.status == 200) {
      yield put(getCategorySuccess(response?.data));
    } else {
      yield put(getCategoryFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getCategoryFailure(error?.response));
    // console.log('error: ', error);
  }
}

// Help And Support Type
export function* getHelpAndSupportTypeSaga(action) {
  let item = yield select(getItem);
  // console.log(item);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accessToken: item?.token,
  };

  try {
    let response = yield call(
      getApi,
      'help-support-types',
      // action.payload,
      header,
    );
    // console.log(response);
    if (response?.data?.status == 200) {
      yield put(helpSupportTypeSuccess(response?.data));
    } else {
      yield put(helpSupportTypeFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(helpSupportTypeFailure(error?.response));
    // console.log('error: ', error);
  }
}

// Help And Support
export function* getHelpAndSupportSaga(action) {
  let item = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'application/json',
    accessToken: item?.token,
  };

  try {
    let response = yield call(
      getApi,
      `help-support/${action?.payload?.type_id}`,
      // action.payload,
      header,
    );
    if (response?.data?.status == 200) {
      yield put(helpAndSupportSuccess(response?.data));
    } else {
      yield put(helpAndSupportFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(helpAndSupportFailure(error?.response));
    // console.log('error: ', error);
  }
}

// Contact US for Support

export function* contactUsForSupportSaga(action) {
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'multipart/form-data',
    Authorization: `Bearer ${items?.token}`,
  };
  try {
    let response = yield call(postApiNew, 'contact-us', action.payload, header);

    if (response?.status == '201') {
      yield put(contactUsForSupportSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(contactUsForSupportFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(contactUsForSupportFailure(error?.response));
    // console.log('catch error', error?.response);
    CustomToast(error?.response?.data?.message);
  }
}

// Get Upcoming Assignments Saga
export function* getUpcomingAssignmentsSaga(action) {
  // console.log('getUpcomingAssignmentsSaga started');
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${items?.token}`,
  };

  try {
    let response = yield call(postApi, 'upcoming-assignments', header);
    // console.log('getUpcomingAssignmentsSaga response', response);
    if (response?.status == '200') {
      yield put(getUpcomingAssignmentsSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(getUpcomingAssignmentsFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    // console.log('Catch', error);
    yield put(getUpcomingAssignmentsFailure(error?.response));
  }
}

// Get Upcoming Assignments Saga
export function* updatePasswordSaga(action) {
  // console.log('getUpcomingAssignmentsSaga started', action.payload);
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${items?.token}`,
  };

  try {
    let response = yield call(
      postApiNew,
      'update-password',
      action.payload,
      header,
    );
    // console.log('updatePasswordSaga-response', response);
    if (response?.status == '200') {
      yield put(updatePasswordSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(updatePasswordFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    // console.log('Catch', error?.response?.data?.message);
    yield put(updatePasswordFailure(error?.response?.data?.message));
    CustomToast(error?.response?.data?.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('CMS/getCategoryReq', getCategorySaga);
  })(),
  (function* () {
    yield takeLatest('CMS/helpSupportTypeReq', getHelpAndSupportTypeSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/helpAndSupportReq', getHelpAndSupportSaga);
  })(),
  (function* () {
    yield takeLatest('CMS/contactUsForSupportReq', contactUsForSupportSaga);
  })(),
  (function* () {
    yield takeLatest(
      'CMS/getUpcomingAssignmentsReq',
      getUpcomingAssignmentsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('CMS/updatePasswordReq', updatePasswordSaga);
  })(),
];

export default watchFunction;
