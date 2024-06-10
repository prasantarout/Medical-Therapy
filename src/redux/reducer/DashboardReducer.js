import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getDashboardResponse: {},
  getInactivePatientResponse: [],
  getActivePatientResponse: [],
  getPendingEvaulationResponse: [],
  getCompletedEvaulationResponse: [],
  patientEnrolmentRes: {},
  evaluationRes: {},
};

const DashboardSlice = createSlice({
  name: 'Dashboard',
  initialState,

  reducers: {
    //getDashboardReq
    getDashboardReq(state, action) {
      state.status = action.type;
    },
    getDashboardSuccess(state, action) {
      state.getDashboardResponse = action?.payload;
      state.status = action.type;
    },
    getDashboardFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //getInactivePatientReq
    getInactivePatientReq(state, action) {
      state.status = action.type;
    },
    getInactivePatientSuccess(state, action) {
      state.getInactivePatientResponse = action?.payload;
      state.status = action.type;
    },
    getInactivePatientFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //getActivePatientReq
    getActivePatientReq(state, action) {
      state.status = action.type;
    },
    getActivePatientSuccess(state, action) {
      state.getActivePatientResponse = action?.payload;
      state.status = action.type;
    },
    getActivePatientFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //getPendingEvaulationReq
    getPendingEvaulationReq(state, action) {
      state.status = action.type;
    },
    getPendingEvaulationSuccess(state, action) {
      state.getPendingEvaulationResponse = action?.payload;
      state.status = action.type;
    },
    getPendingEvaulationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    //getCompletedEvaulationReq
    getCompletedEvaulationReq(state, action) {
      state.status = action.type;
    },
    getCompletedEvaulationSuccess(state, action) {
      state.getCompletedEvaulationResponse = action?.payload;
      state.status = action.type;
    },
    getCompletedEvaulationFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    patientEnrolmentReq(state, action) {
      state.status = action.type;
    },
    patientEnrolmentSuccess(state, action) {
      state.patientEnrolmentRes = action?.payload;
      state.status = action.type;
    },
    patientEnrolmentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },

    EvaluationEnrolmentReq(state, action) {
      state.status = action.type;
    },
    EvaluationEnrolmentSuccess(state, action) {
      state.evaluationRes = action?.payload;
      state.status = action.type;
    },
    EvaluationEnrolmentFailure(state, action) {
      state.error = action.error;
      state.status = action.type;
    },
  },
});

export const {
  getDashboardReq,
  getDashboardSuccess,
  getDashboardFailure,

  getInactivePatientReq,
  getInactivePatientSuccess,
  getInactivePatientFailure,

  getActivePatientReq,
  getActivePatientSuccess,
  getActivePatientFailure,

  getCompletedEvaulationReq,
  getCompletedEvaulationSuccess,
  getCompletedEvaulationFailure,

  getPendingEvaulationReq,
  getPendingEvaulationSuccess,
  getPendingEvaulationFailure,

  patientEnrolmentReq,
  patientEnrolmentSuccess,
  patientEnrolmentFailure,

  EvaluationEnrolmentReq,
  EvaluationEnrolmentSuccess,
  EvaluationEnrolmentFailure,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
