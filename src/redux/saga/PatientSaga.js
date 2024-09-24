import {call, put, select, takeLatest} from 'redux-saga/effects';
import {
  getApi,
  getApiWithParam,
  getApiWithUrlParam,
  postApi,
  postApiNew,
} from '../../utils/ApiRequest';

import {
  getMyPatientSuccess,
  getMyPatientFailure,
  getMyPatientSessionSuccess,
  getMyPatientSessionFailure,
  getMyPatientSessionDetailsSuccess,
  getMyPatientSessionDetailsFailure,
  getPatientSuccess,
  getPatientFailure,
  getPatientSessionSuccess,
  getPatientSessionFailure,
  storeServiceEnrolmentSuccess,
  storeServiceEnrolmentFailure,
  getListOfTherapiesSuccess,
  getListOfTherapiesFailure,
  getPatientSessionDetailsFailure,
  getPatientSessionDetailsSuccess,
  getListOfSatisfactionSuccess,
  getListOfSatisfactionFailure,
  satisfactionQuestionListSuccess,
  satisfactionQuestionListFailure,
  clearQuestionListSuccess,
  submitEvaluationSuccess,
  submitEvaluationFailure,
  patientDetailsSuccess,
  patientDetailsFailure,
  updatePatientSuccess,
  updatePatientFailure,
  deviceListSuccess,
  deviceListFailure,
  cityListSuccess,
  cityListFailure,
} from '../reducer/PatientReducer';
import CustomToast from '../../utils/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constants from '../../utils/constants';
import { updatePasswordFailure } from '../reducer/CmsReducer';

let getItem = state => state.AuthReducer;

