import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getTokenSuccess,
  getTokenFailure,
  signUpSucces,
  signUpFailure,
  signInSuccess,
  signInFailure,
  verifyOtpSuccess,
  verifyOtpFailure,
  logoutSuccess,
  logoutFailure,
  ProfileSuccess,
  ProfileFailure,
} from '../reducer/AuthReducer';

import {getApi, postApi, putApi} from '../../utils/ApiRequest';
import Toast from '../../utils/Toast';
import constants from '../../utils/constants';
import {Alert} from 'react-native';
import {useEffect} from 'react';
import CustomToast from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

let getItem = state => state.AuthReducer;

//token
export function* getTokenSaga() {
  try {
    const response = yield call(AsyncStorage.getItem, constants.APP_TOKEN);
    if (response != null) {
      yield put(getTokenSuccess(response));
      console.log('UserToken', response);
    } else {
      yield put(getTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

//Signup
export function* verifyOtpsaga(action) {
  let header = {
    accept: 'application/json',
    contenttype: 'multipart/form-data',
  };
  try {
    let response = yield call(
      postApi,
      'auth/verify-otp',
      action.payload,
      header,
    );
    console.log(response, 'verify-otp-Response');
    if (response?.status == '200') {
      yield put(verifyOtpSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(verifyOtpFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    console.log('Catch', error);
    yield put(verifyOtpFailure(error?.response));
  }
}
//Signup
export function* signUpSaga(action) {
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
  };
  try {
    let response = yield call(postApi, 'auth/signup', action.payload, header);
    console.log(response, 'signupResponse');
    if (response?.status == '200') {
      yield put(signUpSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(signUpFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    console.log('Catch', error);
    yield put(signUpFailure(error?.response));
  }
}

/////////////////////// signInSaga ///////////////////////
export function* signInSaga(action) {
  let items = yield select(getItem);

  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    // accessToken: items?.token,
  };
  try {
    let response = yield call(postApi, 'auth/signin', action.payload, header);
    console.log('response---->', response);
    if (response?.status == 200) {
      yield put(signInSuccess(response?.data));
      CustomToast(response?.data?.message);
      yield put(getTokenSuccess(response?.data?.token));
      yield call(
        AsyncStorage.setItem,
        constants.APP_TOKEN,
        response?.data?.token,
      );
    } else {
      yield put(signInFailure(response?.data));
    }
  } catch (error) {
    // CustomToast(error?.response);
    yield put(signInFailure(error?.response));
    CustomToast(error?.response?.data?.message);
  }
}

///////////////////// logout /////////////////////////
export function* logoutsaga(action) {
  try {
    yield call(AsyncStorage.removeItem, constants.APP_TOKEN);
    yield put(getTokenSuccess(null));
    yield put(logoutSuccess('Logout Successfully'));
    CustomToast('Logout successfully');
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

/////////////////////// Profile ///////////////////////
export function* Profilesaga(action) {
  let items = yield select(getItem);

  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    token: items?.token,
  };
  try {
    let response = yield call(getApi, 'student/profile', header);
    console.log('response---->', response);
    if (response?.status == 200) {
      yield put(ProfileSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(ProfileFailure(response?.data));
    }
  } catch (error) {
    // CustomToast(error?.response);
    yield put(ProfileFailure(error?.response));
    CustomToast(error?.response?.data?.message);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Auth/getTokenRequest', getTokenSaga);
  })(),

  (function* () {
    yield takeLatest('Auth/signUpReq', signUpSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/signInRequest', signInSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/verifyOtpRequest', verifyOtpsaga);
  })(),
  (function* () {
    yield takeLatest('Auth/logoutRequest', logoutsaga);
  })(),
  (function* () {
    yield takeLatest('Auth/ProfileRequest', Profilesaga);
  })(),
];

export default watchFunction;
