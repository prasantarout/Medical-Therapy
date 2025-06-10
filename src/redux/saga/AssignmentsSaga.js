import {call, put, select, takeLatest} from 'redux-saga/effects';
import {getApi, postApi, putApi} from '../../utils/ApiRequest';

// import {
//   getUpcomingAssignmentsSuccess,
//   getUpcomingAssignmentsFailure,
// } from '../reducer/AssignmentsReducer';
import CustomToast from '../../utils/Toast';

// let getItem = state => state.AuthReducer;

// export function* getUpcomingAssignmentsSaga(action) {
//   // let item = yield select(getItem);
//   console.log("ThisIsUpcomingAssignmentsSaga")
//   let header = {
//     Accept: 'application/json',
//     contenttype: 'application/json',
//     Authorization: `Bearer ${items?.token}`,
//   };

//   try {
//     let response = yield call(
//       postApi,
//       '',
//       // action.payload,
//       header,
//     );
//     console.log('responseee: ', response);
//     if (response?.data?.status == 200) {
//       yield put(getUpcomingAssignmentsSuccess(response?.data));
//     } else {
//       yield put(getUpcomingAssignmentsFailure(response?.data));
//       // Toast(response?.data?.message);
//     }
//   } catch (error) {
//     yield put(getUpcomingAssignmentsFailure(error?.response));
//     console.log('error: ', error);
//   }
// }


const watchFunction = [
  (function* () {
    // yield takeLatest('CMS/getUpcomingAssignmentsReq', getUpcomingAssignmentsSaga);
  })(),
 
];

export default watchFunction;