export function* getMyPatientSaga(action) {


  const { currentPage,filters } = action.payload ?action.payload: {};
  // console.log(filters,">>>>>>>actions")
  const token = yield call(AsyncStorage.getItem, constants.APP_TOKEN);
  // console.log(token,">>>>>>edd")
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${token}`,
  };

  try {
    // const apiUrl = `my-patients?page=${action.payload}`;
    let response = yield call(
      postApi,
      `my-patients?page=${action?.payload?.page}`,
      action?.payload?.obj,
      header,
    );

    // console.log(response,">>>>>>response")
   
    if (response?.data?.status == 200) {
      yield put(getMyPatientSuccess(response?.data));
    } else {
      yield put(getMyPatientFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getMyPatientFailure(error?.response));
    console.log('error: ', error);
  }
}

export function* getMyPatientSessionSaga(action) {
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
    // console.log(response,">>>>>>????>>edd")
    if (response?.data?.status == 200) {
      yield put(getMyPatientSessionSuccess(response?.data));
    } else {
      yield put(getMyPatientSessionFailure(response?.data));
    }
  } catch (error) {
    yield put(getMyPatientSessionFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* getMyPatientSessionDetailsSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      postApi,
      'dashboard-active-patients-session-details',
      action?.payload,
      header,
    );

    // console.log('response?.data?.data', response);
    const formattedData = {
      sessions: {
        clinical_metrics: response?.data?.data?.sessions?.clinical_metrics
          ? JSON.parse(response?.data?.data?.sessions?.clinical_metrics)
          : {},
        created_at: response?.data?.data?.sessions?.created_at || '',
        deleted_at: response?.data?.data?.sessions?.deleted_at || '',
        description: response?.data?.data?.sessions?.description || '',
        device: response?.data?.data?.sessions?.device
          ? JSON.parse(response?.data?.data?.sessions?.device)
          : '',
        device_id: response?.data?.data?.sessions?.device_id
          ? JSON.parse(response?.data?.data?.sessions?.device_id)
          : '',
        device_mode: response?.data?.data?.sessions?.device_mode || '',
        device_serialNo: response?.data?.data?.sessions?.device_serialNo || '',
        device_type: response?.data?.data?.sessions?.device_type || '',
        device_type_desc:
          response?.data?.data?.sessions?.device_type_desc || '',
        id: response?.data?.data?.sessions?.id || '',
        mask_off: response?.data?.data?.sessions?.mask_off
          ? JSON.parse(response?.data?.data?.sessions?.mask_off)
          : '',
        mask_on: response?.data?.data?.sessions?.mask_on
          ? JSON.parse(response?.data?.data?.sessions?.mask_on)
          : '',
        patientInterface: response?.data?.data?.sessions?.patientInterface
          ? JSON.parse(response?.data?.data?.sessions?.patientInterface)
          : '',
        patient_data: response?.data?.data?.sessions?.patient_data
          ? JSON.parse(response?.data?.data?.sessions?.patient_data)
          : '',
        patient_id: response?.data?.data?.sessions?.patient_id || '',
        receipt_time: response?.data?.data?.sessions?.receipt_time || '',
        respEvents: response?.data?.data?.sessions?.respEvents
          ? JSON.parse(response?.data?.data?.sessions?.respEvents)
          : '',
        session_data: response?.data?.data?.sessions?.session_data
          ? JSON.parse(response?.data?.data?.sessions?.session_data)
          : '',
        session_date: response?.data?.data?.sessions?.session_date || '',
        set: response?.data?.data?.sessions?.set
          ? JSON.parse(response?.data?.data?.sessions?.set)
          : '',
        spontCycledBreaths:
          response?.data?.data?.sessions?.spontCycledBreaths || '',
        spontTriggBreaths:
          response?.data?.data?.sessions?.spontTriggBreaths || '',
        total_usage_hours_on_device:
          response?.data?.data?.sessions?.total_usage_hours_on_device || '',
        updated_at: response?.data?.data?.sessions?.updated_at || '',
        usage: response?.data?.data?.sessions?.usage
          ? JSON.parse(response?.data?.data?.sessions?.usage)
          : '',
        usage_duration: response?.data?.data?.sessions?.usage_duration || '',
        therapist_name: response?.data?.data?.sessions?.therapist_name || '',
      },
      patient: {
        clinicalUser:
          response?.data?.data?.sessions?.patient?.clinicalUser || '',
        device_serial_no:
          response?.data?.data?.sessions?.patient?.device_serial_no || '',
        device_type: response?.data?.data?.sessions?.patient?.device_type || '',
        device_type_desc:
          response?.data?.data?.sessions?.patient?.device_type_desc || '',
        dob: response?.data?.data?.sessions?.patient?.dob || '',
        first_name: response?.data?.data?.sessions?.patient?.first_name || '',
        full_name: response?.data?.data?.sessions?.patient?.full_name || '',
        id: response?.data?.data?.sessions?.patient?.id || '',
        last_name: response?.data?.data?.sessions?.patient?.last_name || '',
        location: response?.data?.data?.sessions?.patient?.location || '',
        locationID: response?.data?.data?.sessions?.patient?.locationID || '',
        mask_size: response?.data?.data?.sessions?.patient?.mask_size || '',
        mask_type: response?.data?.data?.sessions?.patient?.mask_type || '',
        module_serial_no:
          response?.data?.data?.sessions?.patient?.module_serial_no || '',
        org_id: response?.data?.data?.sessions?.patient?.org_id || '',
        org_name: response?.data?.data?.sessions?.patient?.org_name || '',
        patient_id: response?.data?.data?.sessions?.patient?.patient_id || '',
        payorId: response?.data?.data?.sessions?.patient?.payorId || '',
        prescription: response?.data?.data?.sessions?.patient?.prescription
          ? JSON.parse(response?.data?.data?.sessions?.patient?.prescription)
          : '',
        profile_photo_url:
          response?.data?.data?.sessions?.patient?.profile_photo_url || '',
        setupDate: response?.data?.data?.sessions?.patient?.setupDate || '',
        status: response?.data?.data?.sessions?.patient?.status || '',
        therapist_id:
          response?.data?.data?.sessions?.patient?.therapist_id || '',
        thresholds_leak:
          response?.data?.data?.sessions?.patient?.thresholds_leak || '',
        updated_at: response?.data?.data?.sessions?.patient?.updated_at || '',
      },
    };

    if (response?.data?.status == 200) {
      yield put(getMyPatientSessionDetailsSuccess(formattedData));
    } else {
      yield put(getMyPatientSessionDetailsFailure(formattedData));
    }
  } catch (error) {
    yield put(getMyPatientSessionDetailsFailure(error?.response));
    console.log('error: ', error);
  }
}

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
    // console.log('error: ', error);
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

export function* getPatientSessionDetailsSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      postApi,
      'dashboard-active-patients-session-details',
      action?.payload,
      header,
    );

    // console.log('response?.data?.data', response?.data?.data);
    const formattedData = {
      sessions: {
        clinical_metrics: response?.data?.data?.sessions?.clinical_metrics
          ? JSON.parse(response?.data?.data?.sessions?.clinical_metrics)
          : {},
        created_at: response?.data?.data?.sessions?.created_at || '',
        deleted_at: response?.data?.data?.sessions?.deleted_at || '',
        description: response?.data?.data?.sessions?.description || '',
        device: response?.data?.data?.sessions?.device
          ? JSON.parse(response?.data?.data?.sessions?.device)
          : '',
        device_id: response?.data?.data?.sessions?.device_id
          ? JSON.parse(response?.data?.data?.sessions?.device_id)
          : '',
        device_mode: response?.data?.data?.sessions?.device_mode || '',
        device_serialNo: response?.data?.data?.sessions?.device_serialNo || '',
        device_type: response?.data?.data?.sessions?.device_type || '',
        device_type_desc:
          response?.data?.data?.sessions?.device_type_desc || '',
        id: response?.data?.data?.sessions?.id || '',
        mask_off: response?.data?.data?.sessions?.mask_off
          ? JSON.parse(response?.data?.data?.sessions?.mask_off)
          : '',
        mask_on: response?.data?.data?.sessions?.mask_on
          ? JSON.parse(response?.data?.data?.sessions?.mask_on)
          : '',
        patientInterface: response?.data?.data?.sessions?.patientInterface
          ? JSON.parse(response?.data?.data?.sessions?.patientInterface)
          : '',
        patient_data: response?.data?.data?.sessions?.patient_data
          ? JSON.parse(response?.data?.data?.sessions?.patient_data)
          : '',
        patient_id: response?.data?.data?.sessions?.patient_id || '',
        receipt_time: response?.data?.data?.sessions?.receipt_time || '',
        respEvents: response?.data?.data?.sessions?.respEvents
          ? JSON.parse(response?.data?.data?.sessions?.respEvents)
          : '',
        session_data: response?.data?.data?.sessions?.session_data
          ? JSON.parse(response?.data?.data?.sessions?.session_data)
          : '',
        session_date: response?.data?.data?.sessions?.session_date || '',
        set: response?.data?.data?.sessions?.set
          ? JSON.parse(response?.data?.data?.sessions?.set)
          : '',
        spontCycledBreaths:
          response?.data?.data?.sessions?.spontCycledBreaths || '',
        spontTriggBreaths:
          response?.data?.data?.sessions?.spontTriggBreaths || '',
        total_usage_hours_on_device:
          response?.data?.data?.sessions?.total_usage_hours_on_device || '',
        updated_at: response?.data?.data?.sessions?.updated_at || '',
        usage: response?.data?.data?.sessions?.usage
          ? JSON.parse(response?.data?.data?.sessions?.usage)
          : '',
        usage_duration: response?.data?.data?.sessions?.usage_duration || '',
        therapist_name: response?.data?.data?.sessions?.therapist_name || '',
      },
      patient: {
        clinicalUser:
          response?.data?.data?.sessions?.patient?.clinicalUser || '',
        device_serial_no:
          response?.data?.data?.sessions?.patient?.device_serial_no || '',
        device_type: response?.data?.data?.sessions?.patient?.device_type || '',
        device_type_desc:
          response?.data?.data?.sessions?.patient?.device_type_desc || '',
        dob: response?.data?.data?.sessions?.patient?.dob || '',
        first_name: response?.data?.data?.sessions?.patient?.first_name || '',
        full_name: response?.data?.data?.sessions?.patient?.full_name || '',
        id: response?.data?.data?.sessions?.patient?.id || '',
        last_name: response?.data?.data?.sessions?.patient?.last_name || '',
        location: response?.data?.data?.sessions?.patient?.location || '',
        locationID: response?.data?.data?.sessions?.patient?.locationID || '',
        mask_size: response?.data?.data?.sessions?.patient?.mask_size || '',
        mask_type: response?.data?.data?.sessions?.patient?.mask_type || '',
        module_serial_no:
          response?.data?.data?.sessions?.patient?.module_serial_no || '',
        org_id: response?.data?.data?.sessions?.patient?.org_id || '',
        org_name: response?.data?.data?.sessions?.patient?.org_name || '',
        patient_id: response?.data?.data?.sessions?.patient?.patient_id || '',
        payorId: response?.data?.data?.sessions?.patient?.payorId || '',
        prescription: response?.data?.data?.sessions?.patient?.prescription
          ? JSON.parse(response?.data?.data?.sessions?.patient?.prescription)
          : '',
        profile_photo_url:
          response?.data?.data?.sessions?.patient?.profile_photo_url || '',
        setupDate: response?.data?.data?.sessions?.patient?.setupDate || '',
        status: response?.data?.data?.sessions?.patient?.status || '',
        therapist_id:
          response?.data?.data?.sessions?.patient?.therapist_id || '',
        thresholds_leak:
          response?.data?.data?.sessions?.patient?.thresholds_leak || '',
        updated_at: response?.data?.data?.sessions?.patient?.updated_at || '',
      },
    };

    if (response?.data?.status == 200) {
      yield put(getPatientSessionDetailsSuccess(formattedData));
    } else {
      yield put(getPatientSessionDetailsFailure(formattedData));
    }
  } catch (error) {
    yield put(getPatientSessionDetailsFailure(error?.response));
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

export function* getListOfSatisfactionSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      getApi,
      'evaluation-question-type',
      // action?.payload,
      header,
    );
    if (response?.data?.status == 200) {
      yield put(getListOfSatisfactionSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(getListOfSatisfactionFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(getListOfSatisfactionFailure(error?.response));
    CustomToast(error?.response?.message);
  }
}

export function* satisfactionQuestionSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      postApi,
      'evaluation-question-list',
      action?.payload,
      header,
    );
    // console.log(response,">>>>>>??>>>>")
    if (response?.data?.status == 200) {
      yield put(satisfactionQuestionListSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(satisfactionQuestionListFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(satisfactionQuestionListFailure(error?.response));
    CustomToast(error?.response?.message);
  }
}

export function* getEvaluationFormSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(
      postApi,
      'submit-evaluation',
      action.payload,
      header,
    );
    // console.log(response,">>>>>>>>>?response")
    if (response?.data?.status == 200) {
      yield put(submitEvaluationSuccess(response?.data));
      CustomToast(response.data.message);
    } else {
      yield put(submitEvaluationFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(submitEvaluationFailure(error?.response));
    // console.log('error: ', error);
  }
}

export function* patientDetailsSaga(action) {
  const token = yield call(AsyncStorage.getItem, constants.APP_TOKEN);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${token}`,
  };

  try {
    let response = yield call(
      getApiWithParam,
      `patient-details/${action.payload}`,
      header,
      null,
     
    );
    // console.log(response,">>>>>>>>>?response")
    if (response?.data?.status == 200) {
      yield put(patientDetailsSuccess(response?.data));
      CustomToast(response?.data?.message);
    } else {
      yield put(patientDetailsFailure(response?.data));
      
    }
  } catch (error) {
    yield put(patientDetailsFailure(error?.response));
    console.log('error: ', error);
  }
}


