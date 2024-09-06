import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getPatientResponse: {},
  getPatientSessionResponse: {},
  getPatientSessionDetailsResponse: {},
  getMyPatientResponse: {},
  getMyPatientSessionResponse: {},
  getMyPatientSessionDetailsResponse: {},
  storeServiceEnrolmentRes: {},
  getListOfTherapiesRes: {},
  getListOfSatisfactionRes: {},
  questionListRes: {},
  submitEvaluationRes: {},
  patientDetailsRes: {},
};

const PATIENTSlice = createSlice({
  name: 'PATIENT',
  initialState,
  reducers: {
    //getPatientReq
    getPatientReq(state, action) {
      state.status = action.type;
    },
    getPatientSuccess(state, action) {
      state.getPatientResponse = action?.payload;
      state.status = action.type;
    },
    getPatientFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session
    getPatientSessionReq(state, action) {
      state.status = action.type;
    },
    getPatientSessionSuccess(state, action) {
      state.getPatientSessionResponse = action?.payload;
      state.status = action.type;
    },
    getPatientSessionFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session Details
    getPatientSessionDetailsReq(state, action) {
      state.status = action.type;
    },
    getPatientSessionDetailsSuccess(state, action) {
      state.getPatientSessionDetailsResponse = action?.payload;
      state.status = action.type;
    },
    getPatientSessionDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //My Patient
    getMyPatientReq(state, action) {
      state.status = action.type;
    },
    getMyPatientSuccess(state, action) {
      state.getMyPatientResponse = action?.payload;
      state.status = action.type;
    },
    getMyPatientFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // My Patient Session
    getMyPatientSessionReq(state, action) {
      state.status = action.type;
    },
    getMyPatientSessionSuccess(state, action) {
      state.getMyPatientSessionResponse = action?.payload;
      state.status = action.type;
    },
    getMyPatientSessionFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // My Patient Session Details
    getMyPatientSessionDetailsReq(state, action) {
      state.status = action.type;
    },
    getMyPatientSessionDetailsSuccess(state, action) {
      state.getMyPatientSessionDetailsResponse = action?.payload;
      state.status = action.type;
    },
    getMyPatientSessionDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session
    storeServiceEnrolmentReq(state, action) {
      state.status = action.type;
    },
    storeServiceEnrolmentSuccess(state, action) {
      state.storeServiceEnrolmentRes = action?.payload;
      state.status = action.type;
    },
    storeServiceEnrolmentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    // Patient Session
    getListOfTherapiesReq(state, action) {
      state.status = action.type;
    },
    getListOfTherapiesSuccess(state, action) {
      state.getListOfTherapiesRes = action?.payload;
      state.status = action.type;
    },
    getListOfTherapiesFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Satisfaction Session
    getListOfSatisfactionReq(state, action) {
      state.status = action.type;
    },
    getListOfSatisfactionSuccess(state, action) {
      state.getListOfSatisfactionRes = action?.payload;
      state.status = action.type;
    },
    getListOfSatisfactionFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Satisfaction Session
    satisfactionQuestionListReq(state, action) {
      state.status = action.type;
    },
    satisfactionQuestionListSuccess(state, action) {
      state.questionListRes = action?.payload;
      state.status = action.type;
    },
    satisfactionQuestionListFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Submit evaluation
    submitEvaluationReq(state, action) {
      state.status = action.type;
    },
    submitEvaluationSuccess(state, action) {
      state.submitEvaluationRes = action?.payload;
      state.status = action.type;
    },
    submitEvaluationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //Submit evaluation
    patientDetailsReq(state, action) {
      state.status = action.type;
    },
    patientDetailsSuccess(state, action) {
      state.patientDetailsRes = action?.payload;
      state.status = action.type;
    },
    patientDetailsFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    clearQuestionListReq(state, action) {
      state.status = action.type;
    },
    clearQuestionListSuccess(state, action) {
      state.questionListRes = action?.payload;
      state.status = action.type;
    },
  },
});

export const {
  clearQuestionListReq,
  clearQuestionListSuccess,

  getMyPatientReq,
  getMyPatientSuccess,
  getMyPatientFailure,

  getMyPatientSessionReq,
  getMyPatientSessionSuccess,
  getMyPatientSessionFailure,

  getMyPatientSessionDetailsReq,
  getMyPatientSessionDetailsSuccess,
  getMyPatientSessionDetailsFailure,

  getPatientReq,
  getPatientSuccess,
  getPatientFailure,

  getPatientSessionReq,
  getPatientSessionSuccess,
  getPatientSessionFailure,

  getPatientSessionDetailsReq,
  getPatientSessionDetailsSuccess,
  getPatientSessionDetailsFailure,

  storeServiceEnrolmentReq,
  storeServiceEnrolmentSuccess,
  storeServiceEnrolmentFailure,

  getListOfTherapiesReq,
  getListOfTherapiesSuccess,
  getListOfTherapiesFailure,

  getListOfSatisfactionReq,
  getListOfSatisfactionSuccess,
  getListOfSatisfactionFailure,

  satisfactionQuestionListReq,
  satisfactionQuestionListSuccess,
  satisfactionQuestionListFailure,

  submitEvaluationReq,
  submitEvaluationSuccess,
  submitEvaluationFailure,

  patientDetailsReq,
  patientDetailsSuccess,
  patientDetailsFailure,
} = PATIENTSlice.actions;

export default PATIENTSlice.reducer;
