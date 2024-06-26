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
  forgotPasswordSuccess,
  forgotPasswordFailure,
  editProfileSuccess,
  editProfileFailure,
  notificationListSuccess,
  notificationListFailure,
  EnableDisableNotificationListSuccess,
  EnableDisableNotificationListFailure,
  changePasswordSuccess,
  changePasswordFailure,
} from '../reducer/AuthReducer';

import {getApi, postApi} from '../../utils/ApiRequest';
import constants from '../../utils/constants';
import CustomToast from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

let getItem = state => state.AuthReducer;

//token
export function* getTokenSaga() {
  try {
    const response = yield call(AsyncStorage.getItem, constants.APP_TOKEN);
    if (response != null) {
      yield put(getTokenSuccess(response));
      // console.log('UserToken', response);
    } else {
      yield put(getTokenSuccess(null));
    }
  } catch (error) {
    yield put(getTokenFailure(error));
  }
}

//Signup
export function* signUpSaga(action) {
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response = yield call(postApi, 'register', action.payload, header);

    if (response?.status == '201') {
      yield put(signUpSucces(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(signUpFailure(response?.data));
      CustomToast(response?.data?.message);
    }
  } catch (error) {
    yield put(signUpFailure(error?.response));
    // console.log(error,">>>>>>>>>????????")
    CustomToast(error?.response?.data?.message);
  }
}

//verifyOtpsaga
export function* verifyOtpsaga(action) {
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: items?.token,
  };

  try {
    let response = yield call(postApi, 'verify-otp', action.payload, header);
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

/////////////////////// signInSaga ///////////////////////
export function* signInSaga(action) {
  let items = yield select(getItem);

  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    // accessToken: items?.token,
  };
  try {
    let response = yield call(postApi, 'login', action.payload, header);
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
/////////////////////// forgotPasswordSaga ///////////////////////
export function* forgotPasswordSaga(action) {
  // let items = yield select(getItem);

  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    // accessToken: items?.token,
  };
  try {
    let response = yield call(
      postApi,
      'forgot-password',
      action.payload,
      header,
    );

    if (response?.status == 200) {
      yield put(forgotPasswordSuccess(response?.data));
      CustomToast(response?.data?.message);
      yield put(getTokenSuccess(response?.data?.token));
      yield call(
        AsyncStorage.setItem,
        constants.APP_TOKEN,
        response?.data?.token,
      );
    } else {
      yield put(forgotPasswordFailure(response?.data));
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error?.response));
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
    accessToken: items?.token,
  };
  try {
    let response = yield call(getApi, 'my-profile', header);
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

/////////////////////// Edit Profile Saga ///////////////////////
export function* editProfilesaga(action) {
  let items = yield select(getItem);
  let header = {
    Accept: 'application/json',
    contenttype: 'multipart/form-data',
    Authorization: `Bearer ${items?.token}`,
  };
  try {
    let response = yield call(postApi, `edit-profile`, action.payload, header);

    if (response?.status == 200) {
      yield put(editProfileSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(editProfileFailure(response?.data));
    }
  } catch (error) {
    // CustomToast(error?.response);
    yield put(editProfileFailure(error?.response));
    // CustomToast(error?.response?.data?.message);
  }
}

export function* notificationListSaga(action) {
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: items?.token,
  };
  try {
    let response = yield call(getApi, `notifications`, header);
    // console.log(response,">??????????>>>")

    if (response?.status == 200) {
      yield put(notificationListSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(notificationListFailure(response?.data));
    }
  } catch (error) {
    // CustomToast(error?.response);
    yield put(notificationListFailure(error?.response));
    // CustomToast(error?.response?.data?.message);
  }
}

export function* EnableDisableNotificationSaga(action) {
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: items?.token,
  };
  try {
    let response = yield call(
      getApi,
      `enable-disable-notification/${action.payload}`,
      header,
    );
    // console.log(response,">??????????>>>")

    if (response?.status == 200) {
      yield put(EnableDisableNotificationListSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(EnableDisableNotificationListFailure(response?.data));
    }
  } catch (error) {
    // CustomToast(error?.response);
    yield put(EnableDisableNotificationListFailure(error?.response));
    // CustomToast(error?.response?.data?.message);
  }
}

export function* changePasswordSaga(action) {
  let items = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: items?.token,
  };
  try {
    let response = yield call(
      postApi,
      `update-password`,
      action.payload,
      header,
    );
    // console.log(response,">??????????>>>")

    if (response?.status == 200) {
      yield put(changePasswordSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(changePasswordFailure(response?.data));
    }
  } catch (error) {
    // CustomToast(error?.response);
    yield put(changePasswordFailure(error?.response));
    // CustomToast(error?.response?.data?.message);
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
    yield takeLatest('Auth/forgotPasswordRequest', forgotPasswordSaga);
  })(),
  (function* () {
    yield takeLatest('Auth/ProfileRequest', Profilesaga);
  })(),
  (function* () {
    yield takeLatest('Auth/editProfileRequest', editProfilesaga);
  })(),
  (function* () {
    yield takeLatest('Auth/notificationListRequest', notificationListSaga);
  })(),
  (function* () {
    yield takeLatest(
      'Auth/EnableDisableNotificationListRequest',
      EnableDisableNotificationSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'Auth/changePasswordRequest',
      changePasswordSaga,
    );
  })(),
];

export default watchFunction;
