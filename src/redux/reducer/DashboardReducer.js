import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: {},
  error: {},
  getDashboardResponse: {},
  patientEnrolmentRes: {},
  evaluationRes:{}
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
  
  patientEnrolmentReq,
  patientEnrolmentSuccess,
  patientEnrolmentFailure,

  EvaluationEnrolmentReq,
  EvaluationEnrolmentSuccess,
  EvaluationEnrolmentFailure,
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
