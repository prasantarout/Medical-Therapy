import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getApi, postApi, postApiNew, putApi } from '../../utils/ApiRequest';

import {
  getDashboardSuccess,
  getDashboardFailure,
 
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
    let response = yield call(
      postApi,
      'dashboard',
      action.payload,
      header,
    );
    console.log('response: ', response);
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

const watchFunction = [
  (function* () {
    yield takeLatest('Dashboard/getDashboardReq', getDashboardSaga);
  })(),

];




export default watchFunction;
