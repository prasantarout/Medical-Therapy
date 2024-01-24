import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getApi, postApi, putApi } from '../../utils/ApiRequest';

import {
  getCategorySuccess,
  getCategoryFailure
} from '../reducer/CmsReducer';

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
    console.log("response: ", response)
    if (response?.data?.status == 200) {
      yield put(getCategorySuccess(response?.data));
    } else {
      yield put(getCategoryFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getCategoryFailure(error?.response));
    console.log("error: ", error)
  }
}


const watchFunction = [
  (function* () {
    yield takeLatest('CMS/getCategoryReq', getCategorySaga);
  })(),

];

export default watchFunction;