export function* updatePatientSaga(action) {
  console.log(action.payload, "action")
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    Authorization: `Bearer ${item?.token}`,
  };

  try {
    let response = yield call(
      postApi,
      `update-patient-data/${action.payload.patientId}`,
      { ...action.payload },
      header,
    );
    // console.log(response,">>>>>>>>>?response")
    if (response?.data?.status == true) {
      yield put(updatePatientSuccess(response?.data));
      console.log(response,">>>>>>>>>?response")
      CustomToast(response.data.message);
    } else {
      yield put(updatePatientFailure(response?.data));
      Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(updatePatientFailure(error?.response));
    console.log('error: ', error);
  }
}



export function* DeviceListSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      getApi,
      'device-types',
      // action?.payload,
      header,
    );
    if (response?.data?.status == "success") {
      yield put(deviceListSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(deviceListFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(deviceListFailure(error?.response));
    CustomToast(error?.response?.message);
  }
}

export function* CityListSaga(action) {
  let item = yield select(getItem);
  let header = {
    accept: 'application/json',
    contenttype: 'application/json',
    accessToken: `Bearer ${item?.token}`,
  };
  try {
    let response = yield call(
      getApi,
      'city-list',
      // action?.payload,
      header,
    );
    if (response?.data?.status == "success") {
      yield put(cityListSuccess(response?.data));
      // CustomToast(response?.data?.message);
    } else {
      yield put(cityListFailure(response?.data));
      // Toast(response?.data?.message);
    }
  } catch (error) {
    yield put(cityListFailure(error?.response));
    CustomToast(error?.response?.message);
  }
}


export function* clearSatisfactionSaga(action) {
  try {
    yield put(clearQuestionListSuccess(action.payload));
  } catch (error) {
    // console.log('clearProductDetailsSaga>>', error);
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('PATIENT/getMyPatientReq', getMyPatientSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/getMyPatientSessionReq', getMyPatientSessionSaga);
  })(),
  (function* () {
    yield takeLatest(
      'PATIENT/getMyPatientSessionDetailsReq',
      getMyPatientSessionDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('PATIENT/getPatientReq', getPatientSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/getPatientSessionReq', getPatientSessionSaga);
  })(),
  (function* () {
    yield takeLatest(
      'PATIENT/getPatientSessionDetailsReq',
      getPatientSessionDetailsSaga,
    );
  })(),
  (function* () {
    yield takeLatest('PATIENT/storeServiceEnrolmentReq', storeEnrolmentSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/getListOfTherapiesReq', getListOfTherapiesSaga);
  })(),
  (function* () {
    yield takeLatest(
      'PATIENT/getListOfSatisfactionReq',
      getListOfSatisfactionSaga,
    );
  })(),
  (function* () {
    yield takeLatest(
      'PATIENT/satisfactionQuestionListReq',
      satisfactionQuestionSaga,
    );
  })(),
  (function* () {
    yield takeLatest('PATIENT/clearQuestionListReq', clearSatisfactionSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/submitEvaluationReq', getEvaluationFormSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/patientDetailsReq', patientDetailsSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/updatePatientReq', updatePatientSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/deviceListReq', DeviceListSaga);
  })(),
  (function* () {
    yield takeLatest('PATIENT/cityListReq', CityListSaga);
  })(),
];

export default watchFunction;
